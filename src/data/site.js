// Spin Cake business details (from the storefront sign, Facebook page and Google Maps).
export const SITE = {
  name: 'Spin Cake',
  localName: { ps: 'سپین کېک', fa: 'سپین کیک' },
  mapsUrl: 'https://maps.app.goo.gl/bjbHALHnTxdYcjPq7',
  coords: { lat: 34.5077183, lng: 69.2311291 },
  phone: '+93 77 166 4004',
  facebook: 'https://www.facebook.com/SpinSahaar2021',
  address: '', // TODO: street / district — falls back to "Kabul, Afghanistan"
  whatsapp: '', // TODO: digits only, e.g. '93771664004' — only if this number is on WhatsApp
  instagram: '', // TODO: full profile URL
  // TODO: opening hours, e.g. [{ en: 'Every day', ps: 'هره ورځ', fa: 'هر روز', time: '8:00 – 22:00' }]
  // The hours block on the page stays hidden until this has entries.
  hours: [],
}
