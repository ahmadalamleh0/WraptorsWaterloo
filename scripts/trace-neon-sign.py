"""Trace the Wraptors neon wordmark from the Dubai sign artwork as SVG tube loops.

Source: scripts/neon-sign-reference.png (the Wraptors Dubai sign, 2172x724).
The tubes' white-hot cores are picked out by the green channel (the halo has
almost none). Every dark area the tubes enclose (letter bodies, counters,
underline pieces) is grown back out to the tube centre-line and its outline
traced, smoothed lightly and written as closed Catmull-Rom curves. DUBAI is
left out: the site sets the city label as text.

Usage (from the repo root):
    python scripts/trace-neon-sign.py   # writes src/components/neonSignPaths.js
Needs numpy, scipy and Pillow."""
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'scripts' / 'neon-sign-reference.png'
OUT = ROOT / 'src' / 'components' / 'neonSignPaths.js'
CORE = 60      # green-channel threshold for a lit tube core
GAP = 6        # px used to seal hairline breaks between tube segments
SIG = 4        # contour smoothing (px)
EPS = 0.8      # simplification tolerance (px)
UNIT = 10      # source px per SVG unit
PAD = 8        # source px of margin around the wordmark

a = np.asarray(Image.open(SRC)).astype(int)
mask = ndi.binary_closing(a[..., 1] > CORE, iterations=1)
lab, _ = ndi.label(mask, structure=np.ones((3, 3)))
tube = np.zeros_like(mask)
for i, sl in enumerate(ndi.find_objects(lab), 1):
    comp = lab[sl] == i
    if comp.sum() < 150:
        continue                                    # specks of the backing board's edge
    if sl[0].start > 560 and sl[1].start > 1270:
        continue                                    # the DUBAI letters
    tube[sl] |= comp

dist = ndi.distance_transform_edt(tube)
half = int(round(float(np.percentile(dist[dist > 0], 90))))
dark, _ = ndi.label(~ndi.binary_dilation(tube, iterations=GAP))
outside = set(np.unique(np.concatenate([dark[0], dark[-1], dark[:, 0], dark[:, -1]])))

MOORE = [(0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1)]


def trace(region):
    ys, xs = np.nonzero(region)
    k = np.lexsort((xs, ys))[0]
    start = cur = (ys[k], xs[k])
    pts, back = [start], 4
    R = np.pad(region, 1)
    for _ in range(400000):
        for j in range(8):
            d = (back + 1 + j) % 8
            ny, nx = cur[0] + MOORE[d][0], cur[1] + MOORE[d][1]
            if R[ny + 1, nx + 1]:
                back, cur = (d + 4) % 8, (ny, nx)
                break
        else:
            break
        if cur == start:
            break
        pts.append(cur)
    return np.array(pts, float)


def rdp(p, e):
    if len(p) < 3:
        return p
    A, B = p[0], p[-1]
    ab = B - A
    L = np.hypot(*ab) or 1e-9
    d = np.abs(ab[0] * (p[:, 1] - A[1]) - ab[1] * (p[:, 0] - A[0])) / L
    k = int(np.argmax(d))
    if d[k] > e:
        return np.vstack([rdp(p[:k + 1], e)[:-1], rdp(p[k:], e)])
    return np.array([A, B])


loops = []
for r, sl in enumerate(ndi.find_objects(dark), 1):
    if sl is None or r in outside:
        continue
    m = half + GAP + 4
    ys = slice(max(sl[0].start - m, 0), sl[0].stop + m)
    xs = slice(max(sl[1].start - m, 0), sl[1].stop + m)
    reg = dark[ys, xs] == r
    if reg.sum() < 60:
        continue
    pts = trace(ndi.binary_dilation(reg, iterations=half + GAP)) + [ys.start, xs.start]
    if len(pts) < 20:
        continue
    sm = np.stack([ndi.gaussian_filter1d(pts[:, c], SIG, mode='wrap') for c in (1, 0)], 1)  # x, y
    far = int(np.argmax(np.hypot(*(sm - sm[0]).T)))
    simp = np.vstack([rdp(sm[:far + 1], EPS)[:-1], rdp(np.vstack([sm[far:], sm[:1]]), EPS)[:-1]])
    loops.append(simp)

allp = np.vstack(loops)
x0, y0 = allp.min(0) - PAD
x1, y1 = allp.max(0) + PAD


def closed_path(P):
    P = [((x - x0) / UNIT, (y - y0) / UNIT) for x, y in P]
    n = len(P)
    f = lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')
    d = f'M{f(P[0][0])} {f(P[0][1])}'
    for i in range(n):
        p0, p1, p2, p3 = P[i - 1], P[i], P[(i + 1) % n], P[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f'C{f(c1[0])} {f(c1[1])} {f(c2[0])} {f(c2[1])} {f(p2[0])} {f(p2[1])}'
    return d + 'Z'


loops.sort(key=lambda p: p[:, 0].mean())
body = ',\n'.join(f"  '{closed_path(p)}'" for p in loops)
OUT.write_text(
    "// Wraptors wordmark as neon tube loops, traced from the Wraptors Dubai sign\n"
    "// artwork (each closed loop is one tube run). Generated, not hand-edited:\n"
    "// regenerate with scripts/trace-neon-sign.py.\n"
    f"export const NEON_VIEWBOX = '0 0 {(x1 - x0) / UNIT:.1f} {(y1 - y0) / UNIT:.1f}';\n\n"
    f"export const NEON_PATHS = [\n{body},\n];\n",
    encoding='utf-8', newline='\n')
print(f'{len(loops)} loops, viewBox {(x1 - x0) / UNIT:.1f} x {(y1 - y0) / UNIT:.1f}, '
      f'bbox x {x0:.0f}-{x1:.0f} y {y0:.0f}-{y1:.0f}, {OUT.stat().st_size} bytes')
