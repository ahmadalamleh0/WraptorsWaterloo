// Aftercare product catalogue — the single source of truth for the
// "Don't Forget the Aftercare" section shared across every service page
// (see AftercareSection.jsx). Only real Wraptors store products live
// here; no invented items, prices or claims.
//
// AFTERCARE_BY_SERVICE controls which products show up on which service
// page. For now every service shows the same three products, for
// consistency across pages — swap in service-specific product ids later
// (per service, if the catalogue grows) without touching AftercareSection.

import productWaterless   from '../../Products/Carwaterless.webp';
import productVinyl       from '../../Products/Vinalprotectionwebp.webp';
import productFullPackage from '../../Products/full package.webp';
import { LOCATION } from '../config/location.js';

export const AFTERCARE_PRODUCTS = {
  waterless: {
    id: 'waterless-wash',
    name: 'Waterless Car Wash',
    desc: 'Plant-based formula that cleans, shines and repels UV, dust and fog — no water needed, and safe on PPF and coated surfaces.',
    img: productWaterless,
    link: 'https://wraptorsstore.com',
  },
  fullPackage: {
    id: 'full-package',
    name: 'Full Detailing Package',
    desc: 'Everything you need in one premium kit — interior shiner, car shampoo, waterless wash, anti-fog glass cleaner, tire shine, and more.',
    img: productFullPackage,
    link: 'https://wraptorsstore.com',
  },
  vinylProtectant: {
    id: 'vinyl-protectant',
    name: 'Vinyl Protectant',
    desc: 'UV-shielding vinyl elixir that keeps wrapped and filmed surfaces looking fresh, deep and protected.',
    img: productVinyl,
    link: 'https://wraptorsstore.com',
  },
};

// Keyed by the same service id used across SERVICE_PAGES / learnCategory
// (wraps, ppf, ceramic, tint).
const ALL_PRODUCTS = ['waterless', 'fullPackage', 'vinylProtectant'];

export const AFTERCARE_BY_SERVICE = {
  wraps:   ALL_PRODUCTS,
  ppf:     ALL_PRODUCTS,
  ceramic: ALL_PRODUCTS,
  tint:    ALL_PRODUCTS,
};

export function getAftercareProducts(serviceId) {
  // No working store configured → no products, so the section hides
  // instead of sending people to a dead "Shop Product" link.
  if (!LOCATION.shopUrl) return [];
  const ids = AFTERCARE_BY_SERVICE[serviceId] || [];
  return ids.map((id) => AFTERCARE_PRODUCTS[id]).filter(Boolean);
}
