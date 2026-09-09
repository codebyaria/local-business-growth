'use strict';

/**
 * Seed data for the `article` collection.
 */

module.exports.articlesFixture = [
  {
    slug: 'berapa-sering-cuci-ac',
    title: {
      en: 'How often should you clean your AC?',
      id: 'Berapa sering cuci AC?',
    },
    excerpt: {
      en: 'Dust, humidity, and 8-hour daily use mean most Jakarta homes need a deep clean every 3 months.',
      id: 'Debu, kelembapan, dan pemakaian 8 jam sehari bikin kebanyakan rumah di Jakarta perlu cuci menyeluruh tiap 3 bulan.',
    },
    body: {
      en: 'A regular AC clean is not just about cool air. Filter dust cuts airflow and forces the compressor to work harder, which raises your electricity bill and shortens unit life. In our experience Jakarta homes benefit from a deep clean every 3 months and a filter rinse every 2 weeks.',
      id: 'Cuci AC rutin bukan cuma soal udara dingin. Debu di filter menghambat aliran udara dan memaksa kompresor kerja lebih keras, yang bikin tagihan listrik naik dan umur unit lebih pendek. Pengalaman kami, rumah di Jakarta idealnya cuci menyeluruh tiap 3 bulan dan bilas filter tiap 2 minggu.',
    },
    publishedAt: '2026-02-05T08:00:00.000Z',
    readMinutes: 4,
    category: 'ac-care',
  },
  {
    slug: 'tanda-ac-kurang-freon',
    title: {
      en: '5 signs your AC is low on refrigerant',
      id: '5 tanda AC Anda kurang freon',
    },
    excerpt: {
      en: 'Long cooling times, ice on the pipe, and weak airflow can all point to low refrigerant — but only a leak test confirms it.',
      id: 'Waktu pendinginan lama, es di pipa, dan hembusan angin lemah bisa menandakan kurang freon — tapi hanya tes kebocoran yang memastikan.',
    },
    body: {
      en: 'Never top up refrigerant without a leak test. Adding gas to a leaking unit is a recurring cost; fixing the leak saves money and protects the compressor.',
      id: 'Jangan isi ulang refrigerant tanpa tes kebocoran. Tambah gas ke unit yang bocor bikin biaya berulang; perbaiki kebocoran lebih hemat dan melindungi kompresor.',
    },
    publishedAt: '2026-02-12T08:00:00.000Z',
    readMinutes: 3,
    category: 'refrigerator',
  },
  {
    slug: 'kapan-ganti-kulkas-vs-service',
    title: {
      en: 'Repair or replace? When a fridge is worth fixing',
      id: 'Service atau ganti? Kapan kulkas masih layak diperbaiki',
    },
    excerpt: {
      en: 'A compressor replacement can cost more than a new unit. Here is the rough line we use with customers.',
      id: 'Ganti kompresor kadang lebih mahal dari unit baru. Ini patokan kasar yang kami pakai saat diskusi dengan pelanggan.',
    },
    body: {
      en: 'If the unit is over 10 years old and the compressor is failing, replacement usually wins. For younger units, repairs under 40% of the replacement cost are worth it.',
      id: 'Kalau unit sudah di atas 10 tahun dan kompresornya rusak, biasanya ganti unit lebih hemat. Untuk unit yang lebih muda, biaya perbaikan di bawah 40% harga baru masih layak dilakukan.',
    },
    publishedAt: '2026-02-19T08:00:00.000Z',
    readMinutes: 5,
    category: 'refrigerator',
  },
  {
    slug: 'r32-vs-r410a',
    title: {
      en: 'R32 vs R410A: which refrigerant is in newer units?',
      id: 'R32 vs R410A: refrigerant mana yang dipakai unit baru?',
    },
    excerpt: {
      en: 'Most new residential splits ship with R32. Here is what that means for top-ups and the environment.',
      id: 'Sebagian besar unit split baru pakai R32. Ini artinya untuk isi ulang dan dampaknya terhadap lingkungan.',
    },
    body: {
      en: 'R32 has a lower global warming potential than R410A and slightly better cooling efficiency. Most Indonesian distributors sell both, but installers should not mix the two refrigerants.',
      id: 'R32 punya potensi pemanasan global lebih rendah dari R410A dan efisiensi pendinginan sedikit lebih baik. Sebagian besar distributor di Indonesia menjual keduanya, tapi teknisi tidak boleh mencampur dua refrigerant ini.',
    },
    publishedAt: '2026-02-26T08:00:00.000Z',
    readMinutes: 4,
    category: 'ac-care',
  },
];
