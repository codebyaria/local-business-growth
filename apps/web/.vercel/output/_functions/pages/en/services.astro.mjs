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
import { f as fixtureServices } from '../../chunks/fixtures_D8syZZm_.mjs';
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
    const services = await adapter.fetchServices();
    const servicesForLocale = services.length > 0 ? services : fixtureServices;
    const locale = localeFromPath(Astro2.url.pathname);
    const t = tFor(locale);
    const priceFormatter = new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US');
    return renderTemplate`${renderComponent(
      $$result,
      'BaseLayout',
      $$BaseLayout,
      {
        title: t.services.title,
        description: t.services.pageLead,
        locale: locale,
        'data-astro-cid-pjamq5jz': true,
      },
      {
        default: async ($$result2) =>
          renderTemplate` ${maybeRenderHead()}<section class="container page" aria-labelledby="services-title" data-astro-cid-pjamq5jz> <div class="page-hero" data-astro-cid-pjamq5jz> <p class="pill" data-astro-cid-pjamq5jz>❄ ${t.services.title} · ${servicesForLocale.length}</p> <h1 id="services-title" data-astro-cid-pjamq5jz>${t.services.pageHeading}</h1> <p class="lead" data-astro-cid-pjamq5jz>${t.services.pageLead}</p> </div> <ul class="service-list" data-astro-cid-pjamq5jz> ${servicesForLocale.map(
            (
              service,
              index,
            ) => renderTemplate`<li class="service-row" data-astro-cid-pjamq5jz> <div class="service-row__number" data-astro-cid-pjamq5jz>${String(index + 1).padStart(2, '0')}</div> <div data-astro-cid-pjamq5jz> <h2 data-astro-cid-pjamq5jz> <a${addAttribute(localizedHref(locale, `/services/${service.slug}/`), 'href')} data-astro-cid-pjamq5jz> ${pickLocale(service.name, locale)} </a> </h2> <p class="summary" data-astro-cid-pjamq5jz>${pickLocale(service.summary, locale)}</p> </div> <div class="meta-card" data-astro-cid-pjamq5jz> <span data-astro-cid-pjamq5jz>${t.home.startingFrom}</span> <strong data-astro-cid-pjamq5jz> ${priceFormatter.format(service.startingPriceIdr)} ${t.home.currency} </strong> <small data-astro-cid-pjamq5jz>
~${service.durationMinutes} ${t.service.minutes} </small> </div> </li>`,
          )} </ul> </section> `,
      },
    )} `;
  },
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/services/index.astro',
  void 0,
);
const $$file =
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/services/index.astro';
const $$url = '/en/services/';

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
