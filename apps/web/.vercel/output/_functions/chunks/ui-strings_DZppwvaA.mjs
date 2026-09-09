import {
  e as createComponent,
  m as maybeRenderHead,
  g as addAttribute,
  r as renderTemplate,
  h as createAstro,
  k as renderComponent,
  n as renderHead,
  o as renderSlot,
  p as Fragment,
} from './astro/server_C9p18JK-.mjs';
/* empty css                          */

const DEFAULT_LOCALE = 'id';
function stripLocalePrefix(pathname) {
  const stripped = pathname.replace(/^\/(en|id)(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}
function localizedHref(locale, path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return normalized;
  return `/${locale}${normalized}`;
}
function localeFromPath(pathname) {
  const match = pathname.match(/^\/(en|id)(?=\/|$)/);
  return match?.[1] ?? DEFAULT_LOCALE;
}

const $$Astro$2 = createAstro();
const $$SiteHeader = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
    Astro2.self = $$SiteHeader;
    const { locale } = Astro2.props;
    const t = {
      id: {
        home: 'Beranda',
        services: 'Layanan',
        locations: 'Area',
        blog: 'Tips',
        contact: 'Kontak',
        book: 'Booking',
        switchLanguage: 'Ganti bahasa ke English',
      },
      en: {
        home: 'Home',
        services: 'Services',
        locations: 'Areas',
        blog: 'Tips',
        contact: 'Contact',
        book: 'Book',
        switchLanguage: 'Switch language to Indonesian',
      },
    }[locale];
    const links = [
      { href: localizedHref(locale, '/'), label: t.home },
      { href: localizedHref(locale, '/services/'), label: t.services },
      { href: localizedHref(locale, '/locations/'), label: t.locations },
      { href: localizedHref(locale, '/blog/'), label: t.blog },
      { href: localizedHref(locale, '/contact/'), label: t.contact },
    ];
    const otherLocale = locale === 'id' ? 'en' : 'id';
    const switchLabel = { id: 'ID', en: 'EN' };
    const switchHref = localizedHref(otherLocale, stripLocalePrefix(Astro2.url.pathname));
    const path = Astro2.url.pathname;
    return renderTemplate`${maybeRenderHead()}<header class="site-header" data-astro-cid-ctg3m53h> <div class="container site-header__row" data-astro-cid-ctg3m53h> <a class="site-header__mark"${addAttribute(localizedHref(locale, '/'), 'href')} data-astro-cid-ctg3m53h> <span class="site-header__avatar" aria-hidden="true" data-astro-cid-ctg3m53h>❄</span> <span class="site-header__brand" data-astro-cid-ctg3m53h> <strong data-astro-cid-ctg3m53h>Sejuk Cepat</strong> <small data-astro-cid-ctg3m53h>${locale === 'id' ? 'AC & kulkas se-Jabodetabek' : 'AC & fridge care in Jabodetabek'}</small> </span> </a> <nav aria-label="Primary" data-astro-cid-ctg3m53h> <ul data-astro-cid-ctg3m53h> ${links.map((link) => renderTemplate`<li data-astro-cid-ctg3m53h> <a${addAttribute(link.href, 'href')}${addAttribute(path === link.href ? 'page' : void 0, 'aria-current')}${addAttribute(path === link.href ? 'is-current' : '', 'class')} data-astro-cid-ctg3m53h> ${link.label} </a> </li>`)} <li class="lang-switch" data-astro-cid-ctg3m53h> <a${addAttribute(switchHref, 'href')}${addAttribute(otherLocale, 'hreflang')}${addAttribute(otherLocale, 'lang')} rel="alternate"${addAttribute(t.switchLanguage, 'aria-label')} data-astro-cid-ctg3m53h> ${switchLabel[otherLocale]} </a> </li> <li class="nav-cta" data-astro-cid-ctg3m53h> <a${addAttribute(localizedHref(locale, '/booking/'), 'href')} data-astro-cid-ctg3m53h>${t.book}</a> </li> </ul> </nav> </div> </header> `;
  },
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/components/SiteHeader.astro',
  void 0,
);

const $$Astro$1 = createAstro();
const $$SiteFooter = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
    Astro2.self = $$SiteFooter;
    const { locale } = Astro2.props;
    const year = /* @__PURE__ */ new Date().getFullYear();
    const t = {
      id: {
        classification: 'Jadwalkan teknisi AC dan kulkas untuk area Jabodetabek.',
        credit: 'Aria Nurhadi Zain',
        book: 'Booking teknisi',
        services: 'Lihat layanan',
      },
      en: {
        classification: 'Book AC and fridge technicians for homes and small shops in Jabodetabek.',
        credit: 'Aria Nurhadi Zain',
        book: 'Book a technician',
        services: 'Browse services',
      },
    }[locale];
    return renderTemplate`${maybeRenderHead()}<footer class="site-footer" data-astro-cid-gcn2mc3v> <div class="container footer-card" data-astro-cid-gcn2mc3v> <div data-astro-cid-gcn2mc3v> <p class="label" data-astro-cid-gcn2mc3v>Sejuk Cepat</p> <h2 data-astro-cid-gcn2mc3v>${locale === 'id' ? 'Siap jadwalkan teknisi?' : 'Ready to schedule a technician?'}</h2> <p data-astro-cid-gcn2mc3v>${t.classification}</p> </div> <div class="footer-actions" data-astro-cid-gcn2mc3v> <a class="button button--primary"${addAttribute(localizedHref(locale, '/booking/'), 'href')} data-astro-cid-gcn2mc3v>${t.book}</a> <a class="button"${addAttribute(localizedHref(locale, '/services/'), 'href')} data-astro-cid-gcn2mc3v>${t.services}</a> </div> </div> <div class="container site-footer__row" data-astro-cid-gcn2mc3v> <p data-astro-cid-gcn2mc3v>&copy; <span data-astro-cid-gcn2mc3v>${year}</span> ${t.credit}</p> </div> </footer> `;
  },
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/components/SiteFooter.astro',
  void 0,
);

const $$Astro = createAstro();
const $$BaseLayout = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
    Astro2.self = $$BaseLayout;
    const { title, description, canonical, locale = DEFAULT_LOCALE } = Astro2.props;
    const siteName = 'Sejuk Cepat';
    const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
    const origin = Astro2.site?.toString().replace(/\/$/, '') ?? '';
    const path = Astro2.url.pathname;
    const localeFreePath = stripLocalePrefix(path);
    const enPath = localizedHref('en', localeFreePath);
    const idPath = localizedHref('id', localeFreePath);
    const canonicalHref = canonical ?? (origin ? `${origin}${path}` : void 0);
    return renderTemplate`<html${addAttribute(locale, 'lang')} data-astro-cid-37fxchfa> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, 'content')}><meta name="description"${addAttribute(description, 'content')}><meta name="robots"${addAttribute('noindex,nofollow', 'content')}>${canonicalHref && renderTemplate`<link rel="canonical"${addAttribute(canonicalHref, 'href')}>`}${origin && renderTemplate`${renderComponent($$result, 'Fragment', Fragment, { 'data-astro-cid-37fxchfa': true }, { default: ($$result2) => renderTemplate`<link rel="alternate" hreflang="id"${addAttribute(`${origin}${idPath}`, 'href')}><link rel="alternate" hreflang="en"${addAttribute(`${origin}${enPath}`, 'href')}><link rel="alternate" hreflang="x-default"${addAttribute(`${origin}${idPath}`, 'href')}>` })}`}<meta property="og:title"${addAttribute(fullTitle, 'content')}><meta property="og:description"${addAttribute(description, 'content')}><meta property="og:type" content="website"><meta property="og:locale"${addAttribute(locale === 'id' ? 'id_ID' : 'en_US', 'content')}><title>${fullTitle}</title>${renderHead()}</head> <body data-astro-cid-37fxchfa> <a class="skip-link" href="#main" data-astro-cid-37fxchfa>${locale === 'id' ? 'Lewati ke konten' : 'Skip to content'}</a> ${renderComponent($$result, 'SiteHeader', $$SiteHeader, { locale: locale, 'data-astro-cid-37fxchfa': true })} <main id="main" data-astro-cid-37fxchfa>${renderSlot($$result, $$slots['default'])}</main> ${renderComponent($$result, 'SiteFooter', $$SiteFooter, { locale: locale, 'data-astro-cid-37fxchfa': true })} <a class="mobile-booking"${addAttribute(localizedHref(locale, '/booking/'), 'href')} data-astro-cid-37fxchfa> <span data-astro-cid-37fxchfa>${locale === 'id' ? 'Booking teknisi' : 'Book technician'}</span> <strong data-astro-cid-37fxchfa>${locale === 'id' ? 'Hari ini' : 'Today'}</strong> </a> </body></html>`;
  },
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/layouts/BaseLayout.astro',
  void 0,
);

const ui = {
  id: {
    nav: {
      home: 'Beranda',
      services: 'Layanan',
      locations: 'Area',
      blog: 'Blog',
      book: 'Booking',
      contact: 'Kontak',
    },
    home: {
      eyebrow: 'Teknisi AC panggilan',
      heading: 'Service AC, kulkas, dan freezer di Jabodetabek.',
      lead: 'Jadwalkan teknisi untuk rumah, ruko, atau kantor kecil. Pilih layanan, cek area, lalu tim menghubungi Anda untuk konfirmasi waktu dan estimasi biaya.',
      ctaServices: 'Lihat layanan',
      ctaBook: 'Booking sekarang',
      sectionWhat: 'Apa yang kami kerjakan',
      sectionWhatHeading: 'Layanan pilihan',
      sectionWhere: 'Di mana kami kerja',
      sectionWhereHeading: 'Area layanan',
      sectionTestimonials: 'Cerita pelanggan',
      sectionTestimonialsHeading: 'Cerita pelanggan',
      responseTime: 'Respon rata-rata',
      minutes: 'menit',
      startingFrom: 'Mulai dari',
      perVisit: 'kunjungan',
      currency: 'Rp',
    },
    services: {
      title: 'Layanan',
      pageHeading: 'Layanan AC, kulkas, dan freezer.',
      pageLead:
        'Setiap layanan punya teknisi spesialis dan estimasi durasi. Klik detail untuk lihat apa yang termasuk.',
    },
    service: {
      eyebrow: 'Layanan',
      startingFrom: 'Mulai dari',
      duration: 'Durasi rata-rata',
      minutes: 'menit',
      related: 'Layanan terkait',
      backToServices: '← Kembali ke layanan',
    },
    locations: {
      title: 'Area',
      pageHeading: 'Area layanan kami.',
      pageLead:
        'Permintaan masuk ke teknisi terdekat. Estimasi respon membantu pelanggan memilih area layanan.',
    },
    location: {
      eyebrow: 'Area',
      responseTime: 'Respon rata-rata',
      minutes: 'menit',
      servicesAvailable: 'Layanan tersedia',
      backToLocations: '← Kembali ke area',
    },
    blog: {
      title: 'Blog',
      pageHeading: 'Catatan dari teknisi.',
      pageLead: 'Tips perawatan, penjelasan kerusakan umum, dan kabar tim.',
      minRead: 'menit baca',
    },
    blogPost: {
      eyebrow: 'Artikel',
      backToBlog: '← Kembali ke blog',
    },
    contact: {
      title: 'Kontak',
      pageHeading: 'Hubungi kami.',
      pageLead:
        'Untuk booking cepat, gunakan halaman Booking. Untuk pertanyaan umum, isi formulir di bawah atau langsung WhatsApp.',
      whatsappCta: 'Chat WhatsApp',
      emailLabel: 'Email',
      phoneLabel: 'Telepon',
      addressLabel: 'Alamat',
      hoursLabel: 'Jam operasional',
    },
    booking: {
      title: 'Booking service',
      pageHeading: 'Booking teknisi.',
      pageLead:
        'Isi formulir di bawah, kami balas via WhatsApp dalam 1-2 jam (jam operasional) dengan jadwal teknisi.',
      sectionService: '1. Layanan',
      sectionUnit: '2. Unit & keluhan',
      sectionSchedule: '3. Jadwal',
      sectionContact: '4. Kontak Anda',
      serviceLabel: 'Layanan',
      servicePlaceholder: 'Pilih layanan…',
      unitTypeLabel: 'Jenis unit',
      unitTypeOptions: {
        split: 'AC split',
        window: 'AC window',
        cassette: 'AC cassette',
        standing_floor: 'AC standing/floor',
      },
      brandLabel: 'Merk unit',
      brandOptions: {
        daikin: 'Daikin',
        lg: 'LG',
        panasonic: 'Panasonic',
        sharp: 'Sharp',
        samsung: 'Samsung',
        gree: 'Gree',
        aux: 'Aux',
        daewoo: 'Daewoo',
        other: 'Lainnya',
      },
      brandOtherLabel: 'Merk lainnya (tulis)',
      issueLabel: 'Keluhan / kerusakan',
      issueHelp:
        'Jelaskan singkat: tidak dingin, air menetes, suara berisik, dll. Semakin spesifik semakin cepat kami diagnosis.',
      addressLabel: 'Alamat lengkap',
      preferredDateLabel: 'Tanggal preferred',
      urgencyLabel: 'Tingkat urgensi',
      urgencyOptions: {
        asap: 'Secepatnya (hari ini juga kalau bisa)',
        today: 'Hari ini',
        this_week: 'Pekan ini',
        flexible: 'Fleksibel',
      },
      nameLabel: 'Nama Anda',
      phoneLabel: 'Nomor WhatsApp',
      emailLabel: 'Email (opsional)',
      notesLabel: 'Catatan tambahan (opsional)',
      submit: 'Kirim booking',
      submitting: 'Mengirim…',
      successHeading: 'Booking terkirim.',
      successLead:
        'Tim kami balas via WhatsApp dalam 1-2 jam (jam operasional). Anda bisa langsung chat kami lewat tombol di bawah sambil menunggu.',
      successWhatsappCta: 'Chat WhatsApp sekarang',
      successBackHome: 'Kembali ke beranda',
      successIdLabel: 'Nomor referensi',
      fieldRequired: 'Wajib diisi',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      locations: 'Areas',
      blog: 'Blog',
      book: 'Book',
      contact: 'Contact',
    },
    home: {
      eyebrow: 'Same-day cooling service',
      heading: 'AC, fridge, and freezer repair in Jabodetabek.',
      lead: 'Book a technician for homes, shop houses, or small offices. Choose a service, check the nearest area, then the team confirms timing and estimated cost.',
      ctaServices: 'Browse services',
      ctaBook: 'Book a visit',
      sectionWhat: 'What we do',
      sectionWhatHeading: 'Selected services',
      sectionWhere: 'Where we work',
      sectionWhereHeading: 'Service areas',
      sectionTestimonials: 'Customer stories',
      sectionTestimonialsHeading: 'Customer stories',
      responseTime: 'Average response',
      minutes: 'min',
      startingFrom: 'From',
      perVisit: 'visits',
      currency: 'IDR',
    },
    services: {
      title: 'Services',
      pageHeading: 'AC, fridge, and freezer services.',
      pageLead:
        'Each service has a dedicated specialist technician and an estimated duration. Click through for what is included.',
    },
    service: {
      eyebrow: 'Service',
      startingFrom: 'From',
      duration: 'Average duration',
      minutes: 'min',
      related: 'Related services',
      backToServices: '← Back to services',
    },
    locations: {
      title: 'Areas',
      pageHeading: 'Our service areas.',
      pageLead:
        'Jobs route to the nearest technician. Response-time estimates help customers choose the right service area.',
    },
    location: {
      eyebrow: 'Area',
      responseTime: 'Average response',
      minutes: 'min',
      servicesAvailable: 'Services available',
      backToLocations: '← Back to areas',
    },
    blog: {
      title: 'Blog',
      pageHeading: 'Notes from the workshop.',
      pageLead: 'Maintenance tips, common fault explanations, and team updates.',
      minRead: 'min read',
    },
    blogPost: {
      eyebrow: 'Article',
      backToBlog: '← Back to blog',
    },
    contact: {
      title: 'Contact',
      pageHeading: 'Get in touch.',
      pageLead:
        'For fast booking use the Booking page. For general questions use the form below, or message us on WhatsApp.',
      whatsappCta: 'Chat on WhatsApp',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      addressLabel: 'Address',
      hoursLabel: 'Business hours',
    },
    booking: {
      title: 'Book a service',
      pageHeading: 'Book a technician.',
      pageLead:
        'Fill the form below; we reply via WhatsApp within 1–2 hours (during business hours) with a technician slot.',
      sectionService: '1. Service',
      sectionUnit: '2. Unit & issue',
      sectionSchedule: '3. Schedule',
      sectionContact: '4. Your contact',
      serviceLabel: 'Service',
      servicePlaceholder: 'Pick a service…',
      unitTypeLabel: 'Unit type',
      unitTypeOptions: {
        split: 'Split AC',
        window: 'Window AC',
        cassette: 'Cassette AC',
        standing_floor: 'Standing / floor AC',
      },
      brandLabel: 'Unit brand',
      brandOptions: {
        daikin: 'Daikin',
        lg: 'LG',
        panasonic: 'Panasonic',
        sharp: 'Sharp',
        samsung: 'Samsung',
        gree: 'Gree',
        aux: 'Aux',
        daewoo: 'Daewoo',
        other: 'Other',
      },
      brandOtherLabel: 'Other brand (write in)',
      issueLabel: 'Issue description',
      issueHelp:
        'Be specific: not cooling, water dripping, noise, etc. The more detail the faster we can diagnose.',
      addressLabel: 'Full address',
      preferredDateLabel: 'Preferred date',
      urgencyLabel: 'Urgency',
      urgencyOptions: {
        asap: 'ASAP (today if possible)',
        today: 'Today',
        this_week: 'This week',
        flexible: 'Flexible',
      },
      nameLabel: 'Your name',
      phoneLabel: 'WhatsApp number',
      emailLabel: 'Email (optional)',
      notesLabel: 'Additional notes (optional)',
      submit: 'Submit booking',
      submitting: 'Submitting…',
      successHeading: 'Booking received.',
      successLead:
        'Our team will reply via WhatsApp within 1–2 hours (business hours). You can chat us now using the button below while you wait.',
      successWhatsappCta: 'Chat WhatsApp now',
      successBackHome: 'Back to home',
      successIdLabel: 'Reference number',
      fieldRequired: 'Required',
    },
  },
};
function tFor(locale) {
  return ui[locale];
}

export { $$BaseLayout as $, localizedHref as a, localeFromPath as l, tFor as t };
