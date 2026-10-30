import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

// Source is the brand-neutral Wraptors monogram on the site's #0a0a0a
// theme colour (the SVG already carries its own dark tile, so the
// "transparent" icons stay visible on light browser tabs). Maskable and
// Apple icons get the same background behind their safe-zone padding.
// Outputs land next to the source in public/branding/ — copy them to
// public/ (where index.html and the manifest reference them).
const background = { background: '#0a0a0a', fit: 'contain' }

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: {
    ...minimal2023Preset,
    transparent: { ...minimal2023Preset.transparent, padding: 0 },
    maskable: { ...minimal2023Preset.maskable, resizeOptions: background },
    apple: { ...minimal2023Preset.apple, resizeOptions: background },
  },
  images: ['public/branding/wraptors-monogram-icon.svg'],
})
