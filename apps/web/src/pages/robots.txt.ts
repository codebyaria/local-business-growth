import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site, url }) => {
  const origin = (site?.toString() ?? url.origin).replace(/\/$/, '');
  const shouldIndex = import.meta.env.PUBLIC_ENABLE_INDEXING === 'true';
  const body = `User-agent: *
${shouldIndex ? 'Allow: /' : 'Disallow: /'}

Sitemap: ${origin}/sitemap.xml
`;
  return new Response(body, {
    status: 200,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
