// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

const siteOrigin = process.env.SITE_ORIGIN?.replace(/\/$/, '');

export default defineConfig({
  ...(siteOrigin ? { site: siteOrigin } : {}),
  trailingSlash: 'always',
  output: 'server',
  adapter: vercel({
    imageService: false,
    webAnalytics: { enabled: false },
  }),
  security: {
    checkOrigin: false,
  },
});
