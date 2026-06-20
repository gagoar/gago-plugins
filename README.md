# gago-plugins

Personal Claude Code plugin marketplace by [@gagoar](https://github.com/gagoar).

## Install

Add the marketplace once:

```
/plugin marketplace add github:gagoar/gago-plugins
```

Then install any plugin:

```
/plugin install iceberg@gago
/plugin install html-effectiveness@gago
/plugin install claude-memory-sync@gago
/plugin install typescript-patterns-enforcer@gago
```

## Plugins

| Plugin | Description |
|--------|-------------|
| [iceberg](https://github.com/gagoar/iceberg) | Apply Hemingway writing rules to technical docs |
| [html-effectiveness](https://github.com/gagoar/html-effectiveness) | Generate rich self-contained HTML documents |
| [claude-memory-sync](https://github.com/gagoar/claude-memory-sync) | Backup and sync Claude Code memory across machines |
| [typescript-patterns-enforcer](https://github.com/gagoar/typescript-patterns-enforcer) | Enforce TypeScript best practices — skill + subagent |

## Adding a new plugin

1. Create the plugin repo under `github:gagoar/<name>`
2. Add an entry to `.claude-plugin/marketplace.json` with the latest `sha`
3. Commit and push
