import { describe, expect, it, beforeEach } from 'vitest';
import { parseBookingForm, nextBookingId, persistBooking } from '../src/pages/api/booking.ts';
import { fixtureBookings } from '../src/lib/fixtures.ts';

beforeEach(() => {
  fixtureBookings.length = 0;
});

function formOf(entries: Array<[string, string]>): FormData {
  const fd = new FormData();
  for (const [k, v] of entries) fd.append(k, v);
  return fd;
}

function override(entries: Array<[string, string]>, patch: Record<string, string>): FormData {
  const seen = new Set<string>();
  const merged: Array<[string, string]> = entries.map(([k, v]) => {
    seen.add(k);
    return [k, patch[k] ?? v];
  });
  for (const [k, v] of Object.entries(patch)) {
    if (!seen.has(k)) merged.push([k, v]);
  }
  return formOf(merged);
}

const valid: Array<[string, string]> = [
  ['serviceSlug', 'ac-cleaning'],
  ['unitType', 'split'],
  ['brand', 'daikin'],
  ['issue', 'AC tidak dingin dan keluar bau.'],
  ['address', 'Jl. Sudirman No. 1, Jakarta Selatan'],
  ['preferredDate', '2026-09-15'],
  ['urgency', 'asap'],
  ['contactName', 'Rini P.'],
  ['contactPhone', '+62-812-1234-5678'],
  ['locale', 'id'],
];

describe('parseBookingForm — valid', () => {
  it('accepts a complete Indonesian submission', () => {
    const result = parseBookingForm(formOf(valid));
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.contactName).toBe('Rini P.');
      expect(result.value.locale).toBe('id');
      expect(result.value.brand).toBe('daikin');
    }
  });

  it('accepts an English submission with an email', () => {
    const fd = formOf([...valid, ['locale', 'en'], ['contactEmail', 'rini@example.com']]);
    const result = parseBookingForm(fd);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.contactEmail).toBe('rini@example.com');
  });

  it('treats unknown locale as "id"', () => {
    const fd = formOf([...valid, ['locale', 'fr']]);
    const result = parseBookingForm(fd);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.locale).toBe('id');
  });
});

describe('parseBookingForm — invalid', () => {
  it('rejects unknown serviceSlug', () => {
    const fd = override(valid, { serviceSlug: '' });
    const result = parseBookingForm(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.field).toBe('serviceSlug');
  });

  it('rejects unknown unitType', () => {
    const fd = override(valid, { unitType: 'central' });
    const result = parseBookingForm(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.field).toBe('unitType');
  });

  it('rejects unknown brand', () => {
    const fd = override(valid, { brand: 'haier' });
    const result = parseBookingForm(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.field).toBe('brand');
  });

  it('rejects too-short issue', () => {
    const fd = override(valid, { issue: 'cold' });
    const result = parseBookingForm(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.field).toBe('issue');
  });

  it('rejects malformed preferredDate', () => {
    const fd = override(valid, { preferredDate: '15-09-2026' });
    const result = parseBookingForm(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.field).toBe('preferredDate');
  });

  it('rejects malformed phone', () => {
    const fd = override(valid, { contactPhone: 'abc' });
    const result = parseBookingForm(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.field).toBe('contactPhone');
  });

  it('rejects malformed email when provided', () => {
    const fd = override(valid, { contactEmail: 'not-an-email' });
    const result = parseBookingForm(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.field).toBe('contactEmail');
  });
});

describe('persistBooking + nextBookingId', () => {
  it('assigns sequential ids and pushes to fixtureBookings', () => {
    const a = parseBookingForm(formOf(valid));
    expect(a.ok).toBe(true);
    if (!a.ok) return;
    const id1 = nextBookingId();
    const r1 = persistBooking(a.value);
    expect(r1.id).toBe(id1);

    const b = parseBookingForm(formOf([...valid, ['contactName', 'Pak Hendra']]));
    expect(b.ok).toBe(true);
    if (!b.ok) return;
    const id2 = nextBookingId();
    const r2 = persistBooking(b.value);
    expect(r2.id).toBe(id2);
    expect(r2.id).toBeGreaterThan(r1.id);
    expect(fixtureBookings.length).toBe(2);
  });
});
