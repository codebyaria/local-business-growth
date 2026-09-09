'use strict';

/**
 * Database configuration for the Strapi CMS.
 *
 * Supports two backends via the `DATABASE_CLIENT` env var:
 *
 * - `sqlite` (default) — local development via `better-sqlite3`. The SQLite
 *   file lives at `apps/cms/.tmp/data.db` and is gitignored.
 * - `postgres` — Render free-tier Postgres in production. Connection string
 *   is read from `DATABASE_URL` (provided automatically by Render).
 *
 * Strapi 5 only accepts `sqlite` or `postgres` for the `client` value.
 */

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  if (client === 'postgres') {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: env.bool('DATABASE_SSL', false),
        },
        pool: {
          min: 2,
          max: 10,
        },
      },
    };
  }

  const path = require('node:path');

  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};
