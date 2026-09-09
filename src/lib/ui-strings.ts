/**
 * UI string dictionary keyed by locale.
 *
 * Every user-facing string lives here so translators (or the same author
 * later) can audit copy without grepping through Astro templates.
 */
import type { Locale } from './strapi-client.ts';

export const ui = {
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
      heading: 'Service AC, kulkas, dan freezer same-day se-Jabodetabek.',
      lead: 'Booking teknisi AC, kulkas, dan freezer untuk rumah, ruko, dan kantor kecil. Pilih layanan, cek area, lalu tim menghubungi Anda untuk konfirmasi jadwal.',
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
      heading: 'Same-day AC, fridge, and freezer repair across Jakarta.',
      lead: 'Book AC, fridge, and freezer technicians for homes, shop houses, and small offices. Choose a service, check your area, then the team confirms the schedule.',
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
} as const;

export type UiDictionary = typeof ui.id;

export function tFor(locale: Locale): UiDictionary {
  return ui[locale] as unknown as UiDictionary;
}
