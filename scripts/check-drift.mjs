#!/usr/bin/env node
// Compares the repos that carry the `claude-code-plugin` topic with marketplace.json.
//
//   node scripts/check-drift.mjs
//
// Exit 1 and a markdown report on stdout when:
//   - a topic-tagged repo is not in the marketplace, or
//   - a marketplace plugin's repo does not carry the topic.
// Reads public data only. Uses GITHUB_TOKEN when set, to lift the rate limit.

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OWNER = process.env.OWNER ?? 'gagoar';
const TOPIC = 'claude-code-plugin';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const marketplace = JSON.parse(readFileSync(join(root, '.claude-plugin/marketplace.json'), 'utf8'));

const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function topicRepos() {
  const found = [];
  for (let page = 1; ; page += 1) {
    const q = encodeURIComponent(`user:${OWNER} topic:${TOPIC} fork:false archived:false`);
    const res = await fetch(`https://api.github.com/search/repositories?q=${q}&per_page=100&page=${page}`, { headers });
    if (!res.ok) throw new Error(`GitHub search failed: ${res.status} ${await res.text()}`);
    const body = await res.json();
    found.push(...body.items.map((r) => r.full_name.toLowerCase()));
    if (body.items.length < 100) return found;
  }
}

const repoOf = (p) => p.source.url.replace(/^https:\/\/github\.com\//, '').replace(/\.git$/, '').toLowerCase();

const tagged = new Set(await topicRepos());
const listed = new Map(marketplace.plugins.map((p) => [repoOf(p), p.name]));

const untracked = [...tagged].filter((r) => !listed.has(r));
const untagged = [...listed].filter(([r]) => !tagged.has(r));

if (!untracked.length && !untagged.length) {
  console.log(`ok: ${listed.size} marketplace plugins match the "${TOPIC}" topic`);
  process.exit(0);
}

const lines = ['Marketplace and GitHub topics have drifted.', ''];
if (untracked.length) {
  lines.push(`Tagged \`${TOPIC}\` but missing from \`marketplace.json\`:`);
  lines.push(...untracked.map((r) => `- ${r}`), '');
}
if (untagged.length) {
  lines.push(`In \`marketplace.json\` but missing the \`${TOPIC}\` topic:`);
  lines.push(...untagged.map(([r, name]) => `- ${r} (${name})`), '');
}
lines.push('Fix: add the marketplace entry and its `docs/plugins.json` data, then run `node scripts/sync.mjs`. Or fix the topic on the repo.');
console.log(lines.join('\n'));
process.exit(1);
