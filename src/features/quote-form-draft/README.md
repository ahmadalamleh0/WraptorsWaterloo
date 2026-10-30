# Quote Form (draft) — temporarily disabled from the live website

Preserved for future customization and reactivation. This is the full
one-question-at-a-time quote journey (service selection, vehicle details,
coverage-level slider, style/timeline, contact, review + submit) built to
replace the vehicle selector on the live demo. It has been **disabled, not
deleted** — nothing here was changed when it was renamed from
`quote-form/` to `quote-form-draft/`; it just isn't imported or rendered
anywhere in the current build, so none of it ships to visitors or adds to
the active bundle.

## How to restore it

1. In `src/App.jsx`, re-add the import next to the other section imports:
   ```jsx
   import QuoteFormSection from './features/quote-form-draft/QuoteFormSection';
   ```
2. Render it in `HomePage` wherever it should appear again, e.g. right
   after `<SignatureBuilds />` (its position when it was last live):
   ```jsx
   <SignatureBuilds />
   <QuoteFormSection />
   <TrustedBrands />
   ```

That's it — no other files need to change. All state logic, validation,
localStorage persistence, GSAP transitions, icons, and data (services,
vehicle types, coverage stages, styles, timelines) live inside this folder.

## What's in here

- `QuoteFormSection.jsx` — top-level section: word-mask intro heading,
  step shell, GSAP enter/exit transitions between steps.
- `useQuoteForm.js` — the single structured state object, per-step
  validation, `localStorage` persistence (`wraptors:quoteForm`), online/
  offline tracking, step navigation.
- `submitQuote.js` — the one seam for wiring a real backend later; today
  it's a client-only stub (no network call, no keys), same pattern as
  `Academy.jsx`'s existing email signup.
- `quoteFormData.js` / `icons.jsx` — services, vehicle types, coverage
  stages, style/timeline options, and their line-icon set.
- `OptionCard.jsx`, `StepIndicator.jsx`, `steps/*.jsx` — the six step
  components and shared selection-card UI.
- `QuoteForm.module.css` — all styling (black/charcoal surfaces, red
  accents only, mobile-first).

## Why it was disabled

Disabled ahead of a deployment alongside the vehicle selector — see
`src/features/vehicle-selector/README.md`. With both sections removed,
`<SignatureBuilds />` now transitions directly into `<TrustedBrands />`
with no gap, spacer, or dead space where either used to sit.
