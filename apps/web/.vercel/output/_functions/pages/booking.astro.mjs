import {
  e as createComponent,
  k as renderComponent,
  l as renderScript,
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
import { f as fixtureServices } from '../chunks/fixtures_D8syZZm_.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Booking = createComponent(
  async ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
    Astro2.self = $$Booking;
    const adapter = createContentAdapter({
      strapiUrl: '',
      strapiToken: '',
    });
    const [services, settings] = await Promise.all([
      adapter.fetchServices(),
      adapter.fetchSiteSettings(),
    ]);
    const locale = localeFromPath(Astro2.url.pathname);
    const t = tFor(locale);
    const servicesForLocale = services.length > 0 ? services : fixtureServices;
    return renderTemplate`${renderComponent(
      $$result,
      'BaseLayout',
      $$BaseLayout,
      {
        title: t.booking.title,
        description: t.booking.pageLead,
        locale: locale,
        'data-astro-cid-pdfs7twc': true,
      },
      {
        default: async (
          $$result2,
        ) => renderTemplate` ${maybeRenderHead()}<section class="container page" aria-labelledby="booking-title" data-astro-cid-pdfs7twc> <p class="label" data-astro-cid-pdfs7twc>${t.booking.title}</p> <h1 id="booking-title" data-astro-cid-pdfs7twc>${t.booking.pageHeading}</h1> <p class="lead" data-astro-cid-pdfs7twc>${t.booking.pageLead}</p> <form id="booking-form" method="post" action="/api/booking/" class="booking-form" novalidate data-astro-cid-pdfs7twc> <input type="hidden" name="locale"${addAttribute(locale, 'value')} data-astro-cid-pdfs7twc> <fieldset data-astro-cid-pdfs7twc> <legend data-astro-cid-pdfs7twc>${t.booking.sectionService}</legend> <label class="field" data-astro-cid-pdfs7twc> <span data-astro-cid-pdfs7twc>${t.booking.serviceLabel}</span> <select name="serviceSlug" required data-astro-cid-pdfs7twc> <option value="" data-astro-cid-pdfs7twc>${t.booking.servicePlaceholder}</option> ${servicesForLocale.map((s) => renderTemplate`<option${addAttribute(s.slug, 'value')} data-astro-cid-pdfs7twc>${pickLocale(s.name, locale)}</option>`)} </select> </label> </fieldset> <fieldset data-astro-cid-pdfs7twc> <legend data-astro-cid-pdfs7twc>${t.booking.sectionUnit}</legend> <label class="field" data-astro-cid-pdfs7twc> <span data-astro-cid-pdfs7twc>${t.booking.unitTypeLabel}</span> <select name="unitType" required data-astro-cid-pdfs7twc> <option value="split" data-astro-cid-pdfs7twc>${t.booking.unitTypeOptions.split}</option> <option value="window" data-astro-cid-pdfs7twc>${t.booking.unitTypeOptions.window}</option> <option value="cassette" data-astro-cid-pdfs7twc>${t.booking.unitTypeOptions.cassette}</option> <option value="standing_floor" data-astro-cid-pdfs7twc>${t.booking.unitTypeOptions.standing_floor}</option> </select> </label> <label class="field" data-astro-cid-pdfs7twc> <span data-astro-cid-pdfs7twc>${t.booking.brandLabel}</span> <select name="brand" required data-astro-cid-pdfs7twc> <option value="daikin" data-astro-cid-pdfs7twc>${t.booking.brandOptions.daikin}</option> <option value="lg" data-astro-cid-pdfs7twc>${t.booking.brandOptions.lg}</option> <option value="panasonic" data-astro-cid-pdfs7twc>${t.booking.brandOptions.panasonic}</option> <option value="sharp" data-astro-cid-pdfs7twc>${t.booking.brandOptions.sharp}</option> <option value="samsung" data-astro-cid-pdfs7twc>${t.booking.brandOptions.samsung}</option> <option value="gree" data-astro-cid-pdfs7twc>${t.booking.brandOptions.gree}</option> <option value="aux" data-astro-cid-pdfs7twc>${t.booking.brandOptions.aux}</option> <option value="daewoo" data-astro-cid-pdfs7twc>${t.booking.brandOptions.daewoo}</option> <option value="other" data-astro-cid-pdfs7twc>${t.booking.brandOptions.other}</option> </select> </label> <label class="field" data-show-when="other" data-astro-cid-pdfs7twc> <span data-astro-cid-pdfs7twc>${t.booking.brandOtherLabel}</span> <input type="text" name="brandOther" autocomplete="off" data-astro-cid-pdfs7twc> </label> <label class="field" data-astro-cid-pdfs7twc> <span data-astro-cid-pdfs7twc>${t.booking.issueLabel}</span> <textarea name="issue" rows="3" required minlength="5" data-astro-cid-pdfs7twc></textarea> <small class="help" data-astro-cid-pdfs7twc>${t.booking.issueHelp}</small> </label> </fieldset> <fieldset data-astro-cid-pdfs7twc> <legend data-astro-cid-pdfs7twc>${t.booking.sectionSchedule}</legend> <label class="field" data-astro-cid-pdfs7twc> <span data-astro-cid-pdfs7twc>${t.booking.addressLabel}</span> <input type="text" name="address" required minlength="5" autocomplete="street-address" data-astro-cid-pdfs7twc> </label> <label class="field" data-astro-cid-pdfs7twc> <span data-astro-cid-pdfs7twc>${t.booking.preferredDateLabel}</span> <input type="date" name="preferredDate" required data-astro-cid-pdfs7twc> </label> <label class="field" data-astro-cid-pdfs7twc> <span data-astro-cid-pdfs7twc>${t.booking.urgencyLabel}</span> <select name="urgency" required data-astro-cid-pdfs7twc> <option value="asap" data-astro-cid-pdfs7twc>${t.booking.urgencyOptions.asap}</option> <option value="today" data-astro-cid-pdfs7twc>${t.booking.urgencyOptions.today}</option> <option value="this_week" data-astro-cid-pdfs7twc>${t.booking.urgencyOptions.this_week}</option> <option value="flexible" data-astro-cid-pdfs7twc>${t.booking.urgencyOptions.flexible}</option> </select> </label> </fieldset> <fieldset data-astro-cid-pdfs7twc> <legend data-astro-cid-pdfs7twc>${t.booking.sectionContact}</legend> <label class="field" data-astro-cid-pdfs7twc> <span data-astro-cid-pdfs7twc>${t.booking.nameLabel}</span> <input type="text" name="contactName" required minlength="2" autocomplete="name" data-astro-cid-pdfs7twc> </label> <label class="field" data-astro-cid-pdfs7twc> <span data-astro-cid-pdfs7twc>${t.booking.phoneLabel}</span> <input type="tel" name="contactPhone" required pattern="^[+\d][\d\s\-()]{6,}$" autocomplete="tel" data-astro-cid-pdfs7twc> </label> <label class="field" data-astro-cid-pdfs7twc> <span data-astro-cid-pdfs7twc>${t.booking.emailLabel}</span> <input type="email" name="contactEmail" autocomplete="email" data-astro-cid-pdfs7twc> </label> <label class="field" data-astro-cid-pdfs7twc> <span data-astro-cid-pdfs7twc>${t.booking.notesLabel}</span> <textarea name="notes" rows="2" data-astro-cid-pdfs7twc></textarea> </label> </fieldset> <div id="booking-error" role="alert" hidden data-astro-cid-pdfs7twc></div> <div class="form-actions" data-astro-cid-pdfs7twc> <button type="submit" id="booking-submit" data-astro-cid-pdfs7twc>${t.booking.submit}</button> </div> </form> <p class="footnote" data-astro-cid-pdfs7twc> ${locale === 'id' ? 'Setelah dikirim, tim akan menghubungi Anda untuk konfirmasi jadwal dan estimasi biaya.' : 'After submission, the team will contact you to confirm the schedule and estimated cost.'}
· Contact: <code data-astro-cid-pdfs7twc>${settings.contact.email}</code> </p> </section> `,
      },
    )} ${renderScript($$result, '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/booking.astro?astro&type=script&index=0&lang.ts')} `;
  },
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/booking.astro',
  void 0,
);
const $$file =
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/booking.astro';
const $$url = '/booking/';

const _page = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: $$Booking,
      file: $$file,
      url: $$url,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);

const page = () => _page;

export { page };
