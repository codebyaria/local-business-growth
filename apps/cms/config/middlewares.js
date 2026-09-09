module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: env('CORS_ORIGINS', 'http://127.0.0.1:4321,http://localhost:4321')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      headers: '*',
      credentials: false,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
