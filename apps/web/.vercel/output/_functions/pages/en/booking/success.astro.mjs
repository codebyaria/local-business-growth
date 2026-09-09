import {
  e as createComponent,
  k as renderComponent,
  r as renderTemplate,
  h as createAstro,
  m as maybeRenderHead,
  g as addAttribute,
} from '../../../chunks/astro/server_C9p18JK-.mjs';
import {
  l as localeFromPath,
  $ as $$BaseLayout,
  t as tFor,
  a as localizedHref,
} from '../../../chunks/ui-strings_DZppwvaA.mjs';
/* empty css                                         */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Success = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
    Astro2.self = $$Success;
    const locale = localeFromPath(Astro2.url.pathname);
    const t = tFor(locale);
    const ref = Astro2.url.searchParams.get('ref') ?? '';
    const whatsappNumber = '+6281200000000';
    const whatsappText = encodeURIComponent(
      locale === 'id'
        ? `Halo, saya baru saja booking service dan dapat referensi ${ref}.`
        : `Hi, I just submitted a service booking and got reference ${ref}.`,
    );
    return renderTemplate`${renderComponent($$result, 'BaseLayout', $$BaseLayout, { title: t.booking.successHeading, description: t.booking.successLead, locale: locale, 'data-astro-cid-wnz2oe5s': true }, { default: ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container success" aria-labelledby="success-title" data-astro-cid-wnz2oe5s> <p class="label" data-astro-cid-wnz2oe5s>${t.booking.successHeading}</p> <h1 id="success-title" data-astro-cid-wnz2oe5s>${t.booking.successHeading}</h1> <p class="lead" data-astro-cid-wnz2oe5s>${t.booking.successLead}</p> ${ref && renderTemplate`<p class="ref" data-astro-cid-wnz2oe5s> <strong data-astro-cid-wnz2oe5s>${t.booking.successIdLabel}:</strong> <code data-astro-cid-wnz2oe5s>${ref}</code> </p>`} <div class="actions" data-astro-cid-wnz2oe5s> <a class="button button--primary"${addAttribute(`https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${whatsappText}`, 'href')} data-astro-cid-wnz2oe5s> ${t.booking.successWhatsappCta} </a> <a class="button"${addAttribute(localizedHref(locale, '/'), 'href')} data-astro-cid-wnz2oe5s>${t.booking.successBackHome}</a> </div> </section> ` })} `;
  },
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/booking/success.astro',
  void 0,
);

const $$file =
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/booking/success.astro';
const $$url = '/en/booking/success/';

const _page = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: $$Success,
      file: $$file,
      url: $$url,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);

const page = () => _page;

export { page };
