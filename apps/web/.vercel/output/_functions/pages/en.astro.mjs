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
  a as localizedHref,
  t as tFor,
} from '../chunks/ui-strings_DZppwvaA.mjs';
import { c as createContentAdapter } from '../chunks/content-adapter_CZzLdwLk.mjs';
import { p as pickLocale } from '../chunks/index_fNwO7Lh0.mjs';
import { f as fixtureServices, c as fixtureTestimonials } from '../chunks/fixtures_D8syZZm_.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(
  async ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
    Astro2.self = $$Index;
    const adapter = createContentAdapter({
      strapiUrl: '',
      strapiToken: '',
    });
    const [services, locations, settings, testimonials] = await Promise.all([
      adapter.fetchServices(),
      adapter.fetchLocations(),
      adapter.fetchSiteSettings(),
      adapter.fetchTestimonials(),
    ]);
    const locale = localeFromPath(Astro2.url.pathname);
    const t = tFor(locale);
    const servicesForLocale = services.length > 0 ? services : fixtureServices;
    const testimonialsForLocale = testimonials.length > 0 ? testimonials : fixtureTestimonials;
    const firstService = servicesForLocale[0];
    const heroService =
      locale === 'id'
        ? {
            label: 'Paling sering dipesan',
            name: 'Cuci AC split',
            summary:
              'Cuci filter, cek drain, dan tes suhu. Cocok untuk unit rumah, ruko, dan kantor kecil.',
            badge: 'Jakarta Selatan · slot hari ini',
            response: '±90 menit',
            responseLabel: 'rata-rata balasan',
            availability: 'Hari ini',
            availabilityLabel: 'slot teknisi',
          }
        : {
            label: 'Most booked',
            name: 'Split AC deep clean',
            summary:
              'Filter wash, drain check, and cooling test for homes, shop houses, and small offices.',
            badge: 'South Jakarta · today slots',
            response: '±90 min',
            responseLabel: 'avg reply',
            availability: 'Today',
            availabilityLabel: 'technician slots',
          };
    const priceFormatter = new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US');
    const trustItems =
      locale === 'id'
        ? [
            'Teknisi area terdekat',
            'Estimasi harga jelas',
            'Booking via WhatsApp',
            'Same-day tersedia',
          ]
        : [
            'Nearest-area technician',
            'Clear price estimate',
            'WhatsApp booking',
            'Same-day available',
          ];
    const howItWorks =
      locale === 'id'
        ? [
            ['Pilih layanan', 'Pilih keluhan dan tipe unit dari halaman booking.'],
            ['Kami cek area', 'Permintaan diarahkan ke teknisi terdekat berdasarkan lokasi.'],
            ['Jadwal dikonfirmasi', 'Pelanggan menerima follow-up WhatsApp dan nomor referensi.'],
          ]
        : [
            ['Choose a service', 'Select the issue and unit type from the booking page.'],
            ['We check the area', 'The request routes to the nearest available technician.'],
            ['Schedule confirmed', 'Customers receive WhatsApp follow-up and a reference number.'],
          ];
    return renderTemplate`${renderComponent(
      $$result,
      'BaseLayout',
      $$BaseLayout,
      {
        title: pickLocale(settings.brand, locale),
        description: pickLocale(settings.tagline, locale),
        locale: locale,
        'data-astro-cid-dhfotatx': true,
      },
      {
        default: async ($$result2) =>
          renderTemplate` ${maybeRenderHead()}<section class="hero" aria-labelledby="hero-title" data-astro-cid-dhfotatx> <div class="container hero__grid" data-astro-cid-dhfotatx> <div class="hero__copy" data-astro-cid-dhfotatx> <p class="pill" data-astro-cid-dhfotatx>❄ ${t.home.eyebrow}</p> <h1 id="hero-title" data-astro-cid-dhfotatx>${pickLocale(settings.tagline, locale)}</h1> <p class="hero__lead" data-astro-cid-dhfotatx>${t.home.lead}</p> <div class="hero__actions" data-astro-cid-dhfotatx> <a class="button button--primary"${addAttribute(localizedHref(locale, '/booking/'), 'href')} data-astro-cid-dhfotatx>${t.home.ctaBook}</a> <a class="button"${addAttribute(localizedHref(locale, '/services/'), 'href')} data-astro-cid-dhfotatx>${t.home.ctaServices}</a> </div> <ul class="trust-strip"${addAttribute(locale === 'id' ? 'Sinyal kepercayaan' : 'Trust signals', 'aria-label')} data-astro-cid-dhfotatx> ${trustItems.map((item) => renderTemplate`<li data-astro-cid-dhfotatx>✓ ${item}</li>`)} </ul> </div> <aside class="hero-feature"${addAttribute(locale === 'id' ? 'Ringkasan booking' : 'Booking summary', 'aria-label')} data-astro-cid-dhfotatx> <div class="floating-badge floating-badge--availability" data-astro-cid-dhfotatx> <span aria-hidden="true" data-astro-cid-dhfotatx></span> <strong data-astro-cid-dhfotatx>${heroService.badge}</strong> </div> <div class="service-visual-card" data-astro-cid-dhfotatx> <div class="service-visual-card__head" data-astro-cid-dhfotatx> <div data-astro-cid-dhfotatx> <p data-astro-cid-dhfotatx>${heroService.label}</p> <h2 data-astro-cid-dhfotatx>${heroService.name}</h2> <span data-astro-cid-dhfotatx>${heroService.summary}</span> </div> <div class="ac-illustration" aria-hidden="true" data-astro-cid-dhfotatx> <picture data-astro-cid-dhfotatx> <source srcset="/images/ac-unit-420.webp 420w, /images/ac-unit-640.webp 640w" type="image/webp" sizes="(max-width: 860px) 220px, 260px" data-astro-cid-dhfotatx> <img src="/images/ac-unit-420.png" alt="" width="420" height="203" loading="eager" decoding="async" data-astro-cid-dhfotatx> </picture> </div> </div> <p class="price-line" data-astro-cid-dhfotatx> ${locale === 'id' ? 'Mulai' : 'From'} <strong data-astro-cid-dhfotatx>${locale === 'id' ? 'Rp ' : 'IDR '}${firstService ? priceFormatter.format(firstService.startingPriceIdr) : locale === 'id' ? '150.000' : '150,000'}</strong> </p> <div class="hero-metrics"${addAttribute(locale === 'id' ? 'Ringkasan layanan' : 'Service summary', 'aria-label')} data-astro-cid-dhfotatx> <div class="hero-metric" data-astro-cid-dhfotatx> <span aria-hidden="true" data-astro-cid-dhfotatx>◷</span> <p data-astro-cid-dhfotatx> <strong data-astro-cid-dhfotatx>${heroService.response}</strong> <small data-astro-cid-dhfotatx>${heroService.responseLabel}</small> </p> </div> <div class="hero-metric" data-astro-cid-dhfotatx> <span aria-hidden="true" data-astro-cid-dhfotatx>↯</span> <p data-astro-cid-dhfotatx> <strong data-astro-cid-dhfotatx>${heroService.availability}</strong> <small data-astro-cid-dhfotatx>${heroService.availabilityLabel}</small> </p> </div> </div> </div> </aside> </div> </section> <section class="container services-section"${addAttribute(t.home.sectionWhat, 'aria-label')} data-astro-cid-dhfotatx> <div class="section-head section-head--split" data-astro-cid-dhfotatx> <div data-astro-cid-dhfotatx> <p class="label" data-astro-cid-dhfotatx>${t.home.sectionWhat}</p> <h2 data-astro-cid-dhfotatx>${t.home.sectionWhatHeading}</h2> </div> <a${addAttribute(localizedHref(locale, '/services/'), 'href')} data-astro-cid-dhfotatx>${locale === 'id' ? 'Semua layanan →' : 'All services →'}</a> </div> <ul class="service-grid" data-astro-cid-dhfotatx> ${servicesForLocale
            .slice(0, 4)
            .map(
              (
                service,
              ) => renderTemplate`<li class="service-card" data-astro-cid-dhfotatx> <span class="service-card__icon" aria-hidden="true" data-astro-cid-dhfotatx>
❄
</span> <h3 data-astro-cid-dhfotatx> <a${addAttribute(localizedHref(locale, `/services/${service.slug}/`), 'href')} data-astro-cid-dhfotatx> ${pickLocale(service.name, locale)} </a> </h3> <p data-astro-cid-dhfotatx>${pickLocale(service.summary, locale)}</p> <div class="service-card__meta" data-astro-cid-dhfotatx> <span data-astro-cid-dhfotatx> ${priceFormatter.format(service.startingPriceIdr)} ${t.home.currency} </span> <span data-astro-cid-dhfotatx> ${service.durationMinutes} ${t.service.minutes} </span> </div> </li>`,
            )} </ul> </section> <section class="container split-section"${addAttribute(t.home.sectionWhere, 'aria-label')} data-astro-cid-dhfotatx> <div class="area-panel" data-astro-cid-dhfotatx> <p class="label" data-astro-cid-dhfotatx>${t.home.sectionWhere}</p> <h2 data-astro-cid-dhfotatx>${t.home.sectionWhereHeading}</h2> <p data-astro-cid-dhfotatx> ${locale === 'id' ? 'Pilih area terdekat agar tim bisa memperkirakan waktu kunjungan dan teknisi yang tersedia.' : 'Choose the closest area so the team can estimate visit time and available technicians.'} </p> <a class="button"${addAttribute(localizedHref(locale, '/locations/'), 'href')} data-astro-cid-dhfotatx>${locale === 'id' ? 'Lihat area' : 'View areas'}</a> </div> <ul class="area-list" data-astro-cid-dhfotatx> ${locations.slice(0, 6).map((location) => renderTemplate`<li data-astro-cid-dhfotatx> <span data-astro-cid-dhfotatx>${pickLocale(location.name, locale)}</span> <strong data-astro-cid-dhfotatx> ${location.responseTimeMinutes} ${t.home.minutes} </strong> </li>`)} </ul> </section> <section class="container process-section"${addAttribute(locale === 'id' ? 'Cara kerja booking' : 'How booking works', 'aria-label')} data-astro-cid-dhfotatx> <div class="section-head" data-astro-cid-dhfotatx> <p class="label" data-astro-cid-dhfotatx>${locale === 'id' ? 'Cara kerja' : 'How it works'}</p> <h2 data-astro-cid-dhfotatx> ${locale === 'id' ? 'Dari landing page ke jadwal teknisi.' : 'From landing page to technician schedule.'} </h2> </div> <ol class="steps" data-astro-cid-dhfotatx> ${howItWorks.map(([title, body], index) => renderTemplate`<li data-astro-cid-dhfotatx> <span data-astro-cid-dhfotatx>${String(index + 1).padStart(2, '0')}</span> <h3 data-astro-cid-dhfotatx>${title}</h3> <p data-astro-cid-dhfotatx>${body}</p> </li>`)} </ol> </section> ${testimonialsForLocale.length > 0 && renderTemplate`<section class="container testimonials"${addAttribute(t.home.sectionTestimonials, 'aria-label')} data-astro-cid-dhfotatx> <div class="section-head section-head--center" data-astro-cid-dhfotatx> <p class="label" data-astro-cid-dhfotatx>${t.home.sectionTestimonials}</p> <h2 data-astro-cid-dhfotatx>${t.home.sectionTestimonialsHeading}</h2> </div> <ul class="testimonial-grid" data-astro-cid-dhfotatx> ${testimonialsForLocale.slice(0, 3).map((tm) => renderTemplate`<li class="testimonial" data-astro-cid-dhfotatx> <blockquote data-astro-cid-dhfotatx>“${pickLocale(tm.quote, locale)}”</blockquote> <p class="attribution" data-astro-cid-dhfotatx> <strong data-astro-cid-dhfotatx>${tm.author}</strong> · ${pickLocale(tm.location, locale)} </p> </li>`)} </ul> </section>`}`,
      },
    )} `;
  },
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/index.astro',
  void 0,
);
const $$file =
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/index.astro';
const $$url = '/en/';

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
