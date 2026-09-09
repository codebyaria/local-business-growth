'use strict';

/**
 * Seed data for the `location` collection.
 */

module.exports.locationsFixture = [
  {
    slug: 'jakarta-selatan',
    name: { en: 'South Jakarta', id: 'Jakarta Selatan' },
    region: { en: 'Jakarta', id: 'DKI Jakarta' },
    serviceCount: 6,
    responseTimeMinutes: 90,
    publishedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    slug: 'jakarta-timur',
    name: { en: 'East Jakarta', id: 'Jakarta Timur' },
    region: { en: 'Jakarta', id: 'DKI Jakarta' },
    serviceCount: 6,
    responseTimeMinutes: 95,
    publishedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    slug: 'jakarta-barat',
    name: { en: 'West Jakarta', id: 'Jakarta Barat' },
    region: { en: 'Jakarta', id: 'DKI Jakarta' },
    serviceCount: 6,
    responseTimeMinutes: 100,
    publishedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    slug: 'tangerang-selatan',
    name: { en: 'South Tangerang', id: 'Tangerang Selatan' },
    region: { en: 'Tangerang', id: 'Banten' },
    serviceCount: 4,
    responseTimeMinutes: 120,
    publishedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    slug: 'bekasi',
    name: { en: 'Bekasi', id: 'Bekasi' },
    region: { en: 'Bekasi', id: 'Jawa Barat' },
    serviceCount: 4,
    responseTimeMinutes: 130,
    publishedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    slug: 'depok',
    name: { en: 'Depok', id: 'Depok' },
    region: { en: 'Depok', id: 'Jawa Barat' },
    serviceCount: 3,
    responseTimeMinutes: 110,
    publishedAt: '2026-01-15T08:00:00.000Z',
  },
];
