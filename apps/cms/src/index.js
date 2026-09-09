'use strict';

/**
 * Strapi bootstrap.
 *
 * On first boot (empty DB) this:
 *  - Creates the admin user from ADMIN_EMAIL / ADMIN_PASSWORD env.
 *  - Seeds the service, location, and article collections from
 *    `data/fixtures/*.js`.
 *  - Grants the public role read access to the seeded content types.
 *
 * Re-running the bootstrap after the DB has content is a no-op.
 */

const { servicesFixture } = require('../data/fixtures/services.js');
const { locationsFixture } = require('../data/fixtures/locations.js');
const { articlesFixture } = require('../data/fixtures/articles.js');
const { testimonialsFixture } = require('../data/fixtures/testimonials.js');

async function ensureAdminUser(strapi) {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const existing = await strapi.db.query('admin::user').findOne({ where: { email } });
  if (existing) {
    strapi.log.info(`Admin user "${email}" already exists.`);
    return;
  }

  const admins = strapi.db.query('admin::user');
  const created = await admins.create({
    data: {
      email,
      firstname: process.env.ADMIN_FIRSTNAME || 'Sejuk',
      lastname: process.env.ADMIN_LASTNAME || 'Cepat',
      password,
      isActive: true,
      roles: [],
    },
  });

  const superAdminRole = await strapi.db
    .query('admin::role')
    .findOne({ where: { code: 'strapi-super-admin' } });
  if (superAdminRole) {
    await admins.update({
      where: { id: created.id },
      data: { roles: [superAdminRole.id] },
    });
  }

  strapi.log.info(`Admin user "${email}" created.`);
}

async function grantPublicReadPermissions(strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) {
    strapi.log.warn('Public role not found, skipping public permission grant.');
    return;
  }

  const actionsToGrant = [
    'api::service.service.find',
    'api::service.service.findOne',
    'api::location.location.find',
    'api::location.location.findOne',
    'api::article.article.find',
    'api::article.article.findOne',
    'api::site-setting.site-setting.find',
    'api::testimonial.testimonial.find',
    'api::testimonial.testimonial.findOne',
  ];

  for (const action of actionsToGrant) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });
    if (existing) continue;
    await strapi.db
      .query('plugin::users-permissions.permission')
      .create({ data: { action, role: publicRole.id } });
    strapi.log.info(`Granted public permission: ${action}`);
  }
}

async function seedSiteSetting(strapi) {
  const existing = await strapi.db.query('api::site-setting.site-setting').count();
  if (existing > 0) return;
  await strapi.db.query('api::site-setting.site-setting').create({
    data: {
      brand: { en: 'Sejuk Cepat', id: 'Sejuk Cepat' },
      tagline: {
        en: 'AC, fridge, and freezer repair in Jabodetabek.',
        id: 'Service AC, kulkas, dan freezer di Jabodetabek.',
      },
      establishedYear: 2019,
      primaryLocale: 'id',
      whatsapp: '+62-812-0000-0000',
      phone: '+62-21-0000-0000',
      email: 'halo@sejukcepat.example.id',
      address: {
        en: 'Workshop · Jakarta Selatan, Indonesia',
        id: 'Bengkel · Jakarta Selatan, Indonesia',
      },
      serviceAreas: ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'],
      businessHours: {
        en: 'Mon–Sat 08:00–20:00 WIB · Sun by appointment',
        id: 'Senin–Sabtu 08:00–20:00 WIB · Minggu by appointment',
      },
      publishedAt: '2026-01-15T08:00:00.000Z',
    },
  });
  strapi.log.info('site-setting: seeded singleton.');
}

async function seedCollection(strapi, uid, rows, label) {
  const existing = await strapi.db.query(uid).count();
  if (existing > 0) {
    strapi.log.info(`${label}: ${existing} record(s) already present, skipping seed.`);
    return;
  }
  for (const row of rows) {
    await strapi.db.query(uid).create({ data: row });
  }
  strapi.log.info(`${label}: seeded ${rows.length} record(s).`);
}

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    try {
      await ensureAdminUser(strapi);
    } catch (err) {
      strapi.log.warn(
        `Admin user bootstrap skipped: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    try {
      await seedCollection(strapi, 'api::service.service', servicesFixture, 'services');
      await seedCollection(strapi, 'api::location.location', locationsFixture, 'locations');
      await seedCollection(strapi, 'api::article.article', articlesFixture, 'articles');
      await seedSiteSetting(strapi);
      await seedCollection(
        strapi,
        'api::testimonial.testimonial',
        testimonialsFixture,
        'testimonials',
      );
    } catch (err) {
      strapi.log.error(
        `Seed bootstrap failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    try {
      await grantPublicReadPermissions(strapi);
    } catch (err) {
      strapi.log.warn(
        `Public permission grant skipped: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  },
};
