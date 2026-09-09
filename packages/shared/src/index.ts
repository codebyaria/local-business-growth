/**
 * Shared content types used by both the Astro web app and the Strapi CMS.
 *
 * Keep this file dependency-free. Both apps consume the same shapes so that
 * swapping fixtures for live Strapi responses requires no type-level changes
 * on the web side.
 */

export type Locale = 'en' | 'id';

export interface LocalizedString {
  en: string;
  id: string;
}

export interface Service {
  id: number;
  slug: string;
  name: LocalizedString;
  summary: LocalizedString;
  description: LocalizedString;
  startingPriceIdr: number;
  durationMinutes: number;
}

export interface Location {
  id: number;
  slug: string;
  name: LocalizedString;
  region: LocalizedString;
  serviceCount: number;
  responseTimeMinutes: number;
}

export interface Article {
  id: number;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  /** ISO date string YYYY-MM-DD. */
  publishedAt: string;
  readMinutes: number;
}

export interface Testimonial {
  id: number;
  quote: LocalizedString;
  author: string;
  location: LocalizedString;
}

export interface SiteSettings {
  brand: LocalizedString;
  tagline: LocalizedString;
  establishedYear: number;
  primaryLocale: Locale;
  contact: {
    whatsapp: string;
    phone: string;
    email: string;
    address: LocalizedString;
  };
  serviceAreas: string[];
  businessHours: LocalizedString;
}

export type UnitType = 'split' | 'window' | 'cassette' | 'standing_floor';
export type BrandKnown =
  'daikin' | 'lg' | 'panasonic' | 'sharp' | 'samsung' | 'gree' | 'aux' | 'daewoo' | 'other';
export type Urgency = 'asap' | 'today' | 'this_week' | 'flexible';

export interface BookingSubmission {
  id?: number;
  submittedAt?: string;
  serviceSlug: string;
  unitType: UnitType;
  brand: BrandKnown;
  brandOther?: string;
  issue: string;
  address: string;
  preferredDate: string;
  urgency: Urgency;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  notes?: string;
  locale: Locale;
}

/** Pick a localized string for the requested locale, falling back to ID. */
export function pickLocale(value: LocalizedString, locale: Locale): string {
  if (locale === 'id') return value.id;
  return value.en ?? value.id;
}
