'use strict';

/**
 * Seed data for the `service` collection.
 */

module.exports.servicesFixture = [
  {
    slug: 'ac-cleaning',
    name: { en: 'AC Cleaning & Tune-up', id: 'Cuci AC & Tune-up' },
    summary: {
      en: 'Deep clean for split, window, and cassette units.',
      id: 'Cuci menyeluruh unit split, window, dan cassette.',
    },
    description: {
      en: 'Includes filter wash, evaporator rinse, condenser brush, drainage check, and pressure test. Recommended every 3 months for inverter units used more than 8 hours per day.',
      id: 'Termasuk cuci filter, bilas evaporator, sikat kondensor, cek drainase, dan tes tekanan. Disarankan tiap 3 bulan untuk unit inverter yang dipakai lebih dari 8 jam per hari.',
    },
    startingPriceIdr: 75000,
    durationMinutes: 60,
    publishedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    slug: 'ac-gas-refill',
    name: { en: 'AC Gas Refill (Freon)', id: 'Isi Ulang Freon AC' },
    summary: {
      en: 'Pressure check, leak test, and refrigerant top-up for R32, R410A, and R22.',
      id: 'Cek tekanan, tes kebocoran, dan isi ulang refrigerant R32, R410A, dan R22.',
    },
    description: {
      en: 'We bring a manifold gauge set, electronic leak detector, and the exact refrigerant your unit needs. If a leak is found we quote the repair before adding gas.',
      id: 'Teknisi membawa manifold gauge, leak detector elektronik, dan refrigerant sesuai unit Anda. Jika ditemukan kebocoran, kami kasih estimasi perbaikan sebelum tambah freon.',
    },
    startingPriceIdr: 250000,
    durationMinutes: 90,
    publishedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    slug: 'ac-installation',
    name: { en: 'AC Installation & Re-location', id: 'Pasang AC & Pindah Unit' },
    summary: {
      en: 'Mounting, vacuum pump, electrical, and piping for split and window units.',
      id: 'Pemasangan, vacuum pump, kelistrikan, dan pipa untuk unit split dan window.',
    },
    description: {
      en: 'Includes bracket installation, copper piping up to 4 metres, vacuum and pressure test, and electrical routing. Extra piping quoted on site.',
      id: 'Termasuk pasang bracket, pipa tembaga hingga 4 meter, vacuum dan tes tekanan, serta routing kelistrikan. Pipa tambahan di-quote di lokasi.',
    },
    startingPriceIdr: 450000,
    durationMinutes: 180,
    publishedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    slug: 'ac-repair',
    name: { en: 'AC Repair & Diagnosis', id: 'Service & Diagnosis AC' },
    summary: {
      en: 'Diagnostics and part replacement for cooling, electrical, and drainage faults.',
      id: 'Diagnosis dan ganti part untuk masalah pendingin, kelistrikan, dan drainase.',
    },
    description: {
      en: 'Visit fee covers diagnosis. Replacement parts and additional labour are quoted after the technician confirms the fault. Common repairs: sensor, PCB, fan motor, compressor relay.',
      id: 'Biaya kunjungan sudah termasuk diagnosis. Part pengganti dan tambahan jasa kerja di-quote setelah teknisi memastikan kerusakan. Perbaikan umum: sensor, PCB, motor fan, relay kompresor.',
    },
    startingPriceIdr: 150000,
    durationMinutes: 90,
    publishedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    slug: 'fridge-freezer-repair',
    name: { en: 'Fridge & Freezer Repair', id: 'Service Kulkas & Freezer' },
    summary: {
      en: 'Cooling issues, thermostat, compressor, and gas top-up for household units.',
      id: 'Masalah pendingin, thermostat, kompresor, dan isi gas untuk unit rumah tangga.',
    },
    description: {
      en: 'Two-door, side-by-side, and chest freezer. Includes gas top-up if the leak test passes; otherwise we quote the repair before adding refrigerant.',
      id: 'Dua pintu, side-by-side, dan chest freezer. Termasuk isi gas jika tes kebocoran lolos; jika tidak, kami kasih estimasi perbaikan sebelum tambah refrigerant.',
    },
    startingPriceIdr: 200000,
    durationMinutes: 120,
    publishedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    slug: 'commercial-maintenance',
    name: { en: 'Commercial Maintenance Plan', id: 'Paket Maintenance Komersial' },
    summary: {
      en: 'Monthly inspection and tune-up for shops, cafes, and small offices.',
      id: 'Inspeksi dan tune-up bulanan untuk toko, kafe, dan kantor kecil.',
    },
    description: {
      en: 'Includes scheduled visits, filter cleaning, performance log, and priority response for breakdowns. Contract billed monthly.',
      id: 'Termasuk kunjungan terjadwal, cuci filter, log performa, dan respon prioritas untuk kerusakan. Kontrak ditagih bulanan.',
    },
    startingPriceIdr: 350000,
    durationMinutes: 90,
    publishedAt: '2026-01-15T08:00:00.000Z',
  },
];
