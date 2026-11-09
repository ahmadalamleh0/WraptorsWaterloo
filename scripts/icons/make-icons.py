"""Build the site's icon set and social preview image from the supplied badge.

Sources (this folder):
  badge-source.jpg     - the Wraptors city badge supplied by the client
  og-photo-source.jpg  - the 1200x630 Lamborghini photo used for link previews
  ../../public/branding/wraptors-monogram-icon.svg - existing monogram vector

The badge is never redrawn: it is centred on its own black background,
padded and resized. Bump VERSION when the artwork changes so browsers and
link-preview caches fetch the new files.

Usage (from the repo root):  python scripts/icons/make-icons.py
Needs Pillow and numpy."""
import base64
import io
import re
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter

VERSION = 'v2'
HERE = Path(__file__).resolve().parent
PUBLIC = HERE.parent.parent / 'public'

im = Image.open(HERE / 'badge-source.jpg').convert('RGB')
a = np.asarray(im.convert('L'))
m = a > 80
cols, rows = np.nonzero(m.sum(0) > 2)[0], np.nonzero(m.sum(1) > 2)[0]
x0, x1, y0, y1 = cols.min(), cols.max() + 1, rows.min(), rows.max() + 1
cx, cy, art = (x0 + x1) / 2, (y0 + y1) / 2, max(x1 - x0, y1 - y0)


def icon(size, fill):
    """Badge filling `fill` of a square canvas, on the artwork's own black."""
    side = int(round(art / fill)) + 2
    canvas = Image.new('RGB', (side, side), (0, 0, 0))
    canvas.paste(im, (int(round(side / 2 - cx)), int(round(side / 2 - cy))))
    out = canvas.resize((size, size), Image.LANCZOS)
    if size <= 48:   # keep the ring and lettering crisp at tab size
        out = out.filter(ImageFilter.UnsharpMask(radius=0.6, percent=60, threshold=2))
    return out


def png(img, name):
    img.save(PUBLIC / name, optimize=True)


# Browser tabs, bookmarks, Google results (multiples of 48 for Google).
png(icon(16, 0.98), f'favicon-16x16-{VERSION}.png')
png(icon(32, 0.96), f'favicon-32x32-{VERSION}.png')
png(icon(48, 0.96), f'favicon-48x48-{VERSION}.png')
icon(48, 0.96).save(PUBLIC / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)],
                    append_images=[icon(16, 0.98), icon(32, 0.96)])

# SVG favicon (Chrome, Edge, Firefox). The badge is raster artwork, so the SVG
# carries it as an embedded image rather than a redrawn vector.
buf = io.BytesIO()
icon(96, 0.96).save(buf, 'PNG', optimize=True)
(PUBLIC / f'favicon-{VERSION}.svg').write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
    'width="96" height="96" viewBox="0 0 96 96">'
    f'<image width="96" height="96" xlink:href="data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"/>'
    '</svg>\n', encoding='utf-8')

# iPhone / iPad home screen. iOS rounds the corners itself; also served at
# the default /apple-touch-icon.png path iOS requests when no link is found.
apple = icon(180, 0.86)
png(apple, f'apple-touch-icon-{VERSION}.png')
png(apple, 'apple-touch-icon.png')

# Android / manifest.
png(icon(192, 0.90), f'android-chrome-192x192-{VERSION}.png')
png(icon(512, 0.90), f'android-chrome-512x512-{VERSION}.png')
png(icon(512, 0.76), f'maskable-icon-512x512-{VERSION}.png')   # inside the 80% safe circle

# Safari pinned tab: one-colour vector, from the existing monogram SVG.
mono = (PUBLIC / 'branding' / 'wraptors-monogram-icon.svg').read_text(encoding='utf-8')
mono = re.sub(r'\s*<rect[^>]*/>', '', mono).replace('fill="#ffffff"', 'fill="#000000"')
(PUBLIC / f'safari-pinned-tab-{VERSION}.svg').write_text(mono, encoding='utf-8')

# Link previews (Open Graph / X): the existing photo with the badge set on its
# dark left side. The badge is solid inside its outline; only the glow around
# it is screen-blended, so its black backing square disappears.
photo = Image.open(HERE / 'og-photo-source.jpg').convert('RGB')
W, H = photo.size
x = np.arange(W)
shade = np.clip(0.30 + (x - W * 0.42).clip(0) / (W * 0.25), 0.30, 1.0)   # darker on the left
dark = Image.fromarray((np.asarray(photo).astype(float) * shade[None, :, None]).astype('uint8'))
b = 300
badge = icon(b, 0.98)
pos = (int(W * 0.25 - b / 2), (H - b) // 2)
solid = badge.convert('L').point(lambda v: 255 if v > 40 else 0).filter(ImageFilter.MaxFilter(5))
ImageDraw.floodfill(solid, (0, 0), 128)                       # outside the outline
solid = solid.point(lambda v: 0 if v == 128 else 255).filter(ImageFilter.GaussianBlur(1.2))
layer = Image.new('RGB', (W, H), (0, 0, 0))
layer.paste(badge, pos)
og = ImageChops.screen(dark, layer)                           # glow over the photo
og.paste(badge, pos, solid)                                   # badge itself, opaque
og.save(PUBLIC / f'og-image-{VERSION}.jpg', quality=88, optimize=True, progressive=True)

print('icons written to', PUBLIC)
