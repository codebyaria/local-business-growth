import type { Service, Location, Article } from '../lib/strapi-client.ts';

export const fixtureServices: Service[] = [
  {
    id: 1,
    slug: 'roof-replacement',
    name: 'Roof Replacement',
    summary: 'Full tear-off and replacement with asphalt shingles.',
    description:
      'Includes inspection, tear-off, underlayment, flashing, and shingle installation. Materials and labour covered by a 10-year workmanship warranty.',
  },
  {
    id: 2,
    slug: 'roof-repair',
    name: 'Roof Repair',
    summary: 'Targeted repair for leaks, missing shingles, and storm damage.',
    description:
      'Same-day inspection across the service area. We document the issue, quote the fix, and complete most repairs within 24 hours of approval.',
  },
  {
    id: 3,
    slug: 'roof-inspection',
    name: 'Roof Inspection',
    summary: 'Pre-purchase and annual inspections with a written report.',
    description:
      'Photos and a written condition report suitable for buyers, sellers, and insurance. Recommended annually before monsoon season.',
  },
  {
    id: 4,
    slug: 'gutter-cleaning',
    name: 'Gutter Cleaning',
    summary: 'Clearing, flushing, and minor gutter repairs.',
    description:
      'Removal of debris, downpipe flushing, and tightening of loose brackets. Bundle with a roof inspection for a discount.',
  },
];

export const fixtureLocations: Location[] = [
  {
    id: 1,
    slug: 'central-jakarta',
    name: 'Central Jakarta',
    region: 'DKI Jakarta',
    serviceCount: 4,
  },
  {
    id: 2,
    slug: 'south-jakarta',
    name: 'South Jakarta',
    region: 'DKI Jakarta',
    serviceCount: 4,
  },
  {
    id: 3,
    slug: 'bandung',
    name: 'Bandung',
    region: 'West Java',
    serviceCount: 3,
  },
  {
    id: 4,
    slug: 'surabaya',
    name: 'Surabaya',
    region: 'East Java',
    serviceCount: 3,
  },
];

export const fixtureArticles: Article[] = [
  {
    id: 1,
    slug: 'how-to-spot-roof-leak',
    title: 'How to spot a roof leak before it becomes damage',
    excerpt: 'Three signs that your roof needs attention before the next rain.',
    publishedAt: '2026-08-15T10:00:00.000Z',
    readMinutes: 4,
  },
  {
    id: 2,
    slug: 'when-to-replace-vs-repair',
    title: 'When to repair your roof, and when to replace it',
    excerpt: 'A simple decision framework a homeowner can apply in under ten minutes.',
    publishedAt: '2026-07-22T10:00:00.000Z',
    readMinutes: 6,
  },
];
