# Local Business Growth

A bilingual Astro + Strapi monorepo demo for an Indonesian local service
business. Demonstrates an end-to-end small-business stack: marketing site,
headless CMS, bilingual content model, booking intake, and free-tier hosting
configuration.

Brand used in the demo: **Sejuk Cepat** — a sample AC, fridge, and freezer
service business for Jabodetabek.

## Workspace layout

```text
local-business-growth/
├─ apps/
│  ├─ web/        Astro 5 marketing site (public-facing)
│  └─ cms/        Strapi 5 + SQLite (admin + REST API)
├─ packages/
│  └─ shared/     TypeScript content types shared by web + cms
├─ cms-spec/      Archived Strapi schema spec (now implemented in apps/cms)
├─ apps/web/public/images/    Optimized hero images
├─ render.yaml    Render Blueprint — free-tier Strapi service with persistent disk
├─ vercel.json    Vercel config — Astro web app
├─ pnpm-workspace.yaml
├─ package.json   Root orchestrator scripts
├─ tsconfig.base.json
├─ eslint.config.js
├─ prettier.config.mjs
└─ lighthouserc.json
```

## What this demonstrates

- pnpm workspace monorepo with shared TypeScript types.
- Astro 5 marketing site with Indonesian default routes and English `/en/` routes.
- Strapi 5 headless CMS with three content types (`service`, `location`,
  `article`) and bilingual fields.
- Strapi seed lifecycle that populates the database on first boot from
  `apps/cms/data/fixtures/`.
- Astro content adapter that prefers a live Strapi instance and falls back to
  in-repo fixtures when `STRAPI_URL` is empty.
- Booking form validation with a server API and success reference.
- Render Blueprint (`render.yaml`) for the Strapi service — free tier with a
  persistent disk for the SQLite database and uploads.
- Vercel config (`vercel.json`) for the Astro web app — free tier.
- Lighthouse CI config with accessibility and SEO as hard errors.
- TypeScript strict, ESLint `--max-warnings=0`, Prettier, Vitest.

## Requirements

- Node.js >= 22.12.0
- pnpm >= 10.x (`corepack enable && corepack prepare pnpm@10 --activate`)

## Local development

```bash
# install everything (root + apps + packages)
pnpm install

# copy env files and fill real values
cp .env.example .env
cp apps/web/.env.example apps/web/.env
cp apps/cms/.env.example apps/cms/.env

# run web + cms concurrently
pnpm dev

# web only (http://127.0.0.1:4321)
pnpm dev:web

# cms only (http://localhost:1337/admin)
pnpm dev:cms
```

The first time the CMS boots, it seeds six services, six locations, and four
articles from `apps/cms/data/fixtures/`, and creates an admin user from
`ADMIN_EMAIL` / `ADMIN_PASSWORD`. Re-running the bootstrap on a populated
database is a no-op.

## Quality gates

```bash
pnpm format          # prettier --write .
pnpm format:check    # prettier --check .
pnpm lint            # eslint --max-warnings=0 .
pnpm typecheck       # tsc in web + cms + shared
pnpm test            # vitest in web (24 tests, 3 files)
pnpm build           # build web + cms
pnpm check           # all of the above
```

## Hosting

### Web (Vercel — free)

Connect the repo to a Vercel project:

- Build command: `pnpm install --frozen-lockfile && pnpm build:web`
- Output directory: `apps/web/dist`
- Env: `SITE_ORIGIN`, `STRAPI_URL`, `STRAPI_TOKEN`, `PUBLIC_ENABLE_INDEXING`

### CMS (Render — free)

Use the Render Blueprint by connecting the repo to a new Blueprint service. The
`render.yaml` file provisions:

- `sejuk-cepat-cms` web service on the free plan
- Persistent disk mounted at `/app/apps/cms/.tmp` (1 GB) for SQLite + uploads
- Required secrets (`APP_KEYS`, `ADMIN_JWT_SECRET`, `JWT_SECRET`,
  `ADMIN_PASSWORD`, etc.) must be set via the Render dashboard

Render free tier sleeps the service after ~15 minutes of inactivity. The first
request after sleep takes ~30 seconds to wake.

## Routes (apps/web)

| Route                                         | Purpose              |
| --------------------------------------------- | -------------------- |
| `/`                                           | Indonesian homepage  |
| `/en/`                                        | English homepage     |
| `/services/`, `/en/services/`                 | Service listing      |
| `/services/[slug]/`, `/en/services/[slug]/`   | Service detail       |
| `/locations/`, `/en/locations/`               | Service area listing |
| `/locations/[slug]/`, `/en/locations/[slug]/` | Service area detail  |
| `/blog/`, `/en/blog/`                         | Blog listing         |
| `/blog/[slug]/`, `/en/blog/[slug]/`           | Blog detail          |
| `/booking/`, `/en/booking/`                   | Booking form         |
| `/booking/success/`, `/en/booking/success/`   | Booking confirmation |
| `/contact/`, `/en/contact/`                   | Contact page         |
| `/api/booking/`                               | POST booking handler |
| `/robots.txt`                                 | Robots               |
| `/sitemap.xml`                                | Sitemap              |

## CMS routes (apps/cms)

| Route               | Purpose                       |
| ------------------- | ----------------------------- |
| `/admin`            | Strapi admin (login)          |
| `/api/services`     | List services                 |
| `/api/services/:id` | Single service                |
| `/api/locations`    | List locations                |
| `/api/articles`     | List articles                 |
| `/_health`          | Health check (used by Render) |

## Honest scope

This is a portfolio demo. Real data and real customers are not used. Sample
content under `apps/cms/data/fixtures/` is mirrored from the original
fixtures and shows what a seeded CMS looks like for the Astro frontend.
