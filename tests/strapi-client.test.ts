import { describe, it, expect } from 'vitest';
import {
  StrapiClientError,
  type Service,
  type Location,
  type Article,
  fetchServices,
  fetchLocations,
  fetchArticles,
  type StrapiClient,
} from '../src/lib/strapi-client.ts';

const baseUrl = 'https://strapi.example.com';

const serviceFixture: Service = {
  id: 1,
  slug: 'roof-replacement',
  name: 'Roof Replacement',
  summary: 'Full tear-off and replacement with asphalt shingles.',
  description: 'Includes inspection, tear-off, underlayment, flashing, and shingle install.',
};

const locationFixture: Location = {
  id: 1,
  slug: 'central-jakarta',
  name: 'Central Jakarta',
  region: 'DKI Jakarta',
  serviceCount: 4,
};

const articleFixture: Article = {
  id: 1,
  slug: 'how-to-spot-roof-leer',
  title: 'How to spot a roof leak before it becomes damage',
  excerpt: 'Three signs that your roof needs attention before the next rain.',
  publishedAt: '2026-08-15T10:00:00.000Z',
  readMinutes: 4,
};

const jsonResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const emptyResponse = (status: number): Response => new Response('', { status });

const fixtureClient: StrapiClient = {
  baseUrl,
  fetchServices: async () => [serviceFixture],
  fetchLocations: async () => [locationFixture],
  fetchArticles: async () => [articleFixture],
};

describe('fetchServices', () => {
  it('returns services from the injected client', async () => {
    const result = await fetchServices(fixtureClient);
    expect(result).toEqual([serviceFixture]);
  });

  it('throws StrapiClientError when the client fails with a network error', async () => {
    const broken: StrapiClient = {
      ...fixtureClient,
      fetchServices: async () => {
        throw new Error('connect ECONNREFUSED');
      },
    };
    await expect(fetchServices(broken)).rejects.toBeInstanceOf(StrapiClientError);
  });

  it('returns an empty array when the upstream response is empty', async () => {
    const empty: StrapiClient = {
      baseUrl,
      fetchServices: async () => {
        const response = emptyResponse(200);
        return response.text().then(() => []);
      },
      fetchLocations: async () => [],
      fetchArticles: async () => [],
    };
    const result = await fetchServices(empty);
    expect(result).toEqual([]);
  });
});

describe('fetchLocations', () => {
  it('returns locations from the injected client', async () => {
    const result = await fetchLocations(fixtureClient);
    expect(result).toEqual([locationFixture]);
  });
});

describe('fetchArticles', () => {
  it('returns articles from the injected client', async () => {
    const result = await fetchArticles(fixtureClient);
    expect(result).toEqual([articleFixture]);
  });
});

describe('createHttpClient', () => {
  it('returns a client whose baseUrl is normalized without a trailing slash', async () => {
    const { createHttpClient } = await import('../src/lib/strapi-client.ts');
    const client = createHttpClient('https://strapi.example.com/api/');
    expect(client.baseUrl).toBe('https://strapi.example.com/api');
  });

  it('parses a Strapi collection response and unwraps data[]', async () => {
    const { createHttpClient } = await import('../src/lib/strapi-client.ts');
    let captured = '';
    const fetcher: typeof fetch = async (input) => {
      captured = String(input);
      return jsonResponse({ data: [serviceFixture], meta: { pagination: { total: 1 } } });
    };
    const client = createHttpClient('https://strapi.example.com/api', { fetcher });
    const services = await client.fetchServices();
    expect(services).toEqual([serviceFixture]);
    expect(captured).toBe('https://strapi.example.com/api/services');
  });

  it('parses a flat array response without the data wrapper', async () => {
    const { createHttpClient } = await import('../src/lib/strapi-client.ts');
    const fetcher: typeof fetch = async () => jsonResponse([locationFixture]);
    const client = createHttpClient('https://strapi.example.com/api', { fetcher });
    const locations = await client.fetchLocations();
    expect(locations).toEqual([locationFixture]);
  });

  it('throws StrapiClientError when the upstream response is not OK', async () => {
    const { createHttpClient } = await import('../src/lib/strapi-client.ts');
    const fetcher: typeof fetch = async () => emptyResponse(500);
    const client = createHttpClient('https://strapi.example.com/api', { fetcher });
    await expect(client.fetchServices()).rejects.toBeInstanceOf(StrapiClientError);
  });

  it('throws StrapiClientError when the JSON cannot be parsed', async () => {
    const { createHttpClient } = await import('../src/lib/strapi-client.ts');
    const fetcher: typeof fetch = async () => new Response('not json', { status: 200 });
    const client = createHttpClient('https://strapi.example.com/api', { fetcher });
    await expect(client.fetchServices()).rejects.toBeInstanceOf(StrapiClientError);
  });
});

void jsonResponse;
void baseUrl;
