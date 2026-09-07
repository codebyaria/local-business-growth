/**
 * Typed Strapi REST client.
 *
 * Shape mirrors a Strapi v4 collection response:
 *
 *   { "data": [ { "id": 1, "attributes": { ... } } ] }
 *
 * For this demo the public model is exposed flat to keep the contract narrow.
 * See cms-spec/ for the Strapi schema.
 *
 * All string fields are bilingual via `LocalizedString` so the frontend can
 * render EN/ID without round-tripping per-page. `BookingSubmission` is the
 * shape accepted by the `/booking` POST handler.
 */

export type Locale = 'en' | 'id';

/** A field that carries one string per supported locale. */
export interface LocalizedString {
  en: string;
  id: string;
}

/** Helper for the rare field that intentionally has only one locale (brand). */
export interface LocalizedBrand {
  en: string;
  id: string;
}

export interface Service {
  id: number;
  slug: string;
  name: LocalizedString;
  summary: LocalizedString;
  description: LocalizedString;
  /** Indicative starting price in Indonesian Rupiah. */
  startingPriceIdr: number;
  /** Average job duration in minutes. */
  durationMinutes: number;
}

export interface Location {
  id: number;
  slug: string;
  name: LocalizedString;
  region: LocalizedString;
  serviceCount: number;
  /** Average technician response time in minutes. */
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

export type UnitType = 'split' | 'window' | 'cassette' | 'standing_floor';
export type BrandKnown =
  'daikin' | 'lg' | 'panasonic' | 'sharp' | 'samsung' | 'gree' | 'aux' | 'daewoo' | 'other';
export type Urgency = 'asap' | 'today' | 'this_week' | 'flexible';

export interface BookingSubmission {
  id: number;
  submittedAt: string;
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
  /** Locale the customer used when submitting. */
  locale: Locale;
}

export interface SiteSettings {
  brand: LocalizedBrand;
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

export interface StrapiClient {
  readonly baseUrl: string;
  fetchServices(): Promise<Service[]>;
  fetchLocations(): Promise<Location[]>;
  fetchArticles(): Promise<Article[]>;
  fetchSiteSettings(): Promise<SiteSettings>;
  fetchTestimonials(): Promise<Testimonial[]>;
}

export class StrapiClientError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'StrapiClientError';
  }
}

/** Resolve a LocalizedString for the requested locale with EN fallback. */
export function pickLocale(value: LocalizedString, locale: Locale): string {
  if (locale === 'id') return value.id;
  return value.en ?? value.id;
}

/* ------------------------------------------------------------------ *
 * HTTP client implementation
 * ------------------------------------------------------------------ */

interface HttpClientOptions {
  token?: string;
  /** Request timeout in milliseconds. */
  timeoutMs?: number;
}

async function getJson<T>(
  url: string,
  path: string,
  init: RequestInit,
  signal: AbortSignal,
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(new URL(path, url).toString(), {
      ...init,
      signal,
      headers: {
        accept: 'application/json',
        ...(init.headers ?? {}),
      },
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new StrapiClientError(`Strapi request to ${path} aborted (timeout)`, err);
    }
    throw new StrapiClientError(`Strapi request to ${path} failed`, err);
  }
  if (!res.ok) {
    throw new StrapiClientError(`Strapi responded ${res.status} ${res.statusText} for ${path}`);
  }
  try {
    return (await res.json()) as T;
  } catch (err) {
    throw new StrapiClientError(`Strapi returned malformed JSON for ${path}`, err);
  }
}

function withTimeout(ms: number): { signal: AbortSignal; cancel: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, cancel: () => clearTimeout(timer) };
}

export function createHttpClient(baseUrl: string, options: HttpClientOptions = {}): StrapiClient {
  const authHeaders: Record<string, string> = options.token
    ? { authorization: `Bearer ${options.token}` }
    : {};

  async function get<T>(path: string): Promise<T> {
    const { signal, cancel } = withTimeout(options.timeoutMs ?? 5000);
    try {
      return await getJson<T>(baseUrl, path, { headers: authHeaders }, signal);
    } finally {
      cancel();
    }
  }

  return {
    baseUrl,
    async fetchServices() {
      const res = await get<{ data: Service[] }>('/api/services?pagination[pageSize]=100');
      return res.data;
    },
    async fetchLocations() {
      const res = await get<{ data: Location[] }>('/api/locations?pagination[pageSize]=100');
      return res.data;
    },
    async fetchArticles() {
      const res = await get<{ data: Article[] }>(
        '/api/articles?sort=publishedAt:desc&pagination[pageSize]=20',
      );
      return res.data;
    },
    async fetchTestimonials() {
      const res = await get<{ data: Testimonial[] }>('/api/testimonials?pagination[pageSize]=10');
      return res.data;
    },
    async fetchSiteSettings() {
      const res = await get<{ data: SiteSettings }>('/api/site-setting');
      return res.data;
    },
  };
}
