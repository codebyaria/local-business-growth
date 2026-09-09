import { q as decodeKey } from './chunks/astro/server_C9p18JK-.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BYjRVJw9.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === 'string') {
        return [key, value.normalize().replace(/#/g, '%23').replace(/\?/g, '%3F')];
      }
      return [key, value];
    }),
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || '';
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content
    .normalize()
    .replace(/\?/g, '%3F')
    .replace(/#/g, '%23')
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']');
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join('');
  return segmentPath ? '/' + segmentPath : '';
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = '';
    if (addTrailingSlash === 'always' && segments.length) {
      trailing = '/';
    }
    const path =
      segments.map((segment) => getSegment(segment, sanitizedParams)).join('') + trailing;
    return path || '/';
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute
      ? deserializeRouteData(rawRouteData.redirectRoute)
      : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin,
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData),
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key,
  };
}

const manifest = deserializeManifest({
  hrefRoot: 'file:///Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/',
  cacheDir:
    'file:///Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/node_modules/.astro/',
  outDir: 'file:///Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/dist/',
  srcDir: 'file:///Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/',
  publicDir:
    'file:///Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/public/',
  buildClientDir:
    'file:///Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/dist/client/',
  buildServerDir:
    'file:///Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/dist/server/',
  adapterName: '@astrojs/vercel',
  routes: [
    {
      file: '',
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        type: 'page',
        component: '_server-islands.astro',
        params: ['name'],
        segments: [
          [{ content: '_server-islands', dynamic: false, spread: false }],
          [{ content: 'name', dynamic: true, spread: false }],
        ],
        pattern: '^\\/_server-islands\\/([^/]+?)\\/$',
        prerender: false,
        isIndex: false,
        fallbackRoutes: [],
        route: '/_server-islands/[name]',
        origin: 'internal',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: 'robots.txt',
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        route: '/robots.txt',
        isIndex: false,
        type: 'endpoint',
        pattern: '^\\/robots\\.txt\\/?$',
        segments: [[{ content: 'robots.txt', dynamic: false, spread: false }]],
        params: [],
        component: 'src/pages/robots.txt.ts',
        pathname: '/robots.txt',
        prerender: true,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: 'sitemap.xml',
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        route: '/sitemap.xml',
        isIndex: false,
        type: 'endpoint',
        pattern: '^\\/sitemap\\.xml\\/?$',
        segments: [[{ content: 'sitemap.xml', dynamic: false, spread: false }]],
        params: [],
        component: 'src/pages/sitemap.xml.ts',
        pathname: '/sitemap.xml',
        prerender: true,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        type: 'endpoint',
        isIndex: false,
        route: '/_image/',
        pattern: '^\\/_image\\/$',
        segments: [[{ content: '_image', dynamic: false, spread: false }]],
        params: [],
        component:
          '../../node_modules/.pnpm/astro@5.18.2_@types+node@22.20.1_@vercel+functions@2.2.13_lightningcss@1.33.0_rollup@4._a5d90610f6321bd96efa46be71141ee2/node_modules/astro/dist/assets/endpoint/generic.js',
        pathname: '/_image/',
        prerender: false,
        fallbackRoutes: [],
        origin: 'internal',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        route: '/api/booking',
        isIndex: false,
        type: 'endpoint',
        pattern: '^\\/api\\/booking\\/$',
        segments: [
          [{ content: 'api', dynamic: false, spread: false }],
          [{ content: 'booking', dynamic: false, spread: false }],
        ],
        params: [],
        component: 'src/pages/api/booking.ts',
        pathname: '/api/booking',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        {
          type: 'inline',
          content:
            '.page[data-astro-cid-5tznm7mj]{padding-block:clamp(2rem,6vw,5rem);display:grid;gap:1.5rem}.page-hero[data-astro-cid-5tznm7mj]{display:grid;gap:.75rem;max-width:720px}h1[data-astro-cid-5tznm7mj]{margin:0;font-size:clamp(2.25rem,5vw,4.2rem);font-weight:600;line-height:1;letter-spacing:-.055em}.lead[data-astro-cid-5tznm7mj],.excerpt[data-astro-cid-5tznm7mj]{color:var(--soft-ink);margin:0}.article-grid[data-astro-cid-5tznm7mj]{display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;margin:0;padding:0;list-style:none}.article-card[data-astro-cid-5tznm7mj]{overflow:hidden;border:1px solid var(--line);border-radius:var(--radius-lg);background:var(--surface);box-shadow:var(--shadow-sm)}.article-card__visual[data-astro-cid-5tznm7mj]{position:relative;display:block;min-height:11rem;overflow:hidden;background:radial-gradient(circle at 72% 26%,rgb(255 255 255 / 82%) 0 2.5rem,transparent 2.6rem),linear-gradient(135deg,var(--accent-soft),#effbff 52%,#fff2c7)}.article-card__visual[data-astro-cid-5tznm7mj]:before{position:absolute;inset:2.6rem auto auto 50%;width:8rem;height:2.6rem;border:1px solid rgb(90 107 118 / 16%);border-radius:.7rem .7rem 1.1rem 1.1rem;background:linear-gradient(180deg,#fff,#eef7fa);box-shadow:0 18px 34px #5a6b7629;content:"";transform:translate(-50%)}.article-card__visual[data-astro-cid-5tznm7mj]:after{position:absolute;inset:auto 1.1rem 1.1rem auto;padding:.45rem .7rem;border-radius:999px;background:#ffffffc7;color:var(--accent-strong);font-size:.82rem;font-weight:610;box-shadow:var(--shadow-sm)}.article-card__visual[data-astro-cid-5tznm7mj][data-visual=cleaning]:after{content:"AC care"}.article-card__visual[data-astro-cid-5tznm7mj][data-visual=freon]:after{content:"Freon check"}.article-card__visual[data-astro-cid-5tznm7mj][data-visual=refrigerant]:after{content:"R32 guide"}.article-card__visual[data-astro-cid-5tznm7mj][data-visual=fridge]:after{content:"Fridge repair"}.article-card__body[data-astro-cid-5tznm7mj]{display:grid;gap:.65rem;padding:1rem}.meta[data-astro-cid-5tznm7mj]{margin:0;color:var(--accent-strong);font-size:.82rem;font-weight:600}h2[data-astro-cid-5tznm7mj]{margin:0;font-size:clamp(1.15rem,2vw,1.45rem);font-weight:600;line-height:1.15;letter-spacing:-.035em}h2[data-astro-cid-5tznm7mj] a[data-astro-cid-5tznm7mj]{text-decoration:none}\n',
        },
      ],
      routeData: {
        route: '/blog',
        isIndex: true,
        type: 'page',
        pattern: '^\\/blog\\/$',
        segments: [[{ content: 'blog', dynamic: false, spread: false }]],
        params: [],
        component: 'src/pages/blog/index.astro',
        pathname: '/blog',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        {
          type: 'inline',
          content:
            '.success[data-astro-cid-xbzlo23w]{padding-block:clamp(3rem,7vw,5rem);display:grid;gap:1rem;max-width:640px}.lead[data-astro-cid-xbzlo23w]{color:var(--soft-ink);margin:0}.ref[data-astro-cid-xbzlo23w]{background:var(--paper, #fafaf6);border:1px solid var(--line);padding:.75rem 1rem;font-family:var(--font-mono);font-size:.85rem}.actions[data-astro-cid-xbzlo23w]{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:.5rem}.button[data-astro-cid-xbzlo23w]{display:inline-flex;align-items:center;min-height:48px;padding:.75rem 1.25rem;border:1px solid var(--ink);background:var(--inverse);color:var(--ink);text-decoration:none;font-weight:620}.button--primary[data-astro-cid-xbzlo23w]{background:var(--ink);color:var(--inverse)}\n',
        },
      ],
      routeData: {
        route: '/booking/success',
        isIndex: false,
        type: 'page',
        pattern: '^\\/booking\\/success\\/$',
        segments: [
          [{ content: 'booking', dynamic: false, spread: false }],
          [{ content: 'success', dynamic: false, spread: false }],
        ],
        params: [],
        component: 'src/pages/booking/success.astro',
        pathname: '/booking/success',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        {
          type: 'inline',
          content:
            '.page[data-astro-cid-pdfs7twc]{padding-block:clamp(2rem,5vw,4rem);display:grid;gap:1.5rem;max-width:720px}.lead[data-astro-cid-pdfs7twc]{color:var(--soft-ink);margin:0}.booking-form[data-astro-cid-pdfs7twc]{display:grid;gap:1.25rem}fieldset[data-astro-cid-pdfs7twc]{border:1px solid var(--line);padding:1rem 1.1rem 1.2rem;display:grid;gap:.85rem}legend[data-astro-cid-pdfs7twc]{padding-inline:.4rem;font-family:var(--font-mono);font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;color:var(--soft-ink)}.field[data-astro-cid-pdfs7twc]{display:grid;gap:.35rem}.field[data-astro-cid-pdfs7twc]>span[data-astro-cid-pdfs7twc]{font-weight:620;font-size:.9rem}.field[data-astro-cid-pdfs7twc] input[data-astro-cid-pdfs7twc],.field[data-astro-cid-pdfs7twc] select[data-astro-cid-pdfs7twc],.field[data-astro-cid-pdfs7twc] textarea[data-astro-cid-pdfs7twc]{font:inherit;padding:.55rem .7rem;border:1px solid var(--line);background:var(--inverse);color:var(--ink);border-radius:0}.field[data-astro-cid-pdfs7twc] textarea[data-astro-cid-pdfs7twc]{resize:vertical}.help[data-astro-cid-pdfs7twc]{color:var(--soft-ink);font-size:.78rem}.form-actions[data-astro-cid-pdfs7twc]{display:flex;justify-content:flex-end}button[data-astro-cid-pdfs7twc]{background:var(--ink);color:var(--inverse);border:0;padding:.75rem 1.5rem;font:inherit;font-weight:620;cursor:pointer;min-height:48px}button[data-astro-cid-pdfs7twc]:disabled{opacity:.6;cursor:not-allowed}#booking-error[data-astro-cid-pdfs7twc]{background:#fef2f2;color:#991b1b;border:1px solid #fecaca;padding:.7rem .9rem;font-size:.9rem}.footnote[data-astro-cid-pdfs7twc]{color:var(--soft-ink);font-family:var(--font-mono);font-size:.78rem}\n',
        },
      ],
      routeData: {
        route: '/booking',
        isIndex: false,
        type: 'page',
        pattern: '^\\/booking\\/$',
        segments: [[{ content: 'booking', dynamic: false, spread: false }]],
        params: [],
        component: 'src/pages/booking.astro',
        pathname: '/booking',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        {
          type: 'inline',
          content:
            '.page[data-astro-cid-uw5kdbxl]{padding-block:clamp(2rem,5vw,4rem);display:grid;gap:1.25rem;max-width:720px}.lead[data-astro-cid-uw5kdbxl]{color:var(--soft-ink);margin:0}.contact-grid[data-astro-cid-uw5kdbxl]{display:grid;gap:1rem 2rem;margin:0;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr))}.contact-grid[data-astro-cid-uw5kdbxl] dt[data-astro-cid-uw5kdbxl]{font-family:var(--font-mono);font-size:.78rem;text-transform:uppercase;letter-spacing:.05em;color:var(--soft-ink)}.contact-grid[data-astro-cid-uw5kdbxl] dd[data-astro-cid-uw5kdbxl]{margin:.2rem 0 0;font-size:1.05rem}.footnote[data-astro-cid-uw5kdbxl]{color:var(--soft-ink);font-family:var(--font-mono);font-size:.78rem;margin-top:.5rem}\n',
        },
      ],
      routeData: {
        route: '/contact',
        isIndex: false,
        type: 'page',
        pattern: '^\\/contact\\/$',
        segments: [[{ content: 'contact', dynamic: false, spread: false }]],
        params: [],
        component: 'src/pages/contact.astro',
        pathname: '/contact',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        {
          type: 'inline',
          content:
            '.page[data-astro-cid-s63ypivo]{padding-block:clamp(2rem,6vw,5rem);display:grid;gap:1.5rem}.page-hero[data-astro-cid-s63ypivo]{display:grid;gap:.75rem;max-width:720px}h1[data-astro-cid-s63ypivo]{margin:0;font-size:clamp(2.25rem,5vw,4.2rem);font-weight:600;line-height:1;letter-spacing:-.055em}.lead[data-astro-cid-s63ypivo],.excerpt[data-astro-cid-s63ypivo]{color:var(--soft-ink);margin:0}.article-grid[data-astro-cid-s63ypivo]{display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;margin:0;padding:0;list-style:none}.article-card[data-astro-cid-s63ypivo]{overflow:hidden;border:1px solid var(--line);border-radius:var(--radius-lg);background:var(--surface);box-shadow:var(--shadow-sm)}.article-card__visual[data-astro-cid-s63ypivo]{position:relative;display:block;min-height:11rem;overflow:hidden;background:radial-gradient(circle at 72% 26%,rgb(255 255 255 / 82%) 0 2.5rem,transparent 2.6rem),linear-gradient(135deg,var(--accent-soft),#effbff 52%,#fff2c7)}.article-card__visual[data-astro-cid-s63ypivo]:before{position:absolute;inset:2.6rem auto auto 50%;width:8rem;height:2.6rem;border:1px solid rgb(90 107 118 / 16%);border-radius:.7rem .7rem 1.1rem 1.1rem;background:linear-gradient(180deg,#fff,#eef7fa);box-shadow:0 18px 34px #5a6b7629;content:"";transform:translate(-50%)}.article-card__visual[data-astro-cid-s63ypivo]:after{position:absolute;inset:auto 1.1rem 1.1rem auto;padding:.45rem .7rem;border-radius:999px;background:#ffffffc7;color:var(--accent-strong);font-size:.82rem;font-weight:610;box-shadow:var(--shadow-sm)}.article-card__visual[data-astro-cid-s63ypivo][data-visual=cleaning]:after{content:"AC care"}.article-card__visual[data-astro-cid-s63ypivo][data-visual=freon]:after{content:"Freon check"}.article-card__visual[data-astro-cid-s63ypivo][data-visual=refrigerant]:after{content:"R32 guide"}.article-card__visual[data-astro-cid-s63ypivo][data-visual=fridge]:after{content:"Fridge repair"}.article-card__body[data-astro-cid-s63ypivo]{display:grid;gap:.65rem;padding:1rem}.meta[data-astro-cid-s63ypivo]{margin:0;color:var(--accent-strong);font-size:.82rem;font-weight:600}h2[data-astro-cid-s63ypivo]{margin:0;font-size:clamp(1.15rem,2vw,1.45rem);font-weight:600;line-height:1.15;letter-spacing:-.035em}h2[data-astro-cid-s63ypivo] a[data-astro-cid-s63ypivo]{text-decoration:none}\n',
        },
      ],
      routeData: {
        route: '/en/blog',
        isIndex: true,
        type: 'page',
        pattern: '^\\/en\\/blog\\/$',
        segments: [
          [{ content: 'en', dynamic: false, spread: false }],
          [{ content: 'blog', dynamic: false, spread: false }],
        ],
        params: [],
        component: 'src/pages/en/blog/index.astro',
        pathname: '/en/blog',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        {
          type: 'inline',
          content:
            '.success[data-astro-cid-wnz2oe5s]{padding-block:clamp(3rem,7vw,5rem);display:grid;gap:1rem;max-width:640px}.lead[data-astro-cid-wnz2oe5s]{color:var(--soft-ink);margin:0}.ref[data-astro-cid-wnz2oe5s]{background:var(--paper, #fafaf6);border:1px solid var(--line);padding:.75rem 1rem;font-family:var(--font-mono);font-size:.85rem}.actions[data-astro-cid-wnz2oe5s]{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:.5rem}.button[data-astro-cid-wnz2oe5s]{display:inline-flex;align-items:center;min-height:48px;padding:.75rem 1.25rem;border:1px solid var(--ink);background:var(--inverse);color:var(--ink);text-decoration:none;font-weight:620}.button--primary[data-astro-cid-wnz2oe5s]{background:var(--ink);color:var(--inverse)}\n',
        },
      ],
      routeData: {
        route: '/en/booking/success',
        isIndex: false,
        type: 'page',
        pattern: '^\\/en\\/booking\\/success\\/$',
        segments: [
          [{ content: 'en', dynamic: false, spread: false }],
          [{ content: 'booking', dynamic: false, spread: false }],
          [{ content: 'success', dynamic: false, spread: false }],
        ],
        params: [],
        component: 'src/pages/en/booking/success.astro',
        pathname: '/en/booking/success',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        {
          type: 'inline',
          content:
            '.page[data-astro-cid-5zswjaxs]{padding-block:clamp(2rem,5vw,4rem);display:grid;gap:1.5rem;max-width:720px}.lead[data-astro-cid-5zswjaxs]{color:var(--soft-ink);margin:0}.booking-form[data-astro-cid-5zswjaxs]{display:grid;gap:1.25rem}fieldset[data-astro-cid-5zswjaxs]{border:1px solid var(--line);padding:1rem 1.1rem 1.2rem;display:grid;gap:.85rem}legend[data-astro-cid-5zswjaxs]{padding-inline:.4rem;font-family:var(--font-mono);font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;color:var(--soft-ink)}.field[data-astro-cid-5zswjaxs]{display:grid;gap:.35rem}.field[data-astro-cid-5zswjaxs]>span[data-astro-cid-5zswjaxs]{font-weight:620;font-size:.9rem}.field[data-astro-cid-5zswjaxs] input[data-astro-cid-5zswjaxs],.field[data-astro-cid-5zswjaxs] select[data-astro-cid-5zswjaxs],.field[data-astro-cid-5zswjaxs] textarea[data-astro-cid-5zswjaxs]{font:inherit;padding:.55rem .7rem;border:1px solid var(--line);background:var(--inverse);color:var(--ink);border-radius:0}.field[data-astro-cid-5zswjaxs] textarea[data-astro-cid-5zswjaxs]{resize:vertical}.help[data-astro-cid-5zswjaxs]{color:var(--soft-ink);font-size:.78rem}.form-actions[data-astro-cid-5zswjaxs]{display:flex;justify-content:flex-end}button[data-astro-cid-5zswjaxs]{background:var(--ink);color:var(--inverse);border:0;padding:.75rem 1.5rem;font:inherit;font-weight:620;cursor:pointer;min-height:48px}button[data-astro-cid-5zswjaxs]:disabled{opacity:.6;cursor:not-allowed}#booking-error[data-astro-cid-5zswjaxs]{background:#fef2f2;color:#991b1b;border:1px solid #fecaca;padding:.7rem .9rem;font-size:.9rem}.footnote[data-astro-cid-5zswjaxs]{color:var(--soft-ink);font-family:var(--font-mono);font-size:.78rem}\n',
        },
      ],
      routeData: {
        route: '/en/booking',
        isIndex: false,
        type: 'page',
        pattern: '^\\/en\\/booking\\/$',
        segments: [
          [{ content: 'en', dynamic: false, spread: false }],
          [{ content: 'booking', dynamic: false, spread: false }],
        ],
        params: [],
        component: 'src/pages/en/booking.astro',
        pathname: '/en/booking',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        {
          type: 'inline',
          content:
            '.page[data-astro-cid-v7lftu2i]{padding-block:clamp(2rem,5vw,4rem);display:grid;gap:1.25rem;max-width:720px}.lead[data-astro-cid-v7lftu2i]{color:var(--soft-ink);margin:0}.contact-grid[data-astro-cid-v7lftu2i]{display:grid;gap:1rem 2rem;margin:0;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr))}.contact-grid[data-astro-cid-v7lftu2i] dt[data-astro-cid-v7lftu2i]{font-family:var(--font-mono);font-size:.78rem;text-transform:uppercase;letter-spacing:.05em;color:var(--soft-ink)}.contact-grid[data-astro-cid-v7lftu2i] dd[data-astro-cid-v7lftu2i]{margin:.2rem 0 0;font-size:1.05rem}.footnote[data-astro-cid-v7lftu2i]{color:var(--soft-ink);font-family:var(--font-mono);font-size:.78rem;margin-top:.5rem}\n',
        },
      ],
      routeData: {
        route: '/en/contact',
        isIndex: false,
        type: 'page',
        pattern: '^\\/en\\/contact\\/$',
        segments: [
          [{ content: 'en', dynamic: false, spread: false }],
          [{ content: 'contact', dynamic: false, spread: false }],
        ],
        params: [],
        component: 'src/pages/en/contact.astro',
        pathname: '/en/contact',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        {
          type: 'inline',
          content:
            '.page[data-astro-cid-5lxejar4]{padding-block:clamp(2rem,6vw,5rem);display:grid;gap:1.5rem}.page-hero[data-astro-cid-5lxejar4]{display:grid;gap:.75rem;max-width:720px}h1[data-astro-cid-5lxejar4]{margin:0;font-size:clamp(2.15rem,5vw,4.1rem);font-weight:600;line-height:1;letter-spacing:-.055em}.lead[data-astro-cid-5lxejar4]{color:var(--soft-ink);margin:0}.area-grid[data-astro-cid-5lxejar4]{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem}.area-card[data-astro-cid-5lxejar4]{display:grid;gap:.7rem;padding:1rem;border:1px solid var(--line);border-radius:var(--radius-lg);background:var(--surface);box-shadow:var(--shadow-sm)}.area-card[data-astro-cid-5lxejar4] a[data-astro-cid-5lxejar4]{display:flex;justify-content:space-between;gap:1rem;text-decoration:none;font-weight:620}.area-card[data-astro-cid-5lxejar4] strong[data-astro-cid-5lxejar4]{color:var(--accent-strong);white-space:nowrap}.area-card[data-astro-cid-5lxejar4] p[data-astro-cid-5lxejar4],.area-card[data-astro-cid-5lxejar4] small[data-astro-cid-5lxejar4]{margin:0;color:var(--soft-ink)}\n',
        },
      ],
      routeData: {
        route: '/en/locations',
        isIndex: true,
        type: 'page',
        pattern: '^\\/en\\/locations\\/$',
        segments: [
          [{ content: 'en', dynamic: false, spread: false }],
          [{ content: 'locations', dynamic: false, spread: false }],
        ],
        params: [],
        component: 'src/pages/en/locations/index.astro',
        pathname: '/en/locations',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        {
          type: 'inline',
          content:
            '.page[data-astro-cid-pjamq5jz]{padding-block:clamp(2rem,6vw,5rem);display:grid;gap:1.5rem}.page-hero[data-astro-cid-pjamq5jz]{display:grid;gap:.75rem;max-width:720px}h1[data-astro-cid-pjamq5jz]{margin:0;font-size:clamp(2.15rem,5vw,4.1rem);font-weight:600;line-height:1;letter-spacing:-.055em}.lead[data-astro-cid-pjamq5jz],.summary[data-astro-cid-pjamq5jz]{color:var(--soft-ink);margin:0}.service-list[data-astro-cid-pjamq5jz]{list-style:none;margin:0;padding:0;display:grid;gap:1rem}.service-row[data-astro-cid-pjamq5jz]{display:grid;grid-template-columns:auto minmax(0,1fr) minmax(12rem,auto);gap:1rem;align-items:center;padding:1rem;border:1px solid var(--line);border-radius:var(--radius-lg);background:var(--surface);box-shadow:var(--shadow-sm)}.service-row__number[data-astro-cid-pjamq5jz]{display:grid;width:48px;height:48px;place-items:center;border-radius:16px;background:var(--accent-soft);color:var(--accent-strong);font-family:var(--font-mono);font-weight:620}h2[data-astro-cid-pjamq5jz]{margin:0 0 .4rem;font-size:clamp(1.25rem,2vw,1.65rem)}h2[data-astro-cid-pjamq5jz] a[data-astro-cid-pjamq5jz]{text-decoration:none}.meta-card[data-astro-cid-pjamq5jz]{display:grid;gap:.1rem;padding:.8rem 1rem;border-radius:var(--radius-md);background:var(--surface-tint);text-align:right}.meta-card[data-astro-cid-pjamq5jz] span[data-astro-cid-pjamq5jz],.meta-card[data-astro-cid-pjamq5jz] small[data-astro-cid-pjamq5jz]{color:var(--soft-ink);font-size:.82rem}.meta-card[data-astro-cid-pjamq5jz] strong[data-astro-cid-pjamq5jz]{color:var(--accent-strong);font-size:1.05rem}@media(max-width:760px){.service-row[data-astro-cid-pjamq5jz]{grid-template-columns:1fr}.meta-card[data-astro-cid-pjamq5jz]{text-align:left}}\n',
        },
      ],
      routeData: {
        route: '/en/services',
        isIndex: true,
        type: 'page',
        pattern: '^\\/en\\/services\\/$',
        segments: [
          [{ content: 'en', dynamic: false, spread: false }],
          [{ content: 'services', dynamic: false, spread: false }],
        ],
        params: [],
        component: 'src/pages/en/services/index.astro',
        pathname: '/en/services',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        { type: 'external', src: '/_astro/index.BeyNO_gr.css' },
      ],
      routeData: {
        route: '/en',
        isIndex: true,
        type: 'page',
        pattern: '^\\/en\\/$',
        segments: [[{ content: 'en', dynamic: false, spread: false }]],
        params: [],
        component: 'src/pages/en/index.astro',
        pathname: '/en',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        {
          type: 'inline',
          content:
            '.page[data-astro-cid-fvi7swcd]{padding-block:clamp(2rem,6vw,5rem);display:grid;gap:1.5rem}.page-hero[data-astro-cid-fvi7swcd]{display:grid;gap:.75rem;max-width:720px}h1[data-astro-cid-fvi7swcd]{margin:0;font-size:clamp(2.15rem,5vw,4.1rem);font-weight:600;line-height:1;letter-spacing:-.055em}.lead[data-astro-cid-fvi7swcd]{color:var(--soft-ink);margin:0}.area-grid[data-astro-cid-fvi7swcd]{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem}.area-card[data-astro-cid-fvi7swcd]{display:grid;gap:.7rem;padding:1rem;border:1px solid var(--line);border-radius:var(--radius-lg);background:var(--surface);box-shadow:var(--shadow-sm)}.area-card[data-astro-cid-fvi7swcd] a[data-astro-cid-fvi7swcd]{display:flex;justify-content:space-between;gap:1rem;text-decoration:none;font-weight:620}.area-card[data-astro-cid-fvi7swcd] strong[data-astro-cid-fvi7swcd]{color:var(--accent-strong);white-space:nowrap}.area-card[data-astro-cid-fvi7swcd] p[data-astro-cid-fvi7swcd],.area-card[data-astro-cid-fvi7swcd] small[data-astro-cid-fvi7swcd]{margin:0;color:var(--soft-ink)}\n',
        },
      ],
      routeData: {
        route: '/locations',
        isIndex: true,
        type: 'page',
        pattern: '^\\/locations\\/$',
        segments: [[{ content: 'locations', dynamic: false, spread: false }]],
        params: [],
        component: 'src/pages/locations/index.astro',
        pathname: '/locations',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        {
          type: 'inline',
          content:
            '.page[data-astro-cid-52q5xhqt]{padding-block:clamp(2rem,6vw,5rem);display:grid;gap:1.5rem}.page-hero[data-astro-cid-52q5xhqt]{display:grid;gap:.75rem;max-width:720px}h1[data-astro-cid-52q5xhqt]{margin:0;font-size:clamp(2.15rem,5vw,4.1rem);font-weight:600;line-height:1;letter-spacing:-.055em}.lead[data-astro-cid-52q5xhqt],.summary[data-astro-cid-52q5xhqt]{color:var(--soft-ink);margin:0}.service-list[data-astro-cid-52q5xhqt]{list-style:none;margin:0;padding:0;display:grid;gap:1rem}.service-row[data-astro-cid-52q5xhqt]{display:grid;grid-template-columns:auto minmax(0,1fr) minmax(12rem,auto);gap:1rem;align-items:center;padding:1rem;border:1px solid var(--line);border-radius:var(--radius-lg);background:var(--surface);box-shadow:var(--shadow-sm)}.service-row__number[data-astro-cid-52q5xhqt]{display:grid;width:48px;height:48px;place-items:center;border-radius:16px;background:var(--accent-soft);color:var(--accent-strong);font-family:var(--font-mono);font-weight:620}h2[data-astro-cid-52q5xhqt]{margin:0 0 .4rem;font-size:clamp(1.25rem,2vw,1.65rem)}h2[data-astro-cid-52q5xhqt] a[data-astro-cid-52q5xhqt]{text-decoration:none}.meta-card[data-astro-cid-52q5xhqt]{display:grid;gap:.1rem;padding:.8rem 1rem;border-radius:var(--radius-md);background:var(--surface-tint);text-align:right}.meta-card[data-astro-cid-52q5xhqt] span[data-astro-cid-52q5xhqt],.meta-card[data-astro-cid-52q5xhqt] small[data-astro-cid-52q5xhqt]{color:var(--soft-ink);font-size:.82rem}.meta-card[data-astro-cid-52q5xhqt] strong[data-astro-cid-52q5xhqt]{color:var(--accent-strong);font-size:1.05rem}@media(max-width:760px){.service-row[data-astro-cid-52q5xhqt]{grid-template-columns:1fr}.meta-card[data-astro-cid-52q5xhqt]{text-align:left}}\n',
        },
      ],
      routeData: {
        route: '/services',
        isIndex: true,
        type: 'page',
        pattern: '^\\/services\\/$',
        segments: [[{ content: 'services', dynamic: false, spread: false }]],
        params: [],
        component: 'src/pages/services/index.astro',
        pathname: '/services',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [],
      styles: [
        { type: 'external', src: '/_astro/_slug_.B7K2NFZa.css' },
        { type: 'external', src: '/_astro/index.DS_x_TEc.css' },
      ],
      routeData: {
        route: '/',
        isIndex: true,
        type: 'page',
        pattern: '^\\/$',
        segments: [],
        params: [],
        component: 'src/pages/index.astro',
        pathname: '/',
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: 'project',
        _meta: { trailingSlash: 'always' },
      },
    },
  ],
  base: '/',
  trailingSlash: 'always',
  compressHTML: true,
  componentMetadata: [
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/blog/[slug].astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/blog/index.astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/booking.astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/booking/success.astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/contact.astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/blog/[slug].astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/blog/index.astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/booking.astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/booking/success.astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/contact.astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/index.astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/locations/[slug].astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/locations/index.astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/services/[slug].astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/services/index.astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/index.astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/locations/[slug].astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/locations/index.astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/services/[slug].astro',
      { propagation: 'none', containsHead: true },
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/services/index.astro',
      { propagation: 'none', containsHead: true },
    ],
  ],
  renderers: [],
  clientDirectives: [
    [
      'idle',
      '(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value=="object"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};"requestIdleCallback"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event("astro:idle"));})();',
    ],
    [
      'load',
      '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();',
    ],
    [
      'media',
      '(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener("change",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event("astro:media"));})();',
    ],
    [
      'only',
      '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();',
    ],
    [
      'visible',
      '(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event("astro:visible"));})();',
    ],
  ],
  entryModules: {
    '\u0000@astro-page:src/pages/api/booking@_@ts': 'pages/api/booking.astro.mjs',
    '\u0000@astro-page:src/pages/blog/[slug]@_@astro': 'pages/blog/_slug_.astro.mjs',
    '\u0000@astro-page:src/pages/blog/index@_@astro': 'pages/blog.astro.mjs',
    '\u0000@astro-page:src/pages/booking/success@_@astro': 'pages/booking/success.astro.mjs',
    '\u0000@astro-page:src/pages/booking@_@astro': 'pages/booking.astro.mjs',
    '\u0000@astro-page:src/pages/contact@_@astro': 'pages/contact.astro.mjs',
    '\u0000@astro-page:src/pages/en/blog/[slug]@_@astro': 'pages/en/blog/_slug_.astro.mjs',
    '\u0000@astro-page:src/pages/en/blog/index@_@astro': 'pages/en/blog.astro.mjs',
    '\u0000@astro-page:src/pages/en/booking/success@_@astro': 'pages/en/booking/success.astro.mjs',
    '\u0000@astro-page:src/pages/en/booking@_@astro': 'pages/en/booking.astro.mjs',
    '\u0000@astro-page:src/pages/en/contact@_@astro': 'pages/en/contact.astro.mjs',
    '\u0000@astro-page:src/pages/en/index@_@astro': 'pages/en.astro.mjs',
    '\u0000@astro-page:src/pages/en/locations/[slug]@_@astro':
      'pages/en/locations/_slug_.astro.mjs',
    '\u0000@astro-page:src/pages/en/locations/index@_@astro': 'pages/en/locations.astro.mjs',
    '\u0000@astro-page:src/pages/en/services/[slug]@_@astro': 'pages/en/services/_slug_.astro.mjs',
    '\u0000@astro-page:src/pages/en/services/index@_@astro': 'pages/en/services.astro.mjs',
    '\u0000@astro-page:src/pages/index@_@astro': 'pages/index.astro.mjs',
    '\u0000@astro-page:src/pages/locations/[slug]@_@astro': 'pages/locations/_slug_.astro.mjs',
    '\u0000@astro-page:src/pages/locations/index@_@astro': 'pages/locations.astro.mjs',
    '\u0000@astro-page:src/pages/robots.txt@_@ts': 'pages/robots.txt.astro.mjs',
    '\u0000@astro-page:src/pages/services/[slug]@_@astro': 'pages/services/_slug_.astro.mjs',
    '\u0000@astro-page:src/pages/services/index@_@astro': 'pages/services.astro.mjs',
    '\u0000@astro-page:src/pages/sitemap.xml@_@ts': 'pages/sitemap.xml.astro.mjs',
    '\u0000@astrojs-ssr-virtual-entry': 'entry.mjs',
    '\u0000@astro-renderers': 'renderers.mjs',
    '\u0000noop-middleware': '_noop-middleware.mjs',
    '\u0000virtual:astro:actions/noop-entrypoint': 'noop-entrypoint.mjs',
    '\u0000@astro-page:../../node_modules/.pnpm/astro@5.18.2_@types+node@22.20.1_@vercel+functions@2.2.13_lightningcss@1.33.0_rollup@4._a5d90610f6321bd96efa46be71141ee2/node_modules/astro/dist/assets/endpoint/generic@_@js':
      'pages/_image/index.astro.mjs',
    '\u0000@astrojs-ssr-adapter': '_@astrojs-ssr-adapter.mjs',
    '\u0000@astrojs-manifest': 'manifest_CGE9mpBn.mjs',
    '/Users/mac/Projects/digiagency-portfolio/local-business-growth/node_modules/.pnpm/astro@5.18.2_@types+node@22.20.1_@vercel+functions@2.2.13_lightningcss@1.33.0_rollup@4._a5d90610f6321bd96efa46be71141ee2/node_modules/astro/dist/assets/services/sharp.js':
      'chunks/sharp_D0ci9IRP.mjs',
    '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/booking.astro?astro&type=script&index=0&lang.ts':
      '_astro/booking.astro_astro_type_script_index_0_lang.BEz4YcP0.js',
    '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/booking.astro?astro&type=script&index=0&lang.ts':
      '_astro/booking.astro_astro_type_script_index_0_lang.BAXvjtbi.js',
    'astro:scripts/before-hydration.js': '',
  },
  inlinedScripts: [
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/booking.astro?astro&type=script&index=0&lang.ts',
      'const o=document.getElementById("booking-form"),e=document.getElementById("booking-submit"),t=document.getElementById("booking-error"),a=o?.elements.namedItem("brand"),c=o?.querySelector(\'[data-show-when="other"]\');if(a&&c){const r=()=>{c.hidden=a.value!=="other"};a.addEventListener("change",r),r()}o&&e&&t&&o.addEventListener("submit",async r=>{r.preventDefault(),t.hidden=!0,t.textContent="",e.disabled=!0;const i=e.textContent;e.textContent=e.dataset.submitting??"Submitting…";try{const n=new FormData(o),d=await fetch("/api/booking/",{method:"POST",body:n}),s=await d.json();if(!d.ok||!s.ok){t.hidden=!1,t.textContent=s.message??"Submission failed";return}const l=s.id??"",m=n.get("locale")||"id";window.location.href=`${m==="en"?"/en":""}/booking/success/?ref=${l}`}catch(n){t.hidden=!1,t.textContent=n instanceof Error?n.message:"Network error"}finally{e.disabled=!1,i&&(e.textContent=i)}});',
    ],
    [
      '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/booking.astro?astro&type=script&index=0&lang.ts',
      'const o=document.getElementById("booking-form"),e=document.getElementById("booking-submit"),t=document.getElementById("booking-error"),a=o?.elements.namedItem("brand"),c=o?.querySelector(\'[data-show-when="other"]\');if(a&&c){const r=()=>{c.hidden=a.value!=="other"};a.addEventListener("change",r),r()}o&&e&&t&&o.addEventListener("submit",async r=>{r.preventDefault(),t.hidden=!0,t.textContent="",e.disabled=!0;const i=e.textContent;e.textContent=e.dataset.submitting??"Submitting…";try{const n=new FormData(o),d=await fetch("/api/booking/",{method:"POST",body:n}),s=await d.json();if(!d.ok||!s.ok){t.hidden=!1,t.textContent=s.message??"Submission failed";return}const l=s.id??"",m=n.get("locale")||"id";window.location.href=`${m==="en"?"/en":""}/booking/success/?ref=${l}`}catch(n){t.hidden=!1,t.textContent=n instanceof Error?n.message:"Network error"}finally{e.disabled=!1,i&&(e.textContent=i)}});',
    ],
  ],
  assets: [
    '/_astro/_slug_.B7K2NFZa.css',
    '/_astro/index.BeyNO_gr.css',
    '/_astro/index.DS_x_TEc.css',
    '/favicon.svg',
    '/images/ac-unit-420.png',
    '/images/ac-unit-420.webp',
    '/images/ac-unit-640.webp',
    '/robots.txt',
    '/sitemap.xml',
  ],
  buildFormat: 'directory',
  checkOrigin: false,
  allowedDomains: [],
  actionBodySizeLimit: 1048576,
  serverIslandNameMap: [],
  key: 'nS0AbhCL8V+hgY6hjdkKAjO4Kn0Lxiu6TL+qh9ETNgw=',
});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
