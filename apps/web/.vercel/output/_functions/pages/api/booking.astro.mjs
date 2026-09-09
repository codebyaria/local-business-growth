import { f as fixtureServices, a as fixtureBookings } from '../../chunks/fixtures_D8syZZm_.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const UNIT_TYPES = ['split', 'window', 'cassette', 'standing_floor'];
const BRANDS = ['daikin', 'lg', 'panasonic', 'sharp', 'samsung', 'gree', 'aux', 'daewoo', 'other'];
const URGENCIES = ['asap', 'today', 'this_week', 'flexible'];
const LOCALES = ['id', 'en'];
const SERVICE_SLUGS = new Set(fixtureServices.map((service) => service.slug));
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function asString(v) {
  return typeof v === 'string' ? v.trim() : '';
}
function fail(field, message) {
  return { ok: false, field, message };
}
function parseBookingForm(form) {
  const serviceSlug = asString(form.get('serviceSlug'));
  if (!serviceSlug) return fail('serviceSlug', 'serviceSlug required');
  if (!SERVICE_SLUGS.has(serviceSlug)) return fail('serviceSlug', 'Unknown service');
  const unitType = asString(form.get('unitType'));
  if (!UNIT_TYPES.includes(unitType)) {
    return fail('unitType', 'unitType must be one of ' + UNIT_TYPES.join(', '));
  }
  const brand = asString(form.get('brand'));
  if (!BRANDS.includes(brand)) {
    return fail('brand', 'brand must be one of ' + BRANDS.join(', '));
  }
  const brandOther = asString(form.get('brandOther')) || void 0;
  const issue = asString(form.get('issue'));
  if (issue.length < 5) return fail('issue', 'issue must be at least 5 characters');
  const address = asString(form.get('address'));
  if (address.length < 5) return fail('address', 'address must be at least 5 characters');
  const preferredDate = asString(form.get('preferredDate'));
  if (!ISO_DATE_RE.test(preferredDate))
    return fail('preferredDate', 'preferredDate must be YYYY-MM-DD');
  const urgency = asString(form.get('urgency'));
  if (!URGENCIES.includes(urgency)) {
    return fail('urgency', 'urgency must be one of ' + URGENCIES.join(', '));
  }
  const contactName = asString(form.get('contactName'));
  if (contactName.length < 2)
    return fail('contactName', 'contactName must be at least 2 characters');
  const contactPhone = asString(form.get('contactPhone'));
  if (!PHONE_RE.test(contactPhone)) return fail('contactPhone', 'contactPhone looks invalid');
  const contactEmail = asString(form.get('contactEmail')) || void 0;
  if (contactEmail && !EMAIL_RE.test(contactEmail)) {
    return fail('contactEmail', 'contactEmail looks invalid');
  }
  const notes = asString(form.get('notes')) || void 0;
  const localeRaw = asString(form.get('locale'));
  const locale = LOCALES.includes(localeRaw) ? localeRaw : 'id';
  return {
    ok: true,
    value: {
      serviceSlug,
      unitType,
      brand,
      brandOther,
      issue,
      address,
      preferredDate,
      urgency,
      contactName,
      contactPhone,
      contactEmail,
      notes,
      locale,
    },
  };
}
function nextBookingId() {
  return fixtureBookings.length + 1;
}
function persistBooking(submission) {
  const record = {
    ...submission,
    id: nextBookingId(),
    submittedAt: /* @__PURE__ */ new Date().toISOString(),
  };
  fixtureBookings.push(record);
  return record;
}
const POST = async ({ request }) => {
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
  let form;
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

const _page = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      POST,
      nextBookingId,
      parseBookingForm,
      persistBooking,
      prerender,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);

const page = () => _page;

export { page };
