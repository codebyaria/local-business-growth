# Local Business Growth

A bilingual Astro demo for an Indonesian local service business. The project shows how a small-business marketing site can be structured for local SEO, service/location pages, content publishing, and booking intake while staying ready for a future Strapi CMS.

Brand used in the demo: **Sejuk Cepat** — a sample AC, fridge, and freezer service business for Jabodetabek.

## What this demonstrates

- Astro marketing-site architecture with server output.
- Indonesian default route plus English `/en/` routes.
- Services, locations, blog, booking, contact, robots, and sitemap routes.
- Typed Strapi-compatible content model with fixture fallback.
- Booking form validation with a server API and success reference.
- SEO basics: canonical URLs, hreflang alternates, localized content, sitemap, robots.
- Testable TypeScript boundaries for the Strapi client, i18n helpers, and booking parser.

## Routes

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
| `/robots.txt`                                 | Robots policy        |
| `/sitemap.xml`                                | Sitemap              |

## Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Variables:

```bash
STRAPI_URL=
STRAPI_TOKEN=
SITE_ORIGIN=
PUBLIC_ENABLE_INDEXING=false
```

- Leave `STRAPI_URL` empty to use fixture content.
- Set `STRAPI_URL` to a Strapi instance that matches `cms-spec/` to use CMS content.
- Set `SITE_ORIGIN` to the public deployment origin for canonical, hreflang, robots, and sitemap output.
- Keep `PUBLIC_ENABLE_INDEXING=false` for local/sandbox builds. Set it to `true` only on the intended public demo deployment.

## Development

```bash
pnpm install
pnpm dev
```

## Quality gates

Run the full local verification suite before accepting changes:

```bash
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

Current verified baseline:

- Vitest: Strapi client, i18n helpers, and booking parser.
- TypeScript: `tsc --noEmit`.
- ESLint: `--max-warnings=0`.
- Astro build: server output with localized routes.

## CMS handoff

The `cms-spec/` directory documents the intended Strapi content types and example records:

- `service.example.json`
- `location.example.json`
- `article.example.json`

The frontend adapter uses fixtures by default and switches to Strapi when `STRAPI_URL` is configured.

## Portfolio boundary

This is a portfolio demo using sample business content. It is designed to show delivery capability without using real client data, customer submissions, or private credentials.
