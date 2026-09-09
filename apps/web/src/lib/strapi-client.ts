/**
 * Typed Strapi REST client.
 *
 * Shape mirrors a Strapi v4 collection response:
 *
 *   { "data": [ { "id": 1, "attributes": { ... } } ] }
 *
 * Re-exports the shared content types from `@sejukcepat/shared` and adds the
 * HTTP client implementation that talks to the CMS at `STRAPI_URL`.
 *
 * See `cms-spec/README.md` and `apps/cms/` for the Strapi schema.
 */
import type { Article, Location, Service, SiteSettings, Testimonial } from '@sejukcepat/shared';

export type { Article, Location, Service, SiteSettings, Testimonial };
export type { Locale, LocalizedString } from '@sejukcepat/shared';
export { pickLocale } from '@sejukcepat/shared';

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

interface HttpClientOptions {
  token?: string;
  timeoutMs?: number;
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
      const res = await get<{ data: Record<string, unknown> }>('/api/site-setting');
      const raw = res.data;
      return {
        brand: (raw.brand as SiteSettings['brand']) ?? { en: '', id: '' },
        tagline: (raw.tagline as SiteSettings['tagline']) ?? { en: '', id: '' },
        establishedYear: typeof raw.establishedYear === 'number' ? raw.establishedYear : 2019,
        primaryLocale: raw.primaryLocale === 'en' ? ('en' as const) : ('id' as const),
        contact: {
          whatsapp: typeof raw.whatsapp === 'string' ? raw.whatsapp : '',
          phone: typeof raw.phone === 'string' ? raw.phone : '',
          email: typeof raw.email === 'string' ? raw.email : '',
          address: (raw.address as SiteSettings['contact']['address']) ?? {
            en: '',
            id: '',
          },
        },
        serviceAreas: Array.isArray(raw.serviceAreas) ? (raw.serviceAreas as string[]) : [],
        businessHours: (raw.businessHours as SiteSettings['businessHours']) ?? {
          en: '',
          id: '',
        },
      };
    },
  };
}
