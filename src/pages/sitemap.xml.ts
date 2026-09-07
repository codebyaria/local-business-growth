import type { APIRoute } from 'astro';
import { createContentAdapter } from '../lib/content-adapter.ts';

export const prerender = true;

interface SitemapEntry {
  loc: string;
  lastmod?: string;
}

function urlEntry(loc: string, lastmod?: string): string {
  return `  <url>\n    <loc>${loc}</loc>\n    ${lastmod ? `<lastmod>${lastmod}</lastmod>\n` : ''}  </url>`;
}

export const GET: APIRoute = async ({ site, url }) => {
  const origin = (site?.toString() ?? url.origin).replace(/\/$/, '');
  const lastmod = new Date().toISOString().slice(0, 10);

  const adapter = createContentAdapter();
  const [services, locations, articles] = await Promise.all([
    adapter.fetchServices(),
    adapter.fetchLocations(),
    adapter.fetchArticles(),
  ]);

  const entries: SitemapEntry[] = [];
  const baseRoutes = ['/', '/services/', '/locations/', '/blog/', '/booking/', '/contact/'];
  for (const route of baseRoutes) {
    entries.push({ loc: `${origin}${route}`, lastmod });
    entries.push({ loc: `${origin}/en${route}`, lastmod });
  }
  for (const service of services) {
    entries.push({ loc: `${origin}/services/${service.slug}/`, lastmod });
    entries.push({ loc: `${origin}/en/services/${service.slug}/`, lastmod });
  }
  for (const location of locations) {
    entries.push({ loc: `${origin}/locations/${location.slug}/`, lastmod });
    entries.push({ loc: `${origin}/en/locations/${location.slug}/`, lastmod });
  }
  for (const article of articles) {
    entries.push({ loc: `${origin}/blog/${article.slug}/`, lastmod });
    entries.push({ loc: `${origin}/en/blog/${article.slug}/`, lastmod });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map((e) => urlEntry(e.loc, e.lastmod)).join('\n')}
</urlset>
`;

  return new Response(body, {
    status: 200,
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
};
