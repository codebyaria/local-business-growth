// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

const siteOrigin = process.env.SITE_ORIGIN?.replace(/\/$/, '');

export default defineConfig({
  ...(siteOrigin ? { site: siteOrigin } : {}),
  trailingSlash: 'always',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  security: {
    checkOrigin: false,
  },
});
