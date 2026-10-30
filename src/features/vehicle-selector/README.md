# Preserved Vehicle Selector — temporarily disabled

This is the full manufacturer-grid → step-wizard vehicle configurator that
was previously live on the site (12 brands, 5 models each, engine/year
selection, GSAP word-mask heading, red-accented styling). It has been
**disabled, not deleted** — it isn't imported or rendered anywhere in the
current build, so it isn't shipped to visitors and doesn't add to the
active bundle. Nothing about it was changed when it was moved here.

## How to restore it

1. In `src/App.jsx`, re-add the import next to the other section imports:
   ```jsx
   import VehicleSelectorSection from './features/vehicle-selector/VehicleSelectorSection';
   ```
2. Render it in `HomePage` wherever it should appear again, e.g. right
   after `<SignatureBuilds />` (its original position):
   ```jsx
   <SignatureBuilds />
   <VehicleSelectorSection />
   <TrustedBrands />
   ```

That's it — no other files need to change. Everything it depends on
(component code, hooks, animations, styles, the 12 brand SVG logos, the
self-hosted Exo 2 font, the vehicle/model data) lives inside this folder.

## What's in here

- `VehicleSelector/` — the original extracted component, completely
  untouched (see `VehicleSelector/README.md` for its own docs). Contains
  the manufacturer grid, modal step wizard, hooks, vehicle/model data, and
  all 12 brand logo SVGs.
- `VehicleSelectorSection.jsx` — the thin integration wrapper used by
  `App.jsx`; wires a placeholder `onComplete` (`console.log`) since there's
  no backend/booking logic behind this demo.
- `VehicleSelectorSection.css` — self-hosted `Exo 2` `@font-face` plus the
  Wraptors-red accent/polish overrides added on top of the original
  component styling, scoped to `#configurator` so they never leak outside
  this feature.

## Why it was disabled

The vehicle selector is being saved for a tuning-shop client where a full
manufacturer/model picker is the right fit. It was briefly replaced on the
live page by a more universal quote flow
(`src/features/quote-form-draft/`), but that section has since also been
disabled ahead of a deployment — see that folder's own README. Right now
neither section renders; `<SignatureBuilds />` transitions directly into
`<TrustedBrands />` with no gap or spacer between them.
