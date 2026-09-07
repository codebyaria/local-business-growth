// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

const strapiUrl = process.env.STRAPI_URL?.replace(/\/$/, '');

export default defineConfig({
  ...(strapiUrl ? { site: strapiUrl } : {}),
  trailingSlash: 'always',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: {
      en: 'id',
    },
  },
});
