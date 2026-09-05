# Strapi Specification

This directory documents the **Strapi content model and REST contract** expected
by the Astro frontend. It is intentionally a **specification only** — the running
Strapi instance is not part of this repository.

Use this spec when building the actual Strapi deployment:

1. Create the content types described below.
2. Seed them with the example records in `examples/`.
3. Set the `public` role to `find` on each type for read-only access.
4. Optionally issue a read-only API token and put it in `STRAPI_TOKEN`.
5. Set `STRAPI_URL` in the Astro frontend environment.

The frontend's `content-adapter.ts` calls the `find` endpoint and unwraps the
`data[]` response.

## Content types

| Type       | Fields                                                                                                                                     | Relations |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `service`  | `slug` (uid), `name` (string, required), `summary` (text), `description` (richtext), `publishedAt`                                         | –         |
| `location` | `slug` (uid), `name` (string, required), `region` (string), `serviceCount` (integer)                                                       | –         |
| `article`  | `slug` (uid), `title` (string, required), `excerpt` (text), `body` (richtext), `publishedAt` (datetime, required), `readMinutes` (integer) | –         |

Relations can be added later (for example `service → location`) without breaking
the existing frontend contract.

## REST endpoints

```text
GET /api/services
GET /api/services/:slug?filters[slug][$eq]=:slug
GET /api/locations
GET /api/articles
GET /api/articles/:slug?filters[slug][$eq]=:slug
```

Each response follows the Strapi v4 shape:

```json
{ "data": [{ "id": 1, "slug": "...", "name": "...", "summary": "...", "description": "..." }] }
```

## Authenticated access (optional)

If the Strapi instance requires authentication, set `STRAPI_TOKEN` to a
read-only API token. The frontend will send `Authorization: Bearer <token>`
on every request. No tokens should ever be committed to the repository.

## File index

- `service.example.json` — example `service` record.
- `location.example.json` — example `location` record.
- `article.example.json` — example `article` record.
