## Development

This is a pnpm workspace monorepo with two apps:

- `apps/web` — Astro 5 marketing site
- `apps/cms` — Strapi 5 headless CMS

When starting the dev server, run from the repo root:

```bash
# Both apps concurrently (web at :4321, cms at :1337)
pnpm dev

# Or just one
pnpm dev:web
pnpm dev:cms
```

The CMS seeds services, locations, articles, and an admin user on first boot
when the SQLite database is empty. Re-running the seed is a no-op.

For all quality gates run from the root:

```bash
pnpm install
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build:web
```

## Documentation

- Astro: https://docs.astro.build
- Strapi 5: https://docs.strapi.io
- pnpm workspaces: https://pnpm.io/workspaces
