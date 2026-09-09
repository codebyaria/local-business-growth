import {
  e as createComponent,
  k as renderComponent,
  r as renderTemplate,
  h as createAstro,
  m as maybeRenderHead,
  g as addAttribute,
} from '../../chunks/astro/server_C9p18JK-.mjs';
import {
  l as localeFromPath,
  $ as $$BaseLayout,
  t as tFor,
  a as localizedHref,
} from '../../chunks/ui-strings_DZppwvaA.mjs';
import { c as createContentAdapter } from '../../chunks/content-adapter_CZzLdwLk.mjs';
import { p as pickLocale } from '../../chunks/index_fNwO7Lh0.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(
  async ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
    Astro2.self = $$Index;
    const adapter = createContentAdapter({
      strapiUrl: '',
      strapiToken: '',
    });
    const locations = await adapter.fetchLocations();
    const locale = localeFromPath(Astro2.url.pathname);
    const t = tFor(locale);
    return renderTemplate`${renderComponent($$result, 'BaseLayout', $$BaseLayout, { title: t.locations.title, description: t.locations.pageLead, locale: locale, 'data-astro-cid-5lxejar4': true }, { default: async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container page" aria-labelledby="locations-title" data-astro-cid-5lxejar4> <div class="page-hero" data-astro-cid-5lxejar4> <p class="pill" data-astro-cid-5lxejar4>📍 ${t.locations.title} · ${locations.length}</p> <h1 id="locations-title" data-astro-cid-5lxejar4>${t.locations.pageHeading}</h1> <p class="lead" data-astro-cid-5lxejar4>${t.locations.pageLead}</p> </div> <ul class="area-grid" data-astro-cid-5lxejar4> ${locations.map((location) => renderTemplate`<li class="area-card" data-astro-cid-5lxejar4> <a${addAttribute(localizedHref(locale, `/locations/${location.slug}/`), 'href')} data-astro-cid-5lxejar4> <span data-astro-cid-5lxejar4>${pickLocale(location.name, locale)}</span> <strong data-astro-cid-5lxejar4> ${location.responseTimeMinutes} ${t.location.minutes} </strong> </a> <p data-astro-cid-5lxejar4>${pickLocale(location.region, locale)}</p> <small data-astro-cid-5lxejar4> ${location.serviceCount} ${locale === 'id' ? 'layanan aktif' : 'active services'} </small> </li>`)} </ul> </section> ` })} `;
  },
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/locations/index.astro',
  void 0,
);
const $$file =
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/locations/index.astro';
const $$url = '/en/locations/';

const _page = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: $$Index,
      file: $$file,
      url: $$url,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);

const page = () => _page;

export { page };
