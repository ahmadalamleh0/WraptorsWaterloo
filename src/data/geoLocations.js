// ══ GEO SYSTEM — single source of truth ══
//
// Local landing pages for the communities around the studio, each with its own keyword targets, hero copy, local angle,
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

const STUDIO = `${LOCATION.address.street}, ${LOCATION.address.locality}`;


// One line under the homepage "Service Areas" heading: there is a single
// studio, and the area pages are about where its customers come from.
export const SERVICE_AREAS_INTRO = `${LOCATION.brandName} works from one studio, at ${LOCATION.address.display}. Drivers from across Waterloo Region, Guelph, London and the rest of Southwestern Ontario bring their vehicles to us.`;

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

// Area pages: the three cities of Waterloo Region, plus Guelph and London,
// the two larger markets beyond it with their own driving to write about.
// One studio, in Waterloo; every other page describes drivers coming in
// from there. Brantford, Woodstock, Stratford and the smaller towns are
// named in SERVICE_AREAS_WIDER rather than given near-identical pages;
// Brantford and Milton also border the Wraptors Hamilton and GTA studios'
// areas, so this site doesn't target them with pages.
export const LOCATIONS = [
  {
    // The only page that presents itself as the physical location.
    locationName: 'Waterloo',
    slug: 'waterloo',
    isPhysicalStudio: true,
    primaryKeyword: 'car wrapping Waterloo',
    secondaryKeywords: ['car wrap Waterloo', 'PPF Waterloo', 'window tint Waterloo', 'ceramic coating Waterloo'],
    seoTitle: 'Car Wraps, PPF & Window Tint in Waterloo, ON | Wraptors Tri-City',
    metaDescription: `The Wraptors Tri-City studio at ${STUDIO}: car wraps, PPF, window tint and ceramic coating, planned and installed on site.`,
    h1: 'Car Wrapping, PPF & Window Tint in Waterloo',
    eyebrow: 'Wraptors Tri-City · Waterloo',
    heroCopy: [
      `This is where the work happens. The Wraptors Tri-City studio is at ${LOCATION.address.display}.`,
      'Wraps, paint protection film, window tint, ceramic coating, starlight headliners, custom interiors, stripes, decals and wheel and caliper finishes are all planned and installed here, under one roof.',
    ],
    localAngleHeading: 'Built for a Waterloo Region year.',
    localAngle: [
      'Waterloo driving is a mix of short city trips and highway runs. The Conestoga Parkway ties the city to Kitchener, and Highway 401 is a short drive south for anyone commuting toward the GTA or London. Highway speeds put stone chips on the front end; city traffic adds door dings and parking-lot scuffs.',
      'Then there is winter. Months of salt, brine and slush on the lower panels are what most finishes here have to survive, which is why so many builds pair a new look with protection on the panels that take the hits.',
    ],
    trustHeading: 'Looking for a wrap shop in Waterloo?',
    services: [
      { id: 'wraps',   title: 'Car Wraps in Waterloo',       description: 'Full colour changes, partial wraps, racing stripes and decals, designed around the car and installed at the Bridge Street studio.' },
      { id: 'ppf',     title: 'PPF in Waterloo',             description: 'Clear, matte or colour film on the bumper, hood, fenders and mirrors first, then as much of the car as you want covered.' },
      { id: 'tint',    title: 'Window Tint in Waterloo',     description: "Film for privacy, glare and summer heat, chosen with visibility and Ontario's rules for each window in mind." },
      { id: 'ceramic', title: 'Ceramic Coating in Waterloo', description: 'A protective layer for paint, wheels or film that makes salt and road grime easier to rinse off between washes.' },
    ],
    whyWraptorsLocal: {
      title: 'The Bridge Street Studio',
      description: 'Every service is handled at the Waterloo studio, so a wrap, film, tint and coating can be planned together as one build.',
    },
    faqs: [
      { q: 'Where is the Wraptors Tri-City studio?', a: `${LOCATION.address.display}. Use the Get Directions link on the home page for turn-by-turn directions.` },
      { q: 'Do I need to book before visiting?', a: `It's best to. Call ${LOCATION.contact.phoneDisplay} or email ${LOCATION.contact.email} first so the team can set aside time to look at your vehicle and talk through options.` },
      { q: 'Can I protect a new car before its first winter?', a: "That's the ideal time. On a new car the paint hasn't picked up chips or swirls yet, so film or a coating goes over a clean surface. Once winter grit has chipped the bumper, those marks are sealed under the film rather than prevented by it." },
      { q: 'What can be done at the studio besides wraps?', a: 'Paint protection film, window tint, ceramic coating, auto detailing, custom interiors, starlight and galaxy headliners, racing stripes, decals, and caliper and wheel painting.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['kitchener', 'cambridge', 'guelph', 'london'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 1,
  },
  {
    // Twin city to Waterloo; the region's largest city.
    locationName: 'Kitchener',
    slug: 'kitchener',
    primaryKeyword: 'car wrapping Kitchener',
    secondaryKeywords: ['car wrap Kitchener', 'PPF Kitchener', 'window tint Kitchener', 'ceramic coating Kitchener'],
    seoTitle: 'Car Wraps, PPF & Window Tint for Kitchener Drivers | Wraptors',
    metaDescription: 'Kitchener drivers bring their vehicles to the Wraptors Tri-City studio in Waterloo for colour-change wraps, paint protection film, tint and ceramic coating.',
    h1: 'Car Wraps, PPF & Window Tint for Kitchener Drivers',
    eyebrow: 'Wraptors Tri-City · Kitchener',
    heroCopy: [
      `Kitchener and Waterloo run into each other, and for Kitchener drivers the Wraptors Tri-City studio is a short trip across the city line, at ${STUDIO}.`,
      'Colour changes, protection film, tint, coatings and custom interiors are planned and installed at the studio, then the car goes home finished.',
    ],
    localAngleHeading: 'Parkway miles and city parking.',
    localAngle: [
      "Kitchener is the region's largest city, and a lot of its driving happens on the Conestoga Parkway and Highway 8 down to the 401. Steady highway traffic is one of the quickest ways to collect stone chips on a bumper and hood.",
      'Closer to downtown it is the opposite problem: tight parking, street parking and busy lots, where door edges and bumper corners take the knocks. Film on the high-wear spots and a coating that makes winter salt easier to wash off cover most of it.',
    ],
    trustHeading: 'Looking for a car wrap shop near Kitchener?',
    services: [
      { id: 'ppf',     title: 'PPF for Kitchener Commuters',       description: 'Front-end film for Parkway and 401 driving, plus door edges and cups where daily parking leaves its marks.' },
      { id: 'wraps',   title: 'Car Wraps for Kitchener Drivers',   description: 'Colour changes, partial wraps, stripes and decals, from subtle satin finishes to full custom designs.' },
      { id: 'ceramic', title: 'Ceramic Coating for Daily Drivers', description: 'A coating that helps salt, slush and summer bugs rinse off more easily on cars that see every season.' },
      { id: 'tint',    title: 'Window Tint for Kitchener Drivers', description: "Privacy, glare and heat control, matched to the vehicle and to Ontario's rules for each window." },
    ],
    whyWraptorsLocal: {
      title: 'Right Next Door',
      description: 'The studio is in Waterloo, just across the city line from Kitchener, so dropping off a car is an easy trip.',
    },
    faqs: [
      { q: 'Is there a Wraptors studio in Kitchener?', a: `The Tri-City studio is in Waterloo, at ${LOCATION.address.display}. Kitchener customers bring their vehicles there.` },
      { q: 'How do I book from Kitchener?', a: `Call ${LOCATION.contact.phoneDisplay} or email ${LOCATION.contact.email}, or use the quote form on this site, and the team will arrange a time to see the car.` },
      { q: 'Which panels should a commuter protect first?', a: 'The front bumper, hood, fenders and mirrors take most highway chips, so they come first. Door edges, door cups and the area under the rear bumper are worth adding on a car that is parked in busy lots every day.' },
      { q: 'Can a wrap and PPF be done at the same time?', a: 'Yes. They can be planned together so the finish and the protection suit each other, for example a colour-change wrap with clear film over the front end.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['waterloo', 'cambridge', 'guelph'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 2,
  },
  {
    // South of Kitchener on the 401; made up of Galt, Preston and Hespeler.
    locationName: 'Cambridge',
    slug: 'cambridge',
    primaryKeyword: 'car wrapping Cambridge Ontario',
    secondaryKeywords: ['car wrap Cambridge', 'PPF Cambridge', 'window tint Cambridge', 'ceramic coating Cambridge'],
    seoTitle: 'Car Wraps, PPF & Window Tint for Cambridge, ON Drivers | Wraptors',
    metaDescription: 'Cambridge drivers bring their vehicles to the Wraptors Tri-City studio in Waterloo for colour-change wraps, paint protection film, window tint and ceramic coating.',
    h1: 'Car Wraps, PPF & Window Tint for Cambridge Drivers',
    eyebrow: 'Wraptors Tri-City · Cambridge',
    heroCopy: [
      `Cambridge is the third of the Tri-Cities, and drivers from Galt, Preston and Hespeler bring their vehicles to the Wraptors Tri-City studio at ${STUDIO}.`,
      'Wraps, protection film, tint and coatings are planned and installed at the studio, so a full build can be handled in one place.',
    ],
    localAngleHeading: 'Highway 401 country.',
    localAngle: [
      'Highway 401 runs right through Cambridge, so a lot of local driving means highway miles: commuting toward the GTA, Kitchener or London, often behind trucks. That is how front ends collect stone chips, and why front-end film is the most common place to start.',
      "Cambridge's older cores in Galt, Preston and Hespeler mean narrower streets and street parking, and like the rest of the region it gets a long salt season. Protection on the panels that take the hits keeps the finish looking right for longer.",
    ],
    trustHeading: 'Looking for a car wrap shop near Cambridge?',
    services: [
      { id: 'ppf',     title: 'PPF for 401 Drivers',                   description: 'Clear film on the bumper, hood, fenders and mirrors, the panels that take chips at highway speed behind trucks.' },
      { id: 'wraps',   title: 'Car Wraps for Cambridge Drivers',       description: 'Colour changes, partial wraps, stripes and decals, designed around the car and installed at the studio.' },
      { id: 'ceramic', title: 'Ceramic Coating for Cambridge Drivers', description: 'Easier washing through salt season, on paint, wheels or over paint protection film.' },
      { id: 'tint',    title: 'Window Tint for Cambridge Drivers',     description: "Film for privacy, glare and heat, chosen around visibility and Ontario's window rules." },
    ],
    whyWraptorsLocal: {
      title: 'One Studio For The Region',
      description: 'Cambridge drivers use the same Waterloo studio as the rest of Waterloo Region, with the full range of services in one place.',
    },
    faqs: [
      { q: 'Is there a Wraptors studio in Cambridge?', a: `The Tri-City studio is in Waterloo, at ${LOCATION.address.display}. Cambridge customers bring their vehicles there.` },
      { q: 'How do I book from Cambridge?', a: `Call ${LOCATION.contact.phoneDisplay} or email ${LOCATION.contact.email}, or send a quote request through this site, and the team will arrange a time.` },
      { q: 'Is PPF worth it for highway driving?', a: 'For a car that spends a lot of time on the 401, usually yes. Stone chips at highway speed are the most common paint damage, and film takes the impact instead of the paint. Many owners start with the front end and add more later.' },
      { q: 'Does window tint help on long highway drives?', a: 'Tint reduces glare and the heat that builds up through the glass, which makes long drives more comfortable. Which film and shade suit the car is worth talking through at the studio.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['waterloo', 'kitchener', 'london'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 3,
  },
  {
    // East of Waterloo Region on Highway 7; Wellington County around it.
    locationName: 'Guelph',
    slug: 'guelph',
    primaryKeyword: 'car wrapping Guelph',
    secondaryKeywords: ['car wrap Guelph', 'PPF Guelph', 'window tint Guelph', 'ceramic coating Guelph'],
    seoTitle: 'Car Wraps, PPF & Window Tint for Guelph Drivers | Wraptors',
    metaDescription: 'Guelph drivers bring their vehicles to the Wraptors Tri-City studio in Waterloo, about half an hour away, for wraps, PPF, window tint and ceramic coating.',
    h1: 'Car Wraps, PPF & Window Tint for Guelph Drivers',
    eyebrow: 'Wraptors Tri-City · Guelph',
    heroCopy: [
      `Guelph sits just east of Waterloo Region, and for most Guelph drivers the Wraptors Tri-City studio at ${STUDIO} is about half an hour away, by Highway 7 through Kitchener or by Highway 6 and the 401.`,
      'There is no Wraptors studio in Guelph itself. Every wrap, film, tint and coating is planned and installed at the Waterloo studio, so a full build can be organised around one drop-off.',
    ],
    localAngleHeading: 'The Hanlon and the county roads.',
    localAngle: [
      'In the city, a lot of driving runs along the Hanlon Expressway and the roads that feed it, with stop-and-go traffic and plenty of loose grit in winter. Commuters heading toward Waterloo Region or the GTA add highway kilometres on Highway 7, Highway 6 and the 401, and that is where front ends pick up chips.',
      'Out of town in Wellington County the roads change: rural concessions, gravel shoulders and farm traffic throw stones and dust at the lower doors and rocker panels. Film low on the car and a coating that sheds road film make both kinds of driving easier on the finish.',
    ],
    trustHeading: 'Looking for a car wrap shop near Guelph?',
    services: [
      { id: 'ppf',     title: 'PPF for Guelph Commuters',           description: 'Front-end film for Highway 7 and 401 commuting, plus rocker and lower-door coverage for cars that see county roads.' },
      { id: 'wraps',   title: 'Car Wraps for Guelph Drivers',       description: 'Colour changes, partial wraps, stripes and decals, planned around the car and installed at the Waterloo studio.' },
      { id: 'ceramic', title: 'Ceramic Coating for Guelph Drivers', description: 'A coating that helps winter salt and summer dust from gravel roads rinse off paint, wheels or film more easily.' },
      { id: 'tint',    title: 'Window Tint for Guelph Drivers',     description: "Privacy, glare and heat control for commuting and summer drives, chosen within Ontario's rules for each window." },
    ],
    whyWraptorsLocal: {
      title: 'One Drop-Off, Full Build',
      description: 'Wrap, film, tint and coating can be planned together, so a Guelph customer can have the whole build handled at the Waterloo studio.',
    },
    faqs: [
      { q: 'Is there a Wraptors studio in Guelph?', a: `No. The Tri-City studio is in Waterloo, at ${LOCATION.address.display}, and Guelph customers bring their vehicles there. All work is done at the studio; there is no mobile service.` },
      { q: 'Can I plan the build before I drive in?', a: `Yes. Call ${LOCATION.contact.phoneDisplay} or email ${LOCATION.contact.email} with the vehicle and what you have in mind, and the options can be talked through before you make the trip. The final quote is confirmed once the team has seen the car.` },
      { q: 'Is it worth protecting the lower panels on a car driven on county roads?', a: 'If the car regularly sees gravel or rural roads, usually yes. Stones thrown up by the tires hit the lower doors, rocker panels and the area behind the wheels, so film there pairs well with front-end coverage.' },
      { q: 'Can a wrap and PPF be combined?', a: 'Yes. A colour-change wrap with clear film over the front end is a common pairing, and planning both at once means the finish and the protection suit each other.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['waterloo', 'kitchener', 'cambridge'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 4,
  },
  {
    // Southwestern Ontario's largest city, west on the 401.
    locationName: 'London',
    slug: 'london',
    primaryKeyword: 'car wrapping London Ontario',
    secondaryKeywords: ['car wrap London Ontario', 'PPF London Ontario', 'window tint London Ontario', 'ceramic coating London Ontario'],
    seoTitle: 'Car Wraps, PPF & Window Tint for London, ON Drivers | Wraptors',
    metaDescription: 'London, Ontario drivers make the trip up the 401 to the Wraptors Tri-City studio in Waterloo for wraps, paint protection film, window tint and ceramic coating.',
    h1: 'Car Wraps, PPF & Window Tint for London Drivers',
    eyebrow: 'Wraptors Tri-City · London',
    heroCopy: [
      `London is the largest city in Southwestern Ontario, and drivers there make the trip along Highway 401 to the Wraptors Tri-City studio at ${STUDIO}, a little over an hour away.`,
      'Because it is a longer drive, it makes sense to plan the whole build at once: wrap, film, tint and coating can all be handled at the Waterloo studio.',
    ],
    localAngleHeading: 'Where the 401 meets the 402.',
    localAngle: [
      'London sits where Highway 401 meets Highway 402, so a lot of local driving is highway driving: toward Toronto, Windsor or Sarnia, often in heavy truck traffic. That is the quickest way to chip a front bumper, hood and mirrors, and the drive to Waterloo is 401 kilometres too.',
      'In the city, lake-effect snow off Lake Huron makes for a long season of salt and slush, and busy lots and street parking add their own scuffs. Front-end protection and a coating that makes washing easier are the sensible places to start.',
    ],
    trustHeading: 'Looking for a car wrap shop near London?',
    services: [
      { id: 'ppf',     title: 'PPF for 401 and 402 Drivers',        description: 'Clear film on the bumper, hood, fenders and mirrors, the panels that take chips on long highway runs behind trucks.' },
      { id: 'wraps',   title: 'Car Wraps for London Drivers',       description: 'Colour changes, partial wraps, stripes and decals, planned in advance so the build fits around your trip to the studio.' },
      { id: 'ceramic', title: 'Ceramic Coating for London Drivers', description: 'Easier washing through a snowbelt winter, on paint, wheels or over paint protection film.' },
      { id: 'tint',    title: 'Window Tint for Highway Driving',    description: "Less glare and heat on long drives, with the film and shade chosen within Ontario's rules for each window." },
    ],
    whyWraptorsLocal: {
      title: 'Planned Around The Drive',
      description: 'Options and timing can be talked through by phone or email first, so the trip to Waterloo is for the work itself.',
    },
    faqs: [
      { q: 'Is there a Wraptors studio in London?', a: `No. The Tri-City studio is in Waterloo, at ${LOCATION.address.display}, and London customers bring their vehicles there. All work is done at the studio; there is no mobile service.` },
      { q: 'Can I talk through the build before making the drive?', a: `Yes. Call ${LOCATION.contact.phoneDisplay}, email ${LOCATION.contact.email} or send a quote request through this site with the vehicle and what you have in mind. The final quote is confirmed once the team has seen the car.` },
      { q: 'Can several services be done in one visit?', a: 'They can be planned as one build, for example a colour-change wrap with clear film on the front end and window tint. How long the car stays at the studio depends on the work, and is confirmed at consultation.' },
      { q: 'Does film or a coating help with snowbelt winters?', a: 'Neither stops snow and salt from landing on the car. Film takes the hit from grit and stones on the panels it covers, and a ceramic coating makes salt and slush easier to rinse off, so the two are often paired.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['waterloo', 'cambridge', 'kitchener'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 5,
  },
];

// Places customers come from that have no page of their own, shown as one
// line in the Service Areas section. Derived from LOCATION.serviceArea, so a
// place that later gets a page drops out of this line automatically.
const AREA_PAGE_NAMES = new Set(LOCATIONS.map((loc) => loc.locationName));
const WIDER = [...LOCATION.serviceArea.priority, ...LOCATION.serviceArea.surrounding]
  .filter((name) => !AREA_PAGE_NAMES.has(name));
export const SERVICE_AREAS_WIDER = WIDER.length
  ? `We also welcome drivers from ${WIDER.slice(0, -1).join(', ')} and ${WIDER.at(-1)}. Every appointment takes place at our Waterloo studio; we don't offer mobile service.`
  : '';

export function getLocationBySlug(slug) {
  return LOCATIONS.find((loc) => loc.slug === slug);
}

export function getFeaturedLocations() {
  return LOCATIONS
    .filter((loc) => loc.featuredOnHomepage)
    .sort((a, b) => (a.homepageDisplayOrder ?? 999) - (b.homepageDisplayOrder ?? 999));
}
