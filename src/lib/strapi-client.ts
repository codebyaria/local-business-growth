/**
 * Typed Strapi REST client.
 *
 * Shape mirrors a Strapi v4 collection response:
 *
 *   { "data": [ { "id": 1, "attributes": { ... } } ] }
 *
 * For this demo the public model is exposed flat to keep the contract narrow.
 * See cms-spec/ for the Strapi schema.
 */

export interface Service {
  id: number;
  slug: string;
  name: string;
  summary: string;
  description: string;
}

export interface Location {
  id: number;
  slug: string;
  name: string;
  region: string;
  serviceCount: number;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readMinutes: number;
}

export interface StrapiClient {
  readonly baseUrl: string;
  fetchServices(): Promise<Service[]>;
  fetchLocations(): Promise<Location[]>;
  fetchArticles(): Promise<Article[]>;
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

interface CollectionResponse {
  data: unknown[];
}

interface SingleResponse {
  data: unknown;
}

export interface HttpClientOptions {
  fetcher?: typeof fetch;
  token?: string;
}

function normalizeBaseUrl(raw: string): string {
  return raw.replace(/\/+$/, '');
}

function isCollectionResponse(value: unknown): value is CollectionResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'data' in value &&
    Array.isArray((value as CollectionResponse).data)
  );
}

function isSingleResponse(value: unknown): value is SingleResponse {
  return typeof value === 'object' && value !== null && 'data' in value;
}

export async function fetchServices(client: StrapiClient): Promise<Service[]> {
  try {
    return await client.fetchServices();
  } catch (error) {
    if (error instanceof StrapiClientError) throw error;
    throw new StrapiClientError('Failed to fetch services', error);
  }
}

export async function fetchLocations(client: StrapiClient): Promise<Location[]> {
  try {
    return await client.fetchLocations();
  } catch (error) {
    if (error instanceof StrapiClientError) throw error;
    throw new StrapiClientError('Failed to fetch locations', error);
  }
}

export async function fetchArticles(client: StrapiClient): Promise<Article[]> {
  try {
    return await client.fetchArticles();
  } catch (error) {
    if (error instanceof StrapiClientError) throw error;
    throw new StrapiClientError('Failed to fetch articles', error);
  }
}

async function parseJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return [];
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new StrapiClientError('Strapi returned non-JSON body', error);
  }
}

async function fetchCollection(
  fetcher: typeof fetch,
  url: string,
  token: string | undefined,
): Promise<unknown[]> {
  const headers: Record<string, string> = { accept: 'application/json' };
  if (token) headers.authorization = `Bearer ${token}`;
  const response = await fetcher(url, { headers });
  if (!response.ok) {
    throw new StrapiClientError(`Strapi ${url} returned ${response.status}`);
  }
  const body = await parseJson(response);
  if (Array.isArray(body)) return body;
  if (isCollectionResponse(body)) return body.data;
  return [];
}

export function createHttpClient(
  rawBaseUrl: string,
  options: HttpClientOptions = {},
): StrapiClient {
  const baseUrl = normalizeBaseUrl(rawBaseUrl);
  const fetcher = options.fetcher ?? fetch;
  const token = options.token;

  return {
    baseUrl,
    async fetchServices() {
      return fetchCollection(fetcher, `${baseUrl}/services`, token) as Promise<Service[]>;
    },
    async fetchLocations() {
      return fetchCollection(fetcher, `${baseUrl}/locations`, token) as Promise<Location[]>;
    },
    async fetchArticles() {
      return fetchCollection(fetcher, `${baseUrl}/articles`, token) as Promise<Article[]>;
    },
  };
}

void isSingleResponse;
