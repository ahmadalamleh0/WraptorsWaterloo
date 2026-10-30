// ══ LOCATION CONFIG — single source of truth for this Wraptors site ══
//
// Everything that changes from one Wraptors location to the next lives
// here: branding, contact details, address/map, socials, form labels,
// location media and SEO defaults. Components read from this file instead
// of hard-coding values, so a new rollout means editing this file (plus the
// per-location content in src/data/geoLocations.js and articles.js).
//
// TODO(tricity) marks a value that still needs confirming or replacing.
// Every such field is also listed in UNCONFIRMED below — the build prints
// that list as a warning, so nothing ships unnoticed.
//
// Kept to plain data + asset URLs: vite.config.js imports this file too,
// to write the static SEO tags and structured data into index.html.

export const LOCATION = {
  id: 'tricity',
  brandName: 'Wraptors Tri-City',
  city: 'Waterloo',

  // "Tri-City [flag] Edition" label above the logo (hero intro + navbar).
  edition: {
    label: 'Tri-City',
    flag: new URL('../../CANADA(FLAG).svg', import.meta.url).href,
  },

  // Matches the live Tri-City site, which serves from the www host.
  domain: 'https://www.wraptorstricity.com',

  contact: {
    // Supplied 2026-10-29: +1 647-990-9727. The live site's contact page
    // shows the same number as 647.990.WRAP (9727).
    phone: '+16479909727',
    phoneDisplay: '647.990.WRAP (9727)',
    phoneIntl: '+1 647-990-9727',
    // Digits only, for wa.me links. null = WhatsApp isn't offered: WhatsApp
    // buttons hide and enquiry fallbacks point to the phone instead.
    whatsapp: null,
    email: 'wrap@wraptorstricity.com',
  },

  address: {
    // Confirmed by the client 2026-10-30 (matches the live site's contact
    // page): 745 Bridge St W #8, Waterloo, ON N2V 2G6, Canada.
    display: '745 Bridge St W #8, Waterloo, ON N2V 2G6, Canada',
    mapsQuery: '745 Bridge St W #8, Waterloo, ON N2V 2G6, Canada',
    // Google Maps link from the live site's contact page; it opens the
    // "Wraptors Tricity" listing. TODO(tricity): confirm with the client.
    mapsUrl: 'https://goo.gl/maps/mFJGin4Qw8N3w4m97',
    street: '745 Bridge St W #8',
    locality: 'Waterloo',
    region: 'ON',
    postalCode: 'N2V 2G6',
    country: 'CA',
    // The map embed pins by coordinates. From the Google listing that the
    // live site's Maps link and map embed both use (checked 2026-10-29);
    // OpenStreetMap's match for 745 Bridge St W is about 16 m away.
    // TODO(tricity): confirm the pin marks #8.
    coords: '43.511926,-80.5237892',
  },

  // As linked from the live wraptorstricity.com contact page (2026-10-29).
  // null = the icon is hidden. TikTok and YouTube are the wider brand's
  // accounts; LinkedIn: no Tri-City profile is known.
  socials: {
    instagram: 'https://www.instagram.com/wraptors.tricity/',
    tiktok: 'https://www.tiktok.com/@wraptors',
    facebook: 'https://www.facebook.com/wraptorstoronto/',
    youtube: 'https://www.youtube.com/c/torontowraptors',
    linkedin: null,
  },

  // TODO(tricity): no privacy policy or terms are known. null = the links
  // are hidden in the footer and mobile menu.
  legal: {
    privacy: null,
    terms: null,
  },

  // Online store for the aftercare products on service pages. TODO(tricity):
  // the live site links wraptors-inc.myshopify.com, which returned Shopify's
  // "Store unavailable" when checked for another location (2026-10-19).
  // null = the aftercare section is hidden rather than linking to a dead store.
  shopUrl: null,

  forms: {
    phonePlaceholder: '(519) XXX-XXXX',
  },

  media: {
    // TODO(tricity): stand-in hero. Wraptors car-meet footage (a Toronto
    // meet, not the Tri-City studio), vertical 1080x1920: mobile is the full
    // frame at 720x1280, desktop a centred 16:9 crop. Replace with Tri-City
    // footage when supplied.
    heroVideoMobile: new URL('../../hero-carmeet-mobile.mp4', import.meta.url).href,
    heroVideoDesktop: new URL('../../hero-carmeet-desktop.mp4', import.meta.url).href,
    // Still image the Visit Us map zooms into before the live map loads.
    // mapImagePin is where the pin's tip sits in the image. TODO(tricity):
    // no Waterloo still yet (null = no still; the live map still loads on
    // "Explore Location").
    mapImage: null,
    mapImagePin: '50% 50%',
    mapImageAlt: 'Satellite view of Waterloo with the Wraptors Tri-City studio marked',
    // Location coin emblem on the Vehicle Wraps page. TODO(tricity): no
    // Tri-City emblem yet (null = the standard Wraptors monogram is shown).
    studioEmblem: null,
    studioEmblemAlt: 'Wraptors Tri-City',
    // Social share image, served unhashed from public/ (brand-neutral).
    ogImage: '/og-image.jpg',
  },

  seo: {
    title: 'Wraptors Tri-City | Car Wraps, PPF, Window Tint & Ceramic Coating',
    description: 'Vehicle wraps, paint protection film, window tint, ceramic coating and custom interiors from the Wraptors Tri-City studio in Waterloo, Ontario.',
    businessDescription: 'Vehicle wraps, paint protection film, window tint, ceramic coating and custom automotive styling in Waterloo, Ontario.',
    areaServed: 'Waterloo, Kitchener and Cambridge, Ontario, Canada',
    appName: 'WRAPTORS — Tri-City Wraps, PPF, Tint & Styling',
    appDescription: 'Vehicle wraps, PPF, window tint and automotive styling in Waterloo, Ontario.',
  },
};

// Fields still needing a confirmed Tri-City value — printed as a build warning.
export const UNCONFIRMED = [
  "address.coords + mapsUrl (from the live site's Google listing; confirm the pin marks #8)",
  'media.heroVideo* (stand-in car-meet footage, not Tri-City)',
  'media.mapImage (no Waterloo still yet)',
  'legal.privacy / legal.terms (no policies yet)',
  'shopUrl (store unavailable)',
  'media.studioEmblem (no Tri-City emblem yet)',
];

export const SITE_URL = LOCATION.domain;
export const WHATSAPP_URL = LOCATION.contact.whatsapp ? `https://wa.me/${LOCATION.contact.whatsapp}` : null;
export const PHONE_URL = `tel:${LOCATION.contact.phone}`;
export const EMAIL_URL = `mailto:${LOCATION.contact.email}`;
export const MAPS_SEARCH_URL = LOCATION.address.mapsUrl
  || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOCATION.address.mapsQuery)}`;
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(LOCATION.address.mapsQuery)}`;

// The business entity behind every page — used for the site-wide JSON-LD
// in index.html and as the provider on GEO pages.
export function localBusinessSchema() {
  const { brandName, contact, address, seo } = LOCATION;
  return {
    '@type': 'AutomotiveBusiness',
    name: brandName,
    telephone: contact.phone,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      ...(address.postalCode && { postalCode: address.postalCode }),
      addressCountry: address.country,
    },
    areaServed: seo.areaServed,
    ...(address.mapsUrl && { hasMap: address.mapsUrl }),
  };
}
