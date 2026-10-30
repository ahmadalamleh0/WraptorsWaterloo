// Quote console — editable step data. Add, remove or relabel a service or
// build option here without touching QuoteSection.jsx. Extension points
// for later (file upload, budget range, reference images, CRM payload
// shape) live in QuoteSection.jsx's submit handler and step 3 markup, not
// here — this file only holds the option lists themselves.

import { LOCATION } from '../config/location.js';

export const QUOTE_STEPS = [
  { id: 1, label: 'Service' },
  { id: 2, label: 'Vehicle' },
  { id: 3, label: 'Build' },
  { id: 4, label: 'Timing' },
  { id: 5, label: 'Contact' },
];

export const QUOTE_SERVICES = [
  { id: 'wraps',         label: 'Vehicle Wraps' },
  { id: 'ppf',           label: 'Paint Protection Film' },
  { id: 'ceramic',       label: 'Ceramic Coating' },
  { id: 'tint',          label: 'Window Tint' },
  { id: 'starlight',     label: 'Starlight / Galaxy Ceiling' },
  { id: 'detailing',        label: 'Auto Detailing' },
  { id: 'custom-interiors', label: 'Custom Interiors' },
  { id: 'stripes-decals',   label: 'Racing Stripes & Decals' },
  { id: 'caliper-painting', label: 'Caliper Painting' },
  { id: 'wheel-painting',   label: 'Wheel Painting' },
  { id: 'custom-builds', label: 'Custom Builds & Body Kits' },
];

// Step 1 asks for one of these groups rather than every individual
// service. A visitor arriving from a service page keeps their exact
// service (QUOTE_SERVICES above) and the group is derived from it; picking
// a group on the homepage sends the group, with specifics in the notes.
export const QUOTE_CATEGORIES = [
  { id: 'wraps-graphics',          label: 'Wraps & Graphics',            services: ['wraps', 'stripes-decals'] },
  { id: 'protection-coatings',     label: 'Protection & Coatings',       services: ['ppf', 'ceramic'] },
  { id: 'tint-lighting',           label: 'Tint & Lighting',             services: ['tint', 'starlight'] },
  { id: 'interiors-customization', label: 'Interiors & Customization',   services: ['custom-interiors', 'custom-builds'] },
  { id: 'detailing-wheels',        label: 'Detailing & Wheels',          services: ['detailing', 'wheel-painting', 'caliper-painting'] },
  { id: 'multiple',                label: 'Multiple Services / Not Sure', services: [] },
];

export function categoryForService(serviceId) {
  return QUOTE_CATEGORIES.find((c) => c.services.includes(serviceId))?.id || '';
}

// Keyed by exact service. When only a group was chosen in step 1 there's
// no exact service, so step 3 skips straight to the notes field instead.
export const QUOTE_PROJECT_OPTIONS = {
  wraps: [
    { id: 'full-wrap',     label: 'Full Wrap' },
    { id: 'partial-wrap',  label: 'Partial Wrap' },
    { id: 'colour-change', label: 'Colour Change' },
    { id: 'custom-design', label: 'Custom Design' },
    { id: 'not-sure',      label: 'Not Sure Yet' },
  ],
  ppf: [
    { id: 'full-front',  label: 'Full Front' },
    { id: 'track-pack',  label: 'Track Pack / High Impact Areas' },
    { id: 'full-body',   label: 'Full Body' },
    { id: 'colour-ppf',  label: 'Colour PPF' },
    { id: 'not-sure',    label: 'Not Sure Yet' },
  ],
  ceramic: [
    { id: 'exterior-coating',  label: 'Exterior Coating' },
    { id: 'wheels-glass-trim', label: 'Wheels / Glass / Trim' },
    { id: 'new-vehicle',       label: 'New Vehicle Protection' },
    { id: 'existing-refresh',  label: 'Existing Vehicle Refresh' },
    { id: 'not-sure',          label: 'Not Sure Yet' },
  ],
  tint: [
    { id: 'full-tint',        label: 'Full Vehicle Tint' },
    { id: 'windshield-strip', label: 'Windshield Strip' },
    { id: 'ceramic-tint',     label: 'Ceramic Tint' },
    { id: 'privacy-heat',     label: 'Privacy / Heat Reduction' },
    { id: 'not-sure',         label: 'Not Sure Yet' },
  ],
  starlight: [
    { id: 'single-colour', label: 'Single Colour Starlight' },
    { id: 'dual-tone',     label: 'Dual-Tone / Gradient' },
    { id: 'shooting-star', label: 'Shooting Star Effect' },
    { id: 'galaxy-ceiling', label: 'Galaxy Ceiling' },
    { id: 'not-sure',      label: 'Not Sure Yet' },
  ],
  detailing: [
    { id: 'full-detail',     label: 'Interior & Exterior Detail' },
    { id: 'exterior-detail', label: 'Exterior Detail' },
    { id: 'interior-detail', label: 'Interior Detail' },
    { id: 'not-sure',        label: 'Not Sure Yet' },
  ],
  'custom-interiors': [
    { id: 'floor-mats',     label: 'Custom Floor Mats' },
    { id: 'colour-change',  label: 'Interior Colour Change (Leather / Leatherette)' },
    { id: 'full-interior',  label: 'Full Interior Design' },
    { id: 'not-sure',       label: 'Not Sure Yet' },
  ],
  'stripes-decals': [
    { id: 'racing-stripes', label: 'Racing Stripes' },
    { id: 'premade-decals', label: 'Decals — Sourced For Me' },
    { id: 'custom-decals',  label: 'Decals — Custom Designed' },
    { id: 'not-sure',       label: 'Not Sure Yet' },
  ],
  'caliper-painting': [
    { id: 'match-body',     label: 'Match My Body Colour' },
    { id: 'contrast',       label: 'Contrast / Custom Design' },
    { id: 'restyle',        label: 'Part Of A Bigger Restyle' },
    { id: 'not-sure',       label: 'Not Sure Yet' },
  ],
  'wheel-painting': [
    { id: 'colour-change',  label: 'Full Wheel Colour Change' },
    { id: 'detail-work',    label: 'Accent / Detail Work' },
    { id: 'not-sure',       label: 'Not Sure Yet' },
  ],
  'custom-builds': [
    { id: 'body-kit-install',  label: 'Body Kit Installation' },
    { id: 'exterior-styling',  label: 'Exterior Styling Upgrade' },
    { id: 'full-custom-build', label: 'Full Custom Build' },
    { id: 'not-sure',          label: 'Not Sure Yet' },
  ],
};

export const QUOTE_TIMING_OPTIONS = [
  { id: 'asap',       label: 'As Soon As Possible' },
  { id: 'two-weeks',  label: 'Within 2 Weeks' },
  { id: 'this-month', label: 'This Month' },
  { id: 'exploring',  label: 'Just Exploring For Now' },
];

// WhatsApp is only offered where the location config has a number for it.
export const QUOTE_CONTACT_METHODS = [
  { id: 'phone',    label: 'Phone Call' },
  ...(LOCATION.contact.whatsapp ? [{ id: 'whatsapp', label: 'WhatsApp' }] : []),
  { id: 'email',    label: 'Email' },
];

// Newest first, down to 1980 — covers next year's model-year cars through
// anything old enough to still be a realistic customisation candidate.
const CURRENT_YEAR = new Date().getFullYear();
export const QUOTE_YEARS = Array.from(
  { length: CURRENT_YEAR + 1 - 1980 + 1 },
  (_, i) => String(CURRENT_YEAR + 1 - i)
);

// Alphabetical; the brand field is a searchable dropdown built from this
// list rather than free text, so submissions stay clean and consistent.
export const QUOTE_CAR_BRANDS = [
  'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley',
  'BMW', 'Bugatti', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ferrari',
  'Fiat', 'Ford', 'Genesis', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar',
  'Jeep', 'Kia', 'Koenigsegg', 'Lamborghini', 'Land Rover', 'Lexus', 'Lotus',
  'Lucid', 'Maserati', 'Maybach', 'Mazda', 'McLaren', 'Mercedes-Benz',
  'MINI', 'Mitsubishi', 'Nissan', 'Pagani', 'Polestar', 'Porsche',
  'Range Rover', 'Rimac', 'Rolls-Royce', 'Subaru', 'Suzuki', 'Tesla',
  'Toyota', 'Volkswagen', 'Volvo',
].sort((a, b) => a.localeCompare(b));
