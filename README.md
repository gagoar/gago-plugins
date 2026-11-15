# gago-plugins

A personal Claude Code plugin marketplace by [@gagoar](https://github.com/gagoar).

**Hub:** [gagoar.github.io/gago-plugins](https://gagoar.github.io/gago-plugins)

## Add the marketplace

```
/plugin marketplace add gagoar/gago-plugins
/reload-plugins
```

## Install any plugin

<!-- install-list:start -->
```
/plugin install iceberg@gago-plugins
/plugin install html@gago-plugins
/plugin install memory-sync@gago-plugins
/plugin install deck-visuals@gago-plugins
/plugin install typescript-patterns-enforcer@gago-plugins
/plugin install tricorder@gago-plugins
/plugin install pr-brief@gago-plugins
/plugin install unmistakable@gago-plugins
/plugin install plugin-directory-preflight@gago-plugins
/plugin install foghorn@gago-plugins
/plugin install greenhorn@gago-plugins
```
<!-- install-list:end -->

## Plugins

<!-- plugin-list:start -->
- **[iceberg](https://github.com/gagoar/iceberg)** — Hemingway writing rules for technical docs  
  `/iceberg:score · /iceberg:edit` · [Docs](https://gagoar.github.io/iceberg)
- **[html](https://github.com/gagoar/html-effectiveness)** — Rich self-contained HTML documents  
  `/html:doc` · [Docs](https://gagoar.github.io/html-effectiveness)
- **[memory-sync](https://github.com/gagoar/claude-memory-sync)** — Claude Code memory backup and sync  
  `/memory-sync:sync` · [Docs](https://gagoar.github.io/claude-memory-sync)
- **[deck-visuals](https://github.com/gagoar/deck-visuals)** — Inline-SVG diagrams, dataviz charts, icons, and GIF levity for HTML decks  
  `auto — "add visuals to my deck"` · [Docs](https://gagoar.github.io/deck-visuals)
- **[TypeScript Patterns Enforcer](https://github.com/gagoar/typescript-patterns-enforcer)** — TypeScript patterns enforcer  
  `/typescript-patterns-enforcer:check · typescript-patterns-enforcer:review` · [Docs](https://gagoar.github.io/typescript-patterns-enforcer)
- **[tricorder](https://github.com/gagoar/tricorder)** — Statusline + macOS menu-bar app for Claude Code sessions — context gauge, PRs, running sub-agents, attention sounds  
  `always-on (hooks)` · [Docs](https://gagoar.github.io/tricorder/)
- **[pr-brief](https://github.com/gagoar/pr-brief)** — Readable PR descriptions: a brief, Input → Functions → Output diagrams, and a ranked review guide — plus a gate that blocks descriptions without them  
  `/pr-brief · gate hook` · [Docs](https://gagoar.github.io/pr-brief/)
- **[unmistakable](https://github.com/gagoar/unmistakable)** — English an AI agent cannot misread: a rewrite skill and a linter that follow the ASD-STE100 rules  
  `auto · /unmistakable:asd-ste100` · [Docs](https://gagoar.github.io/unmistakable/)
- **[Plugin Directory Preflight](https://github.com/gagoar/plugin-directory-preflight)** — Run the directory's upload checks locally, read the scan report in a screenful, and pin a stubborn hold  
  `/plugin-directory-preflight:check` · [Docs](https://gagoar.github.io/plugin-directory-preflight)
- **[foghorn](https://github.com/gagoar/foghorn)** — Technical release notes in a configurable voice: each entry says what changed, shows the old and new output, says who is affected and credits contributors  
  `/foghorn:draft · /foghorn:check · /foghorn:voice` · [Docs](https://gagoar.github.io/foghorn/)
- **[greenhorn](https://github.com/gagoar/greenhorn)** — Rewrites technical text for a reader who has never seen your system: finds where a stranger gets lost, answers each gap from your code, leads with one real example  
  `/greenhorn:explain · /greenhorn:test` · [Docs](https://gagoar.github.io/greenhorn/)
<!-- plugin-list:end -->

> **Renamed:** `typescript-patterns-enforcer` was called `ts-patterns` before v0.5.0. If you installed the old name, run `/plugin uninstall ts-patterns@gago-plugins`, then install the new one.

## Adding a new plugin

1. Create the plugin repo at `gagoar/<name>` and give it the `claude-code-plugin` topic.
2. Add an entry to `.claude-plugin/marketplace.json`.
3. Add its display data (invocation, summary, blurb, docs link) to `docs/plugins.json`.
4. Run `node scripts/sync.mjs`. It rewrites the install list and plugin list above and the hub page cards.
5. Commit and push. The marketplace updates immediately.

CI runs `node scripts/sync.mjs --check`, so a plugin missing from the README or the hub page fails the pull request instead of going stale.
