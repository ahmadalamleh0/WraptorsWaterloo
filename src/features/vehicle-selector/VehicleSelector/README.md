# VehicleSelector

Ported from the Vyper DEMO site's brand-grid → modal wizard configurator
(originally `index.html` markup + `assets/js/main_v2.js`'s CONFIGURATOR
module + the relevant rules in `assets/css/styles_v2.css`). Same markup
structure, same CSS values, same interactions and entrance animation —
re-expressed as React so it can be dropped into a Vite/React project.

## Requirements

- React 18+, rendered inside a Vite project (uses `import.meta.glob` for logo assets).
- The `Exo 2` Google Font — the original site loads it globally; this folder
  does not bundle a font loader, so add it to your host project (e.g. a
  `<link>` in `index.html` or an `@import` in your global stylesheet).
- No required npm dependencies beyond `react`/`react-dom`. The entrance
  reveal animation uses the native Web Animations API, not framer-motion.

## Usage

```tsx
import { VehicleSelector } from './components/VehicleSelector';

function App() {
  return (
    <VehicleSelector
      onComplete={(selection) => {
        // selection: { brand, model, engine, year }
        // Wire up your own "book consultation" flow here —
        // open a form, call an API, navigate, whatever your project needs.
      }}
    />
  );
}
```

To use your own vehicle catalog instead of the original 12-brand demo data,
pass `data`, `brands`, and `brandLogos` (see `types.ts` / `vehicleData.ts`
for shapes) and drop your own SVGs in `assets/logos/`.

## What changed vs. the original site

This is a behavioral port, not a redesign — visuals, CSS values, and step
logic are unchanged. The one intentional change: the original hardcoded a
Vyper-specific final action (redirect to `hellcat.html`/`vehicle.html` +
`sessionStorage`). That's replaced with an `onComplete` callback so any
host project can decide what "book consultation" means for them.

## Not included

The scroll-driven "receding depth plane" effect between this section and
its neighbors (`.configurator + #partners`, z-index stacking in the
original `styles_v2.css`) was page-composition-specific and left out on
purpose — it assumed particular sibling sections on the original page.
