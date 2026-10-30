// ══ GEO SYSTEM — single source of truth ══
//
// Local landing pages for the communities around the studio
//, each with its own keyword targets, hero copy, local angle,
// differentiated service descriptions, FAQs and cross-links — not the same
// paragraph with the area name swapped. GeoPage.jsx renders entirely from
// this data; add/edit/remove a location here only. (Still a static site
// with no CMS/backend — an edit here needs a rebuild + deploy to go live.)
//
// These are proposed service areas around one studio. Copy
// describes drivers from each community bringing their vehicle to that
// studio — it must not claim a second location, mobile service, pickup or
// guaranteed coverage unless that's been confirmed.
//
// Shared vs. per-location content, on purpose:
//   - TRUST_COPY and WHY_WRAPTORS_SHARED (3 of the 4 "why us" cards) are
//     brand philosophy, not local SEO content — it's fine for these to
//     repeat, the same way an "About us" footer repeats site-wide. Only
//     each location's trustHeading changes.
//   - Three of the seven FAQs per page (COMMON_FAQS) are genuinely
//     area-independent facts (pricing factors, wrap-vs-PPF, timeline) —
//     repeating a factual answer isn't thin content. The other four are
//     location-specific per page.
//   - Everything else (heroCopy, localAngle, service titles/descriptions,
//     4 area-specific FAQs, relatedAreas) is written per location around
//     that area's actual roads and driving conditions.
//
// Field reference — see the source project's geoLocations.js for an entry's shape.

import { LOCATION } from '../config/location.js';

export { SITE_URL } from '../lib/siteConfig.js';


export const SERVICE_CATALOG = {
  wraps:     { label: 'Vehicle Wraps',        path: '/services/wraps/' },
  ppf:       { label: 'Paint Protection Film', path: '/services/ppf/' },
  ceramic:   { label: 'Ceramic Coating',       path: '/services/ceramic/' },
  tint:      { label: 'Window Tint',           path: '/services/tint/' },
  starlight: { label: 'Starlight Headliner',   path: '/services/starlight/' },
  detailing: { label: 'Auto Detailing',        path: '/services/detailing/' },
  'custom-interiors': { label: 'Custom Interiors', path: '/services/custom-interiors/' },
  'stripes-decals':   { label: 'Racing Stripes & Decals', path: '/services/stripes-decals/' },
  'caliper-painting': { label: 'Caliper Painting', path: '/services/caliper-painting/' },
  'wheel-painting':   { label: 'Wheel Painting',   path: '/services/wheel-painting/' },
  commercial:{ label: 'Commercial Wrap',       path: '/services/wraps/' },
};

// Category label shown above each service card — constant across every
// page, same as the reference spec ("CAR WRAPPING", "PAINT PROTECTION
// FILM", etc.). Per-location differentiation lives in title/description.
export const SERVICE_CATEGORY_LABEL = {
  wraps:   'Car Wrapping',
  ppf:     'Paint Protection Film',
  ceramic: 'Ceramic Coating',
  tint:    'Window Tint',
};

// Brand-philosophy copy, not local content — reused across every page.
export const TRUST_COPY = [
  "If you're comparing wrap shops, look beyond colour samples. A premium wrap should follow the vehicle's body lines properly, maintain clean edges, protect the original finish underneath and look intentional from every angle.",
  "Wraptors approaches the vehicle as a complete build, whether you're choosing a subtle satin colour change, a full custom transformation or protection for a car you want to keep factory-clean.",
];

// First 3 "why choose Wraptors" cards — identical everywhere. The 4th card
// is per-location (see whyWraptorsLocal on each entry below).
export const WHY_WRAPTORS_SHARED = [
  {
    title: 'Global Wraptors Standard',
    description: `The same Wraptors identity and approach, carried into the ${LOCATION.brandName} studio.`,
  },
  {
    title: 'Full Vehicle Transformations',
    description: 'Wrap, PPF, coating and tint can be planned as one complete build rather than separate jobs.',
  },
  {
    title: 'Built Around The Car',
    description: 'Colour, finish, protection and details are selected around the actual vehicle rather than forcing every customer into the same package.',
  },
];

// 3 of the 7 FAQs per page — genuinely area-independent facts, so reusing
// the same answer everywhere isn't thin content.
export const COMMON_FAQS = [
  {
    q: 'How much does a full car wrap cost?',
    a: "Cost depends on the vehicle's size, the finish (gloss, satin, matte, colour-shift or a custom design) and how much surface is covered. We quote after a short consultation rather than giving a blanket number, since two identical-looking wraps can differ a lot in film and labour depending on the car.",
  },
  {
    q: "What's the difference between vinyl wrap and colour PPF?",
    a: 'Vinyl wrap is a coloured or patterned film designed primarily for finish changes, with paint protection as a side benefit. Colour PPF is a thicker, self-healing protective film in a colour tint — built primarily to protect, with the colour effect as the secondary benefit. Which one is right depends on whether your priority is the look or the protection.',
  },
  {
    q: 'How long does a wrap or PPF installation take?',
    a: "It depends on the vehicle, the film and how much of the car is being covered — a partial PPF front end and a full colour-change wrap are very different jobs. We confirm an exact schedule at consultation, once we've seen the car.",
  },
];

// Area pages (/areas/<slug>/) and the homepage Service Areas row. Empty
// until Tri-City's own areas are written; no area pages were carried over
// from the source project. Each entry needs real local copy, not a city
// name swapped into another location's text. With no entries, no /areas/
// pages are built and the Service Areas row is hidden.
export const LOCATIONS = [];

export function getLocationBySlug(slug) {
  return LOCATIONS.find((loc) => loc.slug === slug);
}

export function getFeaturedLocations() {
  return LOCATIONS
    .filter((loc) => loc.featuredOnHomepage)
    .sort((a, b) => (a.homepageDisplayOrder ?? 999) - (b.homepageDisplayOrder ?? 999));
}
