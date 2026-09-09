import {
  s as siteSettings,
  c as fixtureTestimonials,
  b as fixtureArticles,
  d as fixtureLocations,
  f as fixtureServices,
} from './fixtures_D8syZZm_.mjs';

class StrapiClientError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'StrapiClientError';
  }
}
async function getJson(url, path, init, signal) {
  let res;
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
    return await res.json();
  } catch (err) {
    throw new StrapiClientError(`Strapi returned malformed JSON for ${path}`, err);
  }
}
function withTimeout(ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, cancel: () => clearTimeout(timer) };
}
function createHttpClient(baseUrl, options = {}) {
  const authHeaders = options.token ? { authorization: `Bearer ${options.token}` } : {};
  async function get(path) {
    const { signal, cancel } = withTimeout(options.timeoutMs ?? 5e3);
    try {
      return await getJson(baseUrl, path, { headers: authHeaders }, signal);
    } finally {
      cancel();
    }
  }
  return {
    baseUrl,
    async fetchServices() {
      const res = await get('/api/services?pagination[pageSize]=100');
      return res.data;
    },
    async fetchLocations() {
      const res = await get('/api/locations?pagination[pageSize]=100');
      return res.data;
    },
    async fetchArticles() {
      const res = await get('/api/articles?sort=publishedAt:desc&pagination[pageSize]=20');
      return res.data;
    },
    async fetchTestimonials() {
      const res = await get('/api/testimonials?pagination[pageSize]=10');
      return res.data;
    },
    async fetchSiteSettings() {
      const res = await get('/api/site-setting');
      const raw = res.data;
      return {
        brand: raw.brand ?? { en: '', id: '' },
        tagline: raw.tagline ?? { en: '', id: '' },
        establishedYear: typeof raw.establishedYear === 'number' ? raw.establishedYear : 2019,
        primaryLocale: raw.primaryLocale === 'en' ? 'en' : 'id',
        contact: {
          whatsapp: typeof raw.whatsapp === 'string' ? raw.whatsapp : '',
          phone: typeof raw.phone === 'string' ? raw.phone : '',
          email: typeof raw.email === 'string' ? raw.email : '',
          address: raw.address ?? {
            en: '',
            id: '',
          },
        },
        serviceAreas: Array.isArray(raw.serviceAreas) ? raw.serviceAreas : [],
        businessHours: raw.businessHours ?? {
          en: '',
          id: '',
        },
      };
    },
  };
}

function fixtureClient() {
  return {
    baseUrl: 'fixtures://local',
    fetchServices: async () => fixtureServices,
    fetchLocations: async () => fixtureLocations,
    fetchArticles: async () => fixtureArticles,
    fetchTestimonials: async () => fixtureTestimonials,
    fetchSiteSettings: async () => siteSettings,
  };
}
function createContentAdapter(options = {}) {
  const url = options.strapiUrl?.trim();
  if (!url) {
    const client2 = fixtureClient();
    return {
      source: 'fixtures',
      fetchServices: () => client2.fetchServices(),
      fetchLocations: () => client2.fetchLocations(),
      fetchArticles: () => client2.fetchArticles(),
      fetchTestimonials: () => client2.fetchTestimonials(),
      fetchSiteSettings: () => client2.fetchSiteSettings(),
    };
  }
  const client = createHttpClient(url, { token: options.strapiToken });
  return {
    source: 'strapi',
    fetchServices: () => client.fetchServices(),
    fetchLocations: () => client.fetchLocations(),
    fetchArticles: () => client.fetchArticles(),
    fetchTestimonials: () => client.fetchTestimonials(),
    fetchSiteSettings: () => client.fetchSiteSettings(),
  };
}

export { createContentAdapter as c };
