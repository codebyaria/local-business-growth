/**
 * Locale helpers for the bilingual site.
 *
 * The Astro `i18n` config declares `id` as the default (no prefix) and `en`
 * under `/en/...`. Astro provides `Astro.currentLocale` automatically.
 *
 * `pickLocale(value, locale)` resolves a `LocalizedString` to a plain string.
 */
import type { Locale, LocalizedString } from './strapi-client.ts';
import { pickLocale as pickLocaleRaw } from './strapi-client.ts';

export { pickLocaleRaw as pickLocale };
export type { Locale, LocalizedString };

export const DEFAULT_LOCALE: Locale = 'id';
export const SUPPORTED_LOCALES: readonly Locale[] = ['id', 'en'] as const;

/** Strip a leading `/en` or `/id` prefix from a path. */
export function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|id)(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

/** Build a localized URL. `path` should be a locale-free path like `/services/`. */
export function localizedHref(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return normalized;
  return `/${locale}${normalized}`;
}

/** Get the Locale type from a path. */
export function localeFromPath(pathname: string): Locale {
  const match = pathname.match(/^\/(en|id)(?=\/|$)/);
  return (match?.[1] as Locale) ?? DEFAULT_LOCALE;
}
