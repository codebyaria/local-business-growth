import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  StrapiClientError,
  createHttpClient,
  pickLocale,
  type Article,
  type LocalizedString,
  type Location,
  type Service,
} from '../src/lib/strapi-client.ts';

const baseUrl = 'https://strapi.example.com';

const loc = (en: string, id: string): LocalizedString => ({ en, id });

const serviceFixture: Service = {
  id: 1,
  slug: 'ac-cleaning',
  name: loc('AC Cleaning & Tune-up', 'Cuci AC & Tune-up'),
  summary: loc('Deep clean for split units.', 'Cuci menyeluruh unit split.'),
  description: loc('Includes filter wash.', 'Termasuk cuci filter.'),
  startingPriceIdr: 75000,
  durationMinutes: 60,
};

const locationFixture: Location = {
  id: 1,
  slug: 'jakarta-selatan',
  name: loc('South Jakarta', 'Jakarta Selatan'),
  region: loc('Jakarta', 'DKI Jakarta'),
  serviceCount: 6,
  responseTimeMinutes: 90,
};

const articleFixture: Article = {
  id: 1,
  slug: 'berapa-sering-cuci-ac',
  title: loc('How often should you clean your AC in Jakarta?', 'Berapa sering cuci AC di Jakarta?'),
  excerpt: loc('Dust, humidity…', 'Debu, kelembapan…'),
  publishedAt: '2026-07-12',
  readMinutes: 4,
};

const jsonResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('pickLocale', () => {
  it('returns the EN string for locale "en"', () => {
    expect(pickLocale(loc('hello', 'halo'), 'en')).toBe('hello');
  });

  it('returns the ID string for locale "id"', () => {
    expect(pickLocale(loc('hello', 'halo'), 'id')).toBe('halo');
  });
});

describe('createHttpClient', () => {
  it('builds the request to /api/services and unwraps data[]', async () => {
    let captured = '';
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      captured = String(input);
      return jsonResponse({ data: [serviceFixture], meta: {} });
    });
    vi.stubGlobal('fetch', fetchMock);
    const client = createHttpClient(`${baseUrl}/api`);
    const services = await client.fetchServices();
    expect(services).toEqual([serviceFixture]);
    expect(captured).toBe('https://strapi.example.com/api/services?pagination[pageSize]=100');
  });

  it('builds the request to /api/locations and unwraps data[]', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ data: [locationFixture] }));
    vi.stubGlobal('fetch', fetchMock);
    const client = createHttpClient(`${baseUrl}/api`);
    const locations = await client.fetchLocations();
    expect(locations).toEqual([locationFixture]);
  });

  it('builds the request to /api/articles with sort and unwraps data[]', async () => {
    let captured = '';
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      captured = String(input);
      return jsonResponse({ data: [articleFixture] });
    });
    vi.stubGlobal('fetch', fetchMock);
    const client = createHttpClient(`${baseUrl}/api`);
    const articles = await client.fetchArticles();
    expect(articles).toEqual([articleFixture]);
    expect(captured).toContain('sort=publishedAt:desc');
  });

  it('attaches a bearer token when one is provided', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ data: [] }));
    vi.stubGlobal('fetch', fetchMock);
    const client = createHttpClient(`${baseUrl}/api`, { token: 'secret-token' });
    await client.fetchServices();
    const call = fetchMock.mock.calls[0] as unknown as [unknown, RequestInit?] | undefined;
    const headers = new Headers((call?.[1]?.headers ?? {}) as HeadersInit);
    expect(headers.get('authorization')).toBe('Bearer secret-token');
    expect(headers.get('accept')).toBe('application/json');
  });

  it('throws StrapiClientError when the response is not OK', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('oops', { status: 503, statusText: 'Service Unavailable' })),
    );
    const client = createHttpClient(`${baseUrl}/api`);
    await expect(client.fetchServices()).rejects.toBeInstanceOf(StrapiClientError);
  });

  it('throws StrapiClientError when JSON is malformed', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('not json', { status: 200 })),
    );
    const client = createHttpClient(`${baseUrl}/api`);
    await expect(client.fetchServices()).rejects.toBeInstanceOf(StrapiClientError);
  });

  it('aborts the request after the configured timeout', async () => {
    const fetchMock = vi.fn((_input: RequestInfo | URL, init?: RequestInit) => {
      return new Promise<Response>((_, reject) => {
        init?.signal?.addEventListener('abort', () =>
          reject(new DOMException('aborted', 'AbortError')),
        );
      });
    });
    vi.stubGlobal('fetch', fetchMock);
    const client = createHttpClient(`${baseUrl}/api`, { timeoutMs: 25 });
    await expect(client.fetchServices()).rejects.toBeInstanceOf(StrapiClientError);
  });
});

describe('booking validation (separate suite)', () => {
  it('placeholder — booking schema lives in tests/booking.test.ts', () => {
    expect(true).toBe(true);
  });
});
