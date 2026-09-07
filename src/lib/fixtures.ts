/**
 * Bilingual content fixture data.
 *
 * Stand-in for a Strapi CMS when STRAPI_URL is unset. Mirrors the shape
 * documented in `cms-spec/README.md` so swapping fixtures for a real
 * Strapi response is a localized change.
 *
 * Classification: "Demo Using Simulated Data" per docs/honesty-and-claims.md.
 * Brand and all entries are fictional. No real business is referenced.
 */
import type {
  Article,
  BookingSubmission,
  Location,
  Service,
  Testimonial,
} from '../lib/strapi-client.ts';

const brandName = { en: 'Sejuk Cepat', id: 'Sejuk Cepat' };
const brandTagline = {
  en: 'Same-day AC, fridge, and freezer repair across Jakarta.',
  id: 'Service AC, kulkas, dan freezer same-day se-Jabodetabek.',
};
const brandEstablishedYear = 2019;

export const siteSettings = {
  brand: brandName,
  tagline: brandTagline,
  establishedYear: brandEstablishedYear,
  primaryLocale: 'id' as const,
  contact: {
    whatsapp: '+62-812-0000-0000',
    phone: '+62-21-0000-0000',
    email: 'halo@sejukcepat.example.id',
    address: {
      en: 'Workshop · Jakarta Selatan, Indonesia',
      id: 'Bengkel · Jakarta Selatan, Indonesia',
    },
  },
  serviceAreas: ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'],
  businessHours: {
    en: 'Mon–Sat 08:00–20:00 WIB · Sun by appointment',
    id: 'Senin–Sabtu 08:00–20:00 WIB · Minggu by appointment',
  },
};

export const fixtureServices: Service[] = [
  {
    id: 1,
    slug: 'ac-cleaning',
    name: { en: 'AC Cleaning & Tune-up', id: 'Cuci AC & Tune-up' },
    summary: {
      en: 'Deep clean for split, window, and cassette units. Same-day slots.',
      id: 'Cuci menyeluruh unit split, window, dan cassette. Slot same-day.',
    },
    description: {
      en: 'Includes filter wash, evaporator rinse, condenser brush, drainage check, and pressure test. Recommended every 3 months for inverter units used more than 8 hours per day.',
      id: 'Termasuk cuci filter, bilas evaporator, sikat kondensor, cek drainase, dan tes tekanan. Disanikan tiap 3 bulan untuk unit inverter yang dipakai lebih dari 8 jam per hari.',
    },
    startingPriceIdr: 75000,
    durationMinutes: 60,
  },
  {
    id: 2,
    slug: 'ac-gas-refill',
    name: { en: 'AC Gas Refill (Freon)', id: 'Isi Ulang Freon AC' },
    summary: {
      en: 'Pressure check, leak test, and refrigerant top-up for R32, R410A, and R22.',
      id: 'Cek tekanan, tes kebocoran, dan isi ulang refrigerant R32, R410A, dan R22.',
    },
    description: {
      en: 'We bring a manifold gauge set, electronic leak detector, and the exact refrigerant your unit needs. If a leak is found we quote the repair before adding gas.',
      id: 'Teknisi membawa manifold gauge, leak detector elektronik, dan refrigerant sesuai unit Anda. Jika ditemukan kebocoran, kami kasih estimate perbaikan sebelum tambah freon.',
    },
    startingPriceIdr: 250000,
    durationMinutes: 90,
  },
  {
    id: 3,
    slug: 'ac-installation',
    name: { en: 'AC Installation & Re-location', id: 'Pasang AC & Pindah Unit' },
    summary: {
      en: 'New install or relocate an existing unit. Includes piping, brackets, and vacuum pull.',
      id: 'Pasang baru atau pindah unit lama. Termasuk instaling, bracket, dan vakum pipa.',
    },
    description: {
      en: 'Standard install up to 3 metres of copper piping, 1 hole through wall, condensate routing, and a vacuum test before charging. Extra piping and electrical work quoted separately.',
      id: 'Instalasi standar sampai 3 meter pipa tembaga, 1 lobang tembok, routing pembuangan, dan tes vakum sebelum charging. Pipa tambahan dan pekerjaan listrik di-quote terpisah.',
    },
    startingPriceIdr: 450000,
    durationMinutes: 180,
  },
  {
    id: 4,
    slug: 'ac-repair',
    name: { en: 'AC Repair', id: 'Service Reparasi AC' },
    summary: {
      en: 'Diagnose and fix not-cooling, water dripping, noise, and electrical faults.',
      id: 'Diagnosa dan perbaiki AC tidak dingin, menetes, berisik, dan masalah kelistrikan.',
    },
    description: {
      en: 'Diagnostic fee applies and is waived if you proceed with the repair. Common fixes: PCB replacement, capacitor swap, fan motor, compressor contactor, sensor cleaning.',
      id: 'Ada biaya diagnosa yang dipotong dari total pekerjaan jika Anda lanjut reparasi. Perbaikan umum: ganti PCB, kapasitor, fan motor, kontaktor, dan pembersihan sensor.',
    },
    startingPriceIdr: 150000,
    durationMinutes: 120,
  },
  {
    id: 5,
    slug: 'fridge-freezer-repair',
    name: { en: 'Fridge & Freezer Repair', id: 'Service Kulkas & Freezer' },
    summary: {
      en: 'Single-door, side-by-side, and chest freezer repair for rumah tangga and warung.',
      id: 'Service kulkas 1 pintu, side-by-side, dan freezer box untuk rumah tangga dan warung.',
    },
    description: {
      en: 'Common faults: thermostat, defrost timer, door gasket, compressor relay. We bring OEM-spec replacement parts and a 30-day workmanship warranty.',
      id: 'Kerusakan umum: thermostat, timer defrost, gasket pintu, relay kompresor. Kami bawa suku cadang sesuai spek OEM dan garansi kerja 30 hari.',
    },
    startingPriceIdr: 200000,
    durationMinutes: 90,
  },
  {
    id: 6,
    slug: 'commercial-maintenance',
    name: { en: 'Commercial Maintenance Plan', id: 'Paket Maintenance Komersial' },
    summary: {
      en: 'Scheduled cleaning and inspection for restaurants, offices, and retail.',
      id: 'Jadwal cuci dan inspeksi berkala untuk restoran, kantor, dan retail.',
    },
    description: {
      en: 'Monthly or quarterly visits depending on usage. Includes priority same-day response, written condition reports, and a dedicated WhatsApp group for your outlet manager.',
      id: 'Kunjungan bulanan atau quartal tergantung pemakaian. Termasuk respons same-day prioritas, laporan kondisi tertulis, dan grup WhatsApp khusus untuk manajer outlet Anda.',
    },
    startingPriceIdr: 500000,
    durationMinutes: 60,
  },
];

export const fixtureLocations: Location[] = [
  {
    id: 1,
    slug: 'jakarta-selatan',
    name: { en: 'South Jakarta', id: 'Jakarta Selatan' },
    region: {
      en: 'Jakarta',
      id: 'DKI Jakarta',
    },
    serviceCount: 6,
    responseTimeMinutes: 90,
  },
  {
    id: 2,
    slug: 'jakarta-timur',
    name: { en: 'East Jakarta', id: 'Jakarta Timur' },
    region: {
      en: 'Jakarta',
      id: 'DKI Jakarta',
    },
    serviceCount: 6,
    responseTimeMinutes: 120,
  },
  {
    id: 3,
    slug: 'jakarta-barat',
    name: { en: 'West Jakarta', id: 'Jakarta Barat' },
    region: {
      en: 'Jakarta',
      id: 'DKI Jakarta',
    },
    serviceCount: 6,
    responseTimeMinutes: 120,
  },
  {
    id: 4,
    slug: 'tangerang-selatan',
    name: { en: 'South Tangerang', id: 'Tangerang Selatan' },
    region: {
      en: 'Banten',
      id: 'Banten',
    },
    serviceCount: 4,
    responseTimeMinutes: 180,
  },
  {
    id: 5,
    slug: 'bekasi',
    name: { en: 'Bekasi', id: 'Bekasi' },
    region: {
      en: 'West Java',
      id: 'Jawa Barat',
    },
    serviceCount: 4,
    responseTimeMinutes: 180,
  },
  {
    id: 6,
    slug: 'depok',
    name: { en: 'Depok', id: 'Depok' },
    region: {
      en: 'West Java',
      id: 'Jawa Barat',
    },
    serviceCount: 4,
    responseTimeMinutes: 150,
  },
];

export const fixtureArticles: Article[] = [
  {
    id: 1,
    slug: 'berapa-sering-cuci-ac',
    title: {
      en: 'How often should you clean your AC in Jakarta?',
      id: 'Berapa sering cuci AC di Jakarta?',
    },
    excerpt: {
      en: 'Dust, humidity, and 8-hour daily use mean most Jakarta homes need a deep clean every 3 months.',
      id: 'Debu, kelembapan, dan pemakaian 8 jam sehari bikin kebanyakan rumah di Jakarta perlu cuci menyeluruh tiap 3 bulan.',
    },
    publishedAt: '2026-07-12',
    readMinutes: 4,
  },
  {
    id: 2,
    slug: 'tanda-ac-kurang-freon',
    title: {
      en: '5 signs your AC is low on refrigerant',
      id: '5 tanda AC Anda kekurangan freon',
    },
    excerpt: {
      en: 'Ice on the copper line, weak airflow, water dripping indoors — what to check before calling a technician.',
      id: 'Es di pipa tembaga, angin lemah, air menetes ke dalam — apa yang dicek sebelum panggil teknisi.',
    },
    publishedAt: '2026-06-30',
    readMinutes: 3,
  },
  {
    id: 3,
    slug: 'r32-vs-r410a',
    title: {
      en: 'R32 vs R410A: which refrigerant do newer Jakarta installs use?',
      id: 'R32 vs R410A: refrigerant mana yang dipakai unit baru di Jakarta?',
    },
    excerpt: {
      en: 'New inverter units sold in Indonesia after 2024 ship with R32. What it means for your next service visit.',
      id: 'Unit inverter baru yang dijual di Indonesia setelah 2024 pakai R32. Artinya untuk kunjungan service berikutnya.',
    },
    publishedAt: '2026-05-18',
    readMinutes: 5,
  },
  {
    id: 4,
    slug: 'kapan-ganti-kulkas-vs-service',
    title: {
      en: 'When to repair vs replace your fridge',
      id: 'Kapan service vs ganti kulkas',
    },
    excerpt: {
      en: 'A simple rule of thumb: under 7 years old, repair; over 10 years old, replace. The 7–10 grey zone depends on the fault.',
      id: 'Patokan sederhana: di bawah 7 tahun, service; di atas 10 tahun, ganti. Area abu-abu 7–10 tergantung kerusakannya.',
    },
    publishedAt: '2026-04-22',
    readMinutes: 4,
  },
];

export const fixtureTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: {
      en: 'Same-day visit, technician brought the right R32, and AC is cold again by lunch. Receipt with pressure readings.',
      id: 'Dateng same-day, teknisi bawa R32 yang tepat, AC dingin lagi sebelum siang. Ada nota dengan angka tekanan.',
    },
    author: 'Rini P.',
    location: {
      en: 'South Jakarta',
      id: 'Jakarta Selatan',
    },
  },
  {
    id: 2,
    quote: {
      en: 'Restoran kami pakai paket bulanan. Grup WA-nya responsif, teknisi datang sebelum resto buka.',
      id: 'Restoran kami pakai paket bulanan. Grup WA-nya aktif, teknisi dateng sebelum resto buka.',
    },
    author: 'Pak Hendra',
    location: {
      en: 'Tangerang',
      id: 'Tangerang',
    },
  },
];

export const fixtureBookings: BookingSubmission[] = [];
