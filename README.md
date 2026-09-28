# gago-plugins

A personal Claude Code plugin marketplace by [@gagoar](https://github.com/gagoar).

**Hub:** [gagoar.github.io/gago-plugins](https://gagoar.github.io/gago-plugins)

## Add the marketplace

```
/plugin marketplace add gagoar/gago-plugins
/reload-plugins
```

## Install any plugin

```
/plugin install iceberg@gago-plugins
/plugin install html@gago-plugins
/plugin install memory-sync@gago-plugins
/plugin install ts-patterns@gago-plugins
/plugin install deck-visuals@gago-plugins
/plugin install tricorder@gago-plugins
```

## Plugins

| Plugin | Invocation | Description | Docs |
|--------|-----------|-------------|------|
| [iceberg](https://github.com/gagoar/iceberg) | /iceberg:score · /iceberg:edit | Hemingway writing rules for technical docs | [gagoar.github.io/iceberg](https://gagoar.github.io/iceberg) |
| [html](https://github.com/gagoar/html-effectiveness) | /html:doc | Rich self-contained HTML documents | [gagoar.github.io/html-effectiveness](https://gagoar.github.io/html-effectiveness) |
| [memory-sync](https://github.com/gagoar/claude-memory-sync) | /memory-sync:sync | Claude Code memory backup and sync | [gagoar.github.io/claude-memory-sync](https://gagoar.github.io/claude-memory-sync) |
| [ts-patterns](https://github.com/gagoar/typescript-patterns-enforcer) | /ts-patterns:check | TypeScript patterns enforcer | [gagoar.github.io/typescript-patterns-enforcer](https://gagoar.github.io/typescript-patterns-enforcer) |
| [deck-visuals](https://github.com/gagoar/deck-visuals) | auto — "add visuals to my deck" | Inline-SVG diagrams, dataviz charts, icons, and GIF levity for HTML decks | [gagoar.github.io/deck-visuals](https://gagoar.github.io/deck-visuals) |
| [tricorder](https://github.com/gagoar/tricorder) | always-on (hooks) | Statusline + macOS menu-bar app for Claude Code sessions — context gauge, PRs, running sub-agents, attention sounds | [gagoar.github.io/tricorder](https://gagoar.github.io/tricorder/) |

## Adding a new plugin

1. Create the plugin repo at gagoar/<name>
2. Add an entry to .claude-plugin/marketplace.json
3. Add it to the table above and the hub page (`docs/index.html`) too —
   the marketplace works without this step, but the docs silently go stale
   if it's skipped (this happened twice before it was caught)
4. Commit and push — the marketplace updates immediately
