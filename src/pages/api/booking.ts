/**
 * Booking handler — server-only.
 *
 * Receives a POST from /booking/, validates the payload with Zod-equivalent
 * guard clauses, persists to an in-memory fixture (no DB), and returns a JSON
 * response. The client (Astro page) reads the response and redirects to
 * /booking/success/?ref=<id>.
 */
import type { APIRoute } from 'astro';
import type {
  BrandKnown,
  BookingSubmission,
  Locale,
  Urgency,
  UnitType,
} from '../../lib/strapi-client.ts';
import { fixtureBookings, fixtureServices } from '../../lib/fixtures.ts';

export const prerender = false;

const UNIT_TYPES: readonly UnitType[] = ['split', 'window', 'cassette', 'standing_floor'];
const BRANDS: readonly BrandKnown[] = [
  'daikin',
  'lg',
  'panasonic',
  'sharp',
  'samsung',
  'gree',
  'aux',
  'daewoo',
  'other',
];
const URGENCIES: readonly Urgency[] = ['asap', 'today', 'this_week', 'flexible'];
const LOCALES: readonly Locale[] = ['id', 'en'];
const SERVICE_SLUGS = new Set(fixtureServices.map((service) => service.slug));

interface ValidationFailure {
  ok: false;
  field: string;
  message: string;
}

interface ValidationSuccess {
  ok: true;
  value: Omit<BookingSubmission, 'id' | 'submittedAt'>;
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function fail(field: string, message: string): ValidationFailure {
  return { ok: false, field, message };
}

export function parseBookingForm(form: FormData): ValidationSuccess | ValidationFailure {
  const serviceSlug = asString(form.get('serviceSlug'));
  if (!serviceSlug) return fail('serviceSlug', 'serviceSlug required');
  if (!SERVICE_SLUGS.has(serviceSlug)) return fail('serviceSlug', 'Unknown service');

  const unitType = asString(form.get('unitType'));
  if (!(UNIT_TYPES as readonly string[]).includes(unitType)) {
    return fail('unitType', 'unitType must be one of ' + UNIT_TYPES.join(', '));
  }

  const brand = asString(form.get('brand'));
  if (!(BRANDS as readonly string[]).includes(brand)) {
    return fail('brand', 'brand must be one of ' + BRANDS.join(', '));
  }
  const brandOther = asString(form.get('brandOther')) || undefined;

  const issue = asString(form.get('issue'));
  if (issue.length < 5) return fail('issue', 'issue must be at least 5 characters');

  const address = asString(form.get('address'));
  if (address.length < 5) return fail('address', 'address must be at least 5 characters');

  const preferredDate = asString(form.get('preferredDate'));
  if (!ISO_DATE_RE.test(preferredDate))
    return fail('preferredDate', 'preferredDate must be YYYY-MM-DD');

  const urgency = asString(form.get('urgency'));
  if (!(URGENCIES as readonly string[]).includes(urgency)) {
    return fail('urgency', 'urgency must be one of ' + URGENCIES.join(', '));
  }

  const contactName = asString(form.get('contactName'));
  if (contactName.length < 2)
    return fail('contactName', 'contactName must be at least 2 characters');

  const contactPhone = asString(form.get('contactPhone'));
  if (!PHONE_RE.test(contactPhone)) return fail('contactPhone', 'contactPhone looks invalid');

  const contactEmail = asString(form.get('contactEmail')) || undefined;
  if (contactEmail && !EMAIL_RE.test(contactEmail)) {
    return fail('contactEmail', 'contactEmail looks invalid');
  }

  const notes = asString(form.get('notes')) || undefined;
  const localeRaw = asString(form.get('locale'));
  const locale: Locale = (LOCALES as readonly string[]).includes(localeRaw)
    ? (localeRaw as Locale)
    : 'id';

  return {
    ok: true,
    value: {
      serviceSlug,
      unitType: unitType as UnitType,
      brand: brand as BrandKnown,
      brandOther,
      issue,
      address,
      preferredDate,
      urgency: urgency as Urgency,
      contactName,
      contactPhone,
      contactEmail,
      notes,
      locale,
    },
  };
}

export function nextBookingId(): number {
  return fixtureBookings.length + 1;
}

export function persistBooking(
  submission: Omit<BookingSubmission, 'id' | 'submittedAt'>,
): BookingSubmission {
  const record: BookingSubmission = {
    ...submission,
    id: nextBookingId(),
    submittedAt: new Date().toISOString(),
  };
  fixtureBookings.push(record);
  return record;
}

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get('content-type') ?? '';
  if (
    !contentType.includes('application/x-www-form-urlencoded') &&
    !contentType.includes('multipart/form-data')
  ) {
    return new Response(
      JSON.stringify({ ok: false, field: '_', message: 'Content-Type must be form data' }),
      { status: 415, headers: { 'content-type': 'application/json' } },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, field: '_', message: 'Malformed form body', cause: String(err) }),
      { status: 400, headers: { 'content-type': 'application/json' } },
    );
  }

  const parsed = parseBookingForm(form);
  if (!parsed.ok) {
    return new Response(JSON.stringify(parsed), {
      status: 422,
      headers: { 'content-type': 'application/json' },
    });
  }

  const record = persistBooking(parsed.value);
  return new Response(JSON.stringify({ ok: true, id: record.id }), {
    status: 200,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
};
