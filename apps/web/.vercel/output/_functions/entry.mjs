import { renderers } from './renderers.mjs';
import {
  c as createExports,
  s as serverEntrypointModule,
} from './chunks/_@astrojs-ssr-adapter_DFFo5-fo.mjs';
import { manifest } from './manifest_CGE9mpBn.mjs';

const serverIslandMap = new Map();

const _page0 = () => import('./pages/_image/index.astro.mjs');
const _page1 = () => import('./pages/api/booking.astro.mjs');
const _page2 = () => import('./pages/blog/_slug_.astro.mjs');
const _page3 = () => import('./pages/blog.astro.mjs');
const _page4 = () => import('./pages/booking/success.astro.mjs');
const _page5 = () => import('./pages/booking.astro.mjs');
const _page6 = () => import('./pages/contact.astro.mjs');
const _page7 = () => import('./pages/en/blog/_slug_.astro.mjs');
const _page8 = () => import('./pages/en/blog.astro.mjs');
const _page9 = () => import('./pages/en/booking/success.astro.mjs');
const _page10 = () => import('./pages/en/booking.astro.mjs');
const _page11 = () => import('./pages/en/contact.astro.mjs');
const _page12 = () => import('./pages/en/locations/_slug_.astro.mjs');
const _page13 = () => import('./pages/en/locations.astro.mjs');
const _page14 = () => import('./pages/en/services/_slug_.astro.mjs');
const _page15 = () => import('./pages/en/services.astro.mjs');
const _page16 = () => import('./pages/en.astro.mjs');
const _page17 = () => import('./pages/locations/_slug_.astro.mjs');
const _page18 = () => import('./pages/locations.astro.mjs');
const _page19 = () => import('./pages/robots.txt.astro.mjs');
const _page20 = () => import('./pages/services/_slug_.astro.mjs');
const _page21 = () => import('./pages/services.astro.mjs');
const _page22 = () => import('./pages/sitemap.xml.astro.mjs');
const _page23 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
  [
    '../../node_modules/.pnpm/astro@5.18.2_@types+node@22.20.1_@vercel+functions@2.2.13_lightningcss@1.33.0_rollup@4._a5d90610f6321bd96efa46be71141ee2/node_modules/astro/dist/assets/endpoint/generic.js',
    _page0,
  ],
  ['src/pages/api/booking.ts', _page1],
  ['src/pages/blog/[slug].astro', _page2],
  ['src/pages/blog/index.astro', _page3],
  ['src/pages/booking/success.astro', _page4],
  ['src/pages/booking.astro', _page5],
  ['src/pages/contact.astro', _page6],
  ['src/pages/en/blog/[slug].astro', _page7],
  ['src/pages/en/blog/index.astro', _page8],
  ['src/pages/en/booking/success.astro', _page9],
  ['src/pages/en/booking.astro', _page10],
  ['src/pages/en/contact.astro', _page11],
  ['src/pages/en/locations/[slug].astro', _page12],
  ['src/pages/en/locations/index.astro', _page13],
  ['src/pages/en/services/[slug].astro', _page14],
  ['src/pages/en/services/index.astro', _page15],
  ['src/pages/en/index.astro', _page16],
  ['src/pages/locations/[slug].astro', _page17],
  ['src/pages/locations/index.astro', _page18],
  ['src/pages/robots.txt.ts', _page19],
  ['src/pages/services/[slug].astro', _page20],
  ['src/pages/services/index.astro', _page21],
  ['src/pages/sitemap.xml.ts', _page22],
  ['src/pages/index.astro', _page23],
]);

const _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  actions: () => import('./noop-entrypoint.mjs'),
  middleware: () => import('./_noop-middleware.mjs'),
});
const _args = {
  middlewareSecret: 'a3f0fe80-893f-43d6-82a4-3b28b494b1ad',
  skewProtection: false,
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start));

export { __astrojsSsrVirtualEntry as default, pageMap };
