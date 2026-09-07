/**
 * Adapter that prefers a live Strapi instance but falls back to local fixtures
 * when no `STRAPI_URL` is configured. Pages should call only this adapter so
 * the build always succeeds even without a real CMS deployment.
 *
 * The `source` field is surfaced in the UI (`Hero` shows "Source: fixtures"
 * when offline) so the demo classification is always transparent.
 */

import {
  createHttpClient,
  type Article,
  type Location,
  type Service,
  type SiteSettings,
  type StrapiClient,
  type Testimonial,
} from './strapi-client.ts';
import {
  fixtureArticles,
  fixtureLocations,
  fixtureServices,
  fixtureTestimonials,
  siteSettings as fixtureSettings,
} from './fixtures.ts';

export interface ContentAdapter {
  readonly source: 'strapi' | 'fixtures';
  fetchServices(): Promise<Service[]>;
  fetchLocations(): Promise<Location[]>;
  fetchArticles(): Promise<Article[]>;
  fetchTestimonials(): Promise<Testimonial[]>;
  fetchSiteSettings(): Promise<SiteSettings>;
}

interface AdapterOptions {
  strapiUrl?: string | undefined;
  strapiToken?: string | undefined;
}

function fixtureClient(): StrapiClient {
  return {
    baseUrl: 'fixtures://local',
    fetchServices: async () => fixtureServices,
    fetchLocations: async () => fixtureLocations,
    fetchArticles: async () => fixtureArticles,
    fetchTestimonials: async () => fixtureTestimonials,
    fetchSiteSettings: async () => fixtureSettings,
  };
}

export function createContentAdapter(options: AdapterOptions = {}): ContentAdapter {
  const url = options.strapiUrl?.trim();
  if (!url) {
    const client = fixtureClient();
    return {
      source: 'fixtures',
      fetchServices: () => client.fetchServices(),
      fetchLocations: () => client.fetchLocations(),
      fetchArticles: () => client.fetchArticles(),
      fetchTestimonials: () => client.fetchTestimonials(),
      fetchSiteSettings: () => client.fetchSiteSettings(),
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
