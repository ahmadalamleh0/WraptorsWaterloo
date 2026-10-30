# Wraptors Tri-City

Website for Wraptors Tri-City (Waterloo, Ontario), replacing the WordPress site at www.wraptorstricity.com. It was built from the Wraptors Hamilton project (commit `866d5e1`): the same code and design, with Tri-City's own location data.

- Location values: `src/config/location.js`. Anything unconfirmed is listed in `UNCONFIRMED` and printed as a build warning.
- Per-location content: `src/data/` (areas, Learn, FAQs, press) and `src/components/SignatureBuilds.jsx` (gallery).
- Migration process: `MIGRATION-DOCS/`. Tri-City findings: `TRICITY-DISCOVERY.md`. Blockers: `LAUNCH-CHECKLIST.md`.

```bash
npm ci
npm run dev
CONTEXT=production npm run build
node scripts/verify-migration.mjs --report MIGRATION-CHECK.md
```

Form keys go in the host's environment variables only (see `.env.example`).
