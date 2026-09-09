import { describe, expect, it } from 'vitest';
import { localizedHref, stripLocalePrefix } from '../src/lib/i18n.ts';

describe('localizedHref', () => {
  it('keeps Indonesian default routes unprefixed', () => {
    expect(localizedHref('id', '/booking/success/')).toBe('/booking/success/');
  });

  it('prefixes English routes', () => {
    expect(localizedHref('en', '/booking/success/')).toBe('/en/booking/success/');
  });
});

describe('stripLocalePrefix', () => {
  it('removes a locale prefix before switching languages', () => {
    expect(stripLocalePrefix('/en/services/ac-cleaning/')).toBe('/services/ac-cleaning/');
  });
});
