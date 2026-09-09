import {
  e as createComponent,
  k as renderComponent,
  r as renderTemplate,
  h as createAstro,
  m as maybeRenderHead,
  g as addAttribute,
} from '../chunks/astro/server_C9p18JK-.mjs';
import {
  l as localeFromPath,
  $ as $$BaseLayout,
  t as tFor,
} from '../chunks/ui-strings_DZppwvaA.mjs';
import { c as createContentAdapter } from '../chunks/content-adapter_CZzLdwLk.mjs';
import { p as pickLocale } from '../chunks/index_fNwO7Lh0.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Contact = createComponent(
  async ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
    Astro2.self = $$Contact;
    const adapter = createContentAdapter({
      strapiUrl: '',
      strapiToken: '',
    });
    const settings = await adapter.fetchSiteSettings();
    const locale = localeFromPath(Astro2.url.pathname);
    const t = tFor(locale);
    const whatsappHref = `https://wa.me/${settings.contact.whatsapp.replace(/[^\d]/g, '')}`;
    return renderTemplate`${renderComponent(
      $$result,
      'BaseLayout',
      $$BaseLayout,
      {
        title: t.contact.title,
        description: t.contact.pageLead,
        locale: locale,
        'data-astro-cid-uw5kdbxl': true,
      },
      {
        default: async (
          $$result2,
        ) => renderTemplate` ${maybeRenderHead()}<section class="container page" aria-labelledby="contact-title" data-astro-cid-uw5kdbxl> <p class="label" data-astro-cid-uw5kdbxl>${t.contact.title}</p> <h1 id="contact-title" data-astro-cid-uw5kdbxl>${t.contact.pageHeading}</h1> <p class="lead" data-astro-cid-uw5kdbxl>${t.contact.pageLead}</p> <dl class="contact-grid" data-astro-cid-uw5kdbxl> <div data-astro-cid-uw5kdbxl> <dt data-astro-cid-uw5kdbxl>${t.contact.whatsappCta}</dt> <dd data-astro-cid-uw5kdbxl> <a${addAttribute(whatsappHref, 'href')} data-astro-cid-uw5kdbxl>${settings.contact.whatsapp}</a> </dd> </div> <div data-astro-cid-uw5kdbxl> <dt data-astro-cid-uw5kdbxl>${t.contact.emailLabel}</dt> <dd data-astro-cid-uw5kdbxl> <a${addAttribute(`mailto:${settings.contact.email}`, 'href')} data-astro-cid-uw5kdbxl>${settings.contact.email}</a> </dd> </div> <div data-astro-cid-uw5kdbxl> <dt data-astro-cid-uw5kdbxl>${t.contact.phoneLabel}</dt> <dd data-astro-cid-uw5kdbxl>${settings.contact.phone}</dd> </div> <div data-astro-cid-uw5kdbxl> <dt data-astro-cid-uw5kdbxl>${t.contact.addressLabel}</dt> <dd data-astro-cid-uw5kdbxl>${pickLocale(settings.contact.address, locale)}</dd> </div> <div data-astro-cid-uw5kdbxl> <dt data-astro-cid-uw5kdbxl>${t.contact.hoursLabel}</dt> <dd data-astro-cid-uw5kdbxl>${pickLocale(settings.businessHours, locale)}</dd> </div> </dl> <p class="footnote" data-astro-cid-uw5kdbxl>
Source: <code data-astro-cid-uw5kdbxl>${adapter.source}</code> · Established ${settings.establishedYear} </p> </section> `,
      },
    )} `;
  },
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/contact.astro',
  void 0,
);
const $$file =
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/contact.astro';
const $$url = '/contact/';

const _page = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: $$Contact,
      file: $$file,
      url: $$url,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);

const page = () => _page;

export { page };
