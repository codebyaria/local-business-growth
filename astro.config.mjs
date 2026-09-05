// @ts-check
import { defineConfig } from 'astro/config';

const strapiUrl = process.env.STRAPI_URL?.replace(/\/$/, '');

export default defineConfig({
  ...(strapiUrl ? { site: strapiUrl } : {}),
  trailingSlash: 'always',
});
