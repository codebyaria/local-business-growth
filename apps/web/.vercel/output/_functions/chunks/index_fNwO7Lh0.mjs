function pickLocale(value, locale) {
  if (locale === 'id') return value.id;
  return value.en ?? value.id;
}

export { pickLocale as p };
