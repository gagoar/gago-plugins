#!/usr/bin/env node
// Regenerates every list of plugins from .claude-plugin/marketplace.json and docs/plugins.json.
//
//   node scripts/sync.mjs          write the generated regions
//   node scripts/sync.mjs --check  exit 1 if any generated region is stale
//
// Generated regions sit between <!-- name:start --> and <!-- name:end --> markers.
// Everything outside the markers is hand-written and never touched.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = (p) => join(root, p);
const readJson = (p) => JSON.parse(readFileSync(path(p), 'utf8'));
const check = process.argv.includes('--check');

const marketplace = readJson('.claude-plugin/marketplace.json');
const display = readJson('docs/plugins.json').plugins;

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// homepage can be a Pages site (unmistakable), so the repo link comes from the install source.
const repoUrl = (plugin) => plugin.source.url.replace(/\.git$/, '');

// Join marketplace entries with display data. Fail loudly on any mismatch.
const problems = [];
const plugins = marketplace.plugins.map((p) => {
  const d = display[p.name];
  if (!d) {
    problems.push(`"${p.name}" is in marketplace.json but not in docs/plugins.json`);
    return null;
  }
  return { name: p.name, repo: repoUrl(p), description: p.description, category: p.category, ...d };
}).filter(Boolean);
for (const name of Object.keys(display)) {
  if (!marketplace.plugins.some((p) => p.name === name)) {
    problems.push(`"${name}" is in docs/plugins.json but not in marketplace.json`);
  }
}
if (problems.length) {
  console.error(problems.map((m) => `error: ${m}`).join('\n'));
  process.exit(1);
}

// ---- renderers -------------------------------------------------------------

const readmeInstall = () =>
  '```\n' + plugins.map((p) => `/plugin install ${p.name}@${marketplace.name}`).join('\n') + '\n```';

// A list, not a table: wide tables scroll sideways in the GitHub mobile app.
const readmeList = () =>
  plugins
    .map((p) => `- **[${p.title}](${p.repo})** — ${p.summary}  \n  \`${p.invocation}\` · [Docs](${p.docs})`)
    .join('\n');

const hubInstall = () =>
  plugins
    .map(
      (p) =>
        `<span style="color:var(--clay)">/plugin install</span> <span style="color:var(--olive)">${escapeHtml(p.name)}@${escapeHtml(marketplace.name)}</span>`,
    )
    .join('\n');

const hubCards = () =>
  plugins
    .map(
      (p) => `          <div class="profile-card">
            <div class="profile-name">${escapeHtml(p.title)}</div>
            <div class="profile-types">${escapeHtml(p.invocation)}</div>
            <div class="profile-desc">${escapeHtml(p.blurb)}</div>
            <div class="profile-links">
              <a href="${escapeHtml(p.repo)}" target="_blank" rel="noopener">GitHub →</a>
              <a href="${escapeHtml(p.docs)}" target="_blank" rel="noopener">Docs →</a>
            </div>
          </div>`,
    )
    .join('\n');

const catalog = () =>
  JSON.stringify(
    {
      name: marketplace.name,
      owner: marketplace.owner.name,
      plugins: plugins.map(({ name, title, repo, docs, description, summary, invocation, category }) => ({
        name, title, repo, docs, description, summary, invocation, category,
      })),
    },
    null,
    2,
  ) + '\n';

// ---- region replacement ----------------------------------------------------

const INLINE = new Set(['hub-count', 'hub-install']);

function replaceRegion(text, name, body, file, pad) {
  const re = new RegExp(`(<!-- ${name}:start -->)[\\s\\S]*?(<!-- ${name}:end -->)`);
  if (!re.test(text)) {
    console.error(`error: ${file} has no <!-- ${name}:start --> ... <!-- ${name}:end --> markers`);
    process.exit(1);
  }
  return text.replace(re, (_, a, b) => `${a}${pad}${body}${pad}${b}`);
}

const targets = [
  {
    file: 'README.md',
    regions: { 'install-list': readmeInstall(), 'plugin-list': readmeList() },
  },
  {
    file: 'docs/index.html',
    regions: {
      'hub-count': `${plugins.length} plugins`,
      'hub-install': hubInstall(),
      'hub-cards': hubCards(),
    },
  },
];

let stale = 0;
const write = (file, next) => {
  let prev = null;
  try {
    prev = readFileSync(path(file), 'utf8');
  } catch {
    // first run: the file does not exist yet
  }
  if (prev === next) return;
  stale += 1;
  if (check) console.error(`stale: ${file}`);
  else writeFileSync(path(file), next);
};

for (const { file, regions } of targets) {
  let text = readFileSync(path(file), 'utf8');
  for (const [name, body] of Object.entries(regions)) {
    // Inline regions add no padding newlines: one sits in a sentence, one inside a <pre>.
    text = INLINE.has(name) ? replaceRegion(text, name, body, file, '') : replaceRegion(text, name, body, file, '\n');
  }
  write(file, text);
}
write('docs/catalog.json', catalog());

if (check && stale) {
  console.error('Generated sections are out of date. Run: node scripts/sync.mjs');
  process.exit(1);
}
console.log(check ? 'ok: generated sections are current' : `synced ${plugins.length} plugins (${stale} file(s) changed)`);
