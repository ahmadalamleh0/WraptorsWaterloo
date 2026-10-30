import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ServiceHero from './ServiceHero';
import ServiceIntroSection from './ServiceIntroSection';
import QuoteSection from './QuoteSection';
import ServiceFaqSection from './ServiceFaqSection';
import StarfieldBg from './StarfieldBg';
import styles from './StarlightPage.module.css';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { SITE_URL } from '../lib/siteConfig';
import interiorImg from '../../Starlight(1)_tool.jpg';
import beforeImg   from '../../before.png';
import afterImg    from '../../Starlight(3).jpeg';
import maskImgSrc  from '../../Gemini_Generated_Image_immxudimmxudimmx.png';
import gallery1    from '../../Starlight(4).jpeg';
import gallery2    from '../../Starlight(5).jpeg';
import gallery3    from '../../Starlight(6).jpeg';
import gallery4    from '../../Starlight(7).jpeg';
import editorialImg from '../../photoshotstar.jpeg';
import { LOCATION } from '../config/location.js';

// ── Constants ────────────────────────────────────────────────────────────────

const STAR_COUNTS = [500, 1000, 1500, 2000, 2500];

const COLORS = {
  'Pure White': [255, 255, 255],
  'Ice Blue':   [184, 212, 255],
  'Purple':     [192, 132, 252],
  'Warm Gold':  [251, 211, 141],
  'Red':        [252, 129, 129],
  'Emerald':    [52,  211, 153],
  'Rose':       [251, 113, 133],
  'Aqua':       [103, 232, 249],
  'Platinum':   [220, 226, 240],
};

const COLOR_HEX = {
  'Pure White': '#FFFFFF',
  'Ice Blue':   '#B8D4FF',
  'Purple':     '#C084FC',
  'Warm Gold':  '#FBD38D',
  'Red':        '#FF6B6B',
  'Emerald':    '#34D399',
  'Rose':       '#FB7185',
  'Aqua':       '#67E8F9',
  'Platinum':   '#DCE2F0',
};

// amt  = max shimmer depth (0 = static, 1 = full range)
// speed = global multiplier on each star's personal frequency
const TWINKLE = {
  'Soft':     { amt: 0.12, speed: 0.35 },
  'Balanced': { amt: 0.30, speed: 0.75 },
  'Dynamic':  { amt: 0.58, speed: 1.40 },
};

const DEFAULT = { count: 1500, color: 'Pure White', shooting: true };

const GALLERY = [
  { img: gallery1, label: 'Bespoke Night Sky' },
  { img: gallery2, label: 'Luxury Interior Glow' },
  { img: gallery3, label: 'Shooting Star Detail' },
  { img: gallery4, label: 'Executive Finish' },
];

// ── Mask sampling ─────────────────────────────────────────────────────────────
// The mask image (Gemini_Generated_Image_immxudimmxudimmx.png) is square and maps
// to the same canvas space as the interior photo:
//   canvas-normalised x  =  mask_px_x  / MASK_W
//   canvas-normalised y  =  mask_px_y  / MASK_H   (top 75% of square image)
const MASK_W = 256;
const MASK_H = 192; // MASK_W × ¾  (4:3 canvas shows top 75% of square image)

// Sample brightness (0–1) at canvas-normalised position.
// maskData = Uint8ClampedArray from getImageData, or null before load.
function sampleMask(maskData, cx, cy) {
  if (!maskData) return 1; // allow everything until mask loads
  const px  = Math.min(MASK_W - 1, Math.max(0, Math.floor(cx * MASK_W)));
  const py  = Math.min(MASK_H - 1, Math.max(0, Math.floor(cy * MASK_H)));
  return maskData[(py * MASK_W + px) * 4] / 255; // R channel (B&W mask: R=G=B)
}

// ── Star generation ───────────────────────────────────────────────────────────

function generateStars(count, maskData) {
  return Array.from({ length: count }, () => {
    let x, y, depth, attempts = 0;
    do {
      x = Math.random();
      y = Math.random() * 0.82;
      depth = sampleMask(maskData, x, y);
      attempts++;
    } while (depth < 0.05 && attempts < 120);

    // Size tiers: 78% tiny pinpoints, 17% small, 5% accent
    const tier = Math.random();
    const r = tier < 0.78
      ? 0.18 + Math.random() * 0.26    // tiny:   0.18–0.44 px
      : tier < 0.95
        ? 0.46 + Math.random() * 0.38  // small:  0.46–0.84 px
        : 0.86 + Math.random() * 0.50; // accent: 0.86–1.36 px

    // colorMix=0 → pure white, colorMix=1 → full selected color
    // 60% full color, 25% medium tint, 15% near-white accent
    const rnd = Math.random();
    const colorMix = rnd < 0.60
      ? 0.82 + Math.random() * 0.18    // full color: 82–100%
      : rnd < 0.85
        ? 0.52 + Math.random() * 0.30  // medium tint: 52–82%
        : Math.random() * 0.25;        // near-white accent: 0–25%

    return {
      x, y, depth, r, colorMix,
      // Each star has its own two independent oscillation frequencies
      baseBrightness: 0.50 + Math.random() * 0.50,
      phase:      Math.random() * Math.PI * 2,
      phaseB:     Math.random() * Math.PI * 2,
      freqA:      0.22 + Math.random() * 0.80,   // 0.22–1.02 Hz — primary shimmer
      freqB:      0.06 + Math.random() * 0.22,   // 0.06–0.28 Hz — slow undulation
      twinkleAmt: Math.random() < 0.20 ? 0 : 0.04 + Math.random() * 0.26,
      // Glow only on accent stars, and not all of them (~2% of all stars total)
      glow: r > 0.82 && Math.random() > 0.58,
    };
  });
}

function createShootingStar(maskData) {
  const angle = 0.16 + Math.random() * 0.24;
  let x, y, attempts = 0;
  do {
    x = Math.random();
    y = Math.random() * 0.70;
    attempts++;
  } while (sampleMask(maskData, x, y) < 0.40 && attempts < 120);
  return {
    x, y,
    vx: Math.cos(angle) * 0.0042,   // slower → more elegant
    vy: Math.sin(angle) * 0.0042,
    tailLen: 0.048 + Math.random() * 0.042, // shorter fine tail (0.048–0.090)
    angle,
    opacity: 0.72,  // starts dimmer — not a cartoon flash
    done: false,
  };
}

// ── Canvas draw ──────────────────────────────────────────────────────────────

function drawFrame(canvas, ctx, stars, elapsed, configRef, ssRef, maskDataRef) {
  const { width, height } = canvas;
  const [cr, cg, cb] = COLORS[configRef.current.color] ?? [255, 255, 255];
  const tw = TWINKLE[configRef.current.twinkle];

  ctx.clearRect(0, 0, width, height);

  // Very faint ambient tint — just barely perceptible, no visible blob
  const ag = ctx.createRadialGradient(width * 0.48, height * 0.22, 0, width * 0.48, height * 0.22, width * 0.52);
  ag.addColorStop(0,   `rgba(${cr},${cg},${cb},0.07)`);
  ag.addColorStop(0.7, `rgba(${cr},${cg},${cb},0.02)`);
  ag.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = ag;
  ctx.fillRect(0, 0, width, height);

  for (const star of stars) {
    // Dual-frequency shimmer: each star has its own independent rhythm
    const oscA = Math.sin(elapsed * star.freqA * tw.speed + star.phase)  * 0.5 + 0.5;
    const oscB = Math.sin(elapsed * star.freqB * tw.speed + star.phaseB) * 0.5 + 0.5;
    const shimmer = oscA * 0.65 + oscB * 0.35;
    // twinkleAmt=0 → constant, twinkleAmt=1 → full range; tw.amt scales globally
    const brightFactor = 1 - star.twinkleAmt * tw.amt + shimmer * star.twinkleAmt * tw.amt;
    const opacity = star.baseBrightness * brightFactor * star.depth;
    if (opacity <= 0.02) continue;

    // Per-star color: blend white → selected color by colorMix (0=white, 1=full color)
    const sr = Math.round(255 + (cr - 255) * star.colorMix);
    const sg = Math.round(255 + (cg - 255) * star.colorMix);
    const sb = Math.round(255 + (cb - 255) * star.colorMix);

    const sx = star.x * width;
    const sy = star.y * height;

    // Tight halo — only on accent stars, much smaller radius than before
    if (star.glow) {
      const gr  = star.r * 2.8;
      const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, gr);
      grd.addColorStop(0,   `rgba(${sr},${sg},${sb},${(opacity * 0.20).toFixed(3)})`);
      grd.addColorStop(0.5, `rgba(${sr},${sg},${sb},${(opacity * 0.05).toFixed(3)})`);
      grd.addColorStop(1,   `rgba(${sr},${sg},${sb},0)`);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(sx, sy, gr, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = opacity;
    ctx.fillStyle   = `rgb(${sr},${sg},${sb})`;
    ctx.beginPath();
    ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Shooting star — fine light streak, exits on mask boundary
  const ss = ssRef.current;
  if (ss && !ss.done) {
    if (sampleMask(maskDataRef.current, ss.x, ss.y) < 0.08) {
      ss.done = true;
    } else {
      const tailPx = ss.tailLen * width; // tail length relative to width for consistency
      const hx = ss.x * width;
      const hy = ss.y * height;
      const tx = hx - Math.cos(ss.angle) * tailPx;
      const ty = hy - Math.sin(ss.angle) * tailPx;

      const grd = ctx.createLinearGradient(tx, ty, hx, hy);
      grd.addColorStop(0,    `rgba(${cr},${cg},${cb},0)`);
      grd.addColorStop(0.55, `rgba(${cr},${cg},${cb},${(ss.opacity * 0.28).toFixed(3)})`);
      grd.addColorStop(1,    `rgba(255,255,255,${(ss.opacity * 0.85).toFixed(3)})`); // tip white-hot

      ctx.strokeStyle = grd;
      ctx.lineWidth   = 0.75;   // fine fiber-optic streak
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.stroke();

      ss.x += ss.vx;
      ss.y += ss.vy;
      ss.opacity -= 0.010; // gradual fade
      if (ss.opacity <= 0) ss.done = true;
    }
  }

}

// ── StarCanvas component ─────────────────────────────────────────────────────

function StarCanvas({ count, color, twinkle, shooting }) {
  const canvasRef   = useRef(null);
  const starsRef    = useRef([]);
  const rafRef      = useRef(null);
  const ssRef       = useRef(null);
  const ssTimer     = useRef(null);
  const configRef   = useRef({ color, twinkle, shooting });
  const activeRef   = useRef(true);
  const maskDataRef = useRef(null);

  // Sync live config without restarting the loop
  useEffect(() => {
    configRef.current = { ...configRef.current, color, twinkle, shooting };
  }, [color, twinkle, shooting]);

  // Clear any in-flight shooting star immediately when user turns it off
  useEffect(() => {
    if (!shooting && ssRef.current) ssRef.current = null;
  }, [shooting]);

  // Load mask once — extract pixel data only (no debug canvas needed)
  useEffect(() => {
    const img = new Image();
    img.src = maskImgSrc;
    img.onload = () => {
      const oc  = document.createElement('canvas');
      oc.width  = MASK_W;
      oc.height = MASK_H;
      const octx = oc.getContext('2d');
      octx.drawImage(img, 0, 0, img.width, img.width * 0.75, 0, 0, MASK_W, MASK_H);
      const imgData = octx.getImageData(0, 0, MASK_W, MASK_H);
      maskDataRef.current = imgData.data;
      starsRef.current = generateStars(count, maskDataRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-generate stars when count changes (mask may or may not be loaded yet)
  useEffect(() => {
    starsRef.current = generateStars(count, maskDataRef.current);
  }, [count]);

  // Shooting star scheduler
  useEffect(() => {
    const schedule = () => {
      ssTimer.current = setTimeout(() => {
        if (configRef.current.shooting) ssRef.current = createShootingStar(maskDataRef.current);
        schedule();
      }, 2800 + Math.random() * 4500);
    };
    schedule();
    return () => clearTimeout(ssTimer.current);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let startTime = null;

    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      canvas.width  = p.clientWidth;
      canvas.height = p.clientHeight;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();

    const io = new IntersectionObserver(([e]) => { activeRef.current = e.isIntersecting; }, { threshold: 0.1 });
    io.observe(canvas);

    const tick = (ts) => {
      if (!startTime) startTime = ts;
      if (activeRef.current) {
        drawFrame(canvas, ctx, starsRef.current, (ts - startTime) / 1000, configRef, ssRef, maskDataRef);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}

// ── BeforeAfter component ────────────────────────────────────────────────────

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos(Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateWidth = () => setContainerWidth(el.clientWidth);
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.baContainer}
      onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); updatePos(e.clientX); }}
      onPointerMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
      onPointerUp={() => { dragging.current = false; }}
    >
      {/* After — full width behind */}
      <div className={styles.baAfter}>
        <img src={afterImg} alt="With Starlight Headliner" draggable={false} />
        <span className={styles.baLabel}>AFTER</span>
      </div>

      {/* Before — clipped left portion */}
      <div className={styles.baBefore} style={{ width: `${pos}%` }}>
        <img src={beforeImg} alt="Standard Interior" draggable={false} style={{ width: containerWidth || '100vw' }} />
        <span className={styles.baLabel}>BEFORE</span>
      </div>

      {/* Divider handle */}
      <div className={styles.baHandle} style={{ left: `${pos}%` }}>
        <div className={styles.baLine} />
        <div className={styles.baDot}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L1 10L7 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M13 4L19 10L13 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function StarlightPage() {
  const [count,    setCount]    = useState(DEFAULT.count);
  const [color,    setColor]    = useState(DEFAULT.color);
  const previewRef = useRef(null);

  useDocumentMeta(
    `Starlight Headliners & Galaxy Ceilings in ${LOCATION.city} | Wraptors`,
    `Starlight headliners and galaxy ceilings with hand-laid stars in your choice of colour and density, built at the ${LOCATION.brandName} studio in ${LOCATION.address.locality}.`,
    `${SITE_URL}/services/starlight/`
  );

  return (
    <>
      <Navbar alwaysVisible />

      {/* ── HERO — shared ServiceHero, same family as every service page ── */}
      <ServiceHero
        eyebrow={`${LOCATION.brandName} · Starlight`}
        headline="Night, Built In."
        supportingLine="Starlight Headliners · Galaxy Ceilings · Custom Patterns"
        media={<StarfieldBg />}
      />

      {/* ── INTERACTIVE PREVIEW ──────────────────────────────────────── */}
      <section className={styles.previewSection} ref={previewRef}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Interactive Preview</span>
            <h2 className={styles.sectionTitle}>Design Your Night Sky</h2>
            <p className={styles.sectionSub}>Every option updates the simulation in real time.</p>
          </div>

          <div className={styles.previewGrid}>
            {/* Canvas */}
            <div className={styles.canvasWrap}>
              {/* 1. Base — real img so it can never be silently invisible */}
              <img
                src={interiorImg}
                alt=""
                className={styles.interiorImg}
                draggable={false}
              />
              {/* 2. 12% dark overlay for star readability — CSS div, not canvas */}
              <div className={styles.starOverlay} />
              {/* 3. Canvas — transparent, draws stars only */}
              <StarCanvas count={count} color={color} twinkle="Balanced" shooting={true} />
              {/* 4. Label */}
              <div className={styles.canvasLabel}>LIVE PREVIEW</div>
            </div>

            {/* Controls */}
            <div className={styles.controls}>

              {/* Star Count */}
              <div className={styles.controlGroup}>
                <span className={styles.controlLabel}>Star Count</span>
                <div className={styles.optRow}>
                  {STAR_COUNTS.map(n => (
                    <button
                      key={n}
                      className={`${styles.optBtn} ${count === n ? styles.optActive : ''}`}
                      onClick={() => setCount(n)}
                    >
                      {n.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Star Color */}
              <div className={styles.controlGroup}>
                <span className={styles.controlLabel}>Star Color</span>
                <div className={styles.colorRow}>
                  {Object.keys(COLORS).map(name => (
                    <button
                      key={name}
                      title={name}
                      className={`${styles.colorBtn} ${color === name ? styles.colorActive : ''}`}
                      style={{ '--swatch': COLOR_HEX[name] }}
                      onClick={() => setColor(name)}
                    >
                      <span className={styles.swatch} />
                      <span className={styles.swatchName}>{name}</span>
                    </button>
                  ))}
                </div>
              </div>




            </div>
          </div>
        </div>
      </section>

      {/* ── Your Cabin / Reimagined — reusable premium intro block ── */}
      <ServiceIntroSection
        kicker="Your Cabin"
        statement="Reimagined."
        description="Our starlight headliners and galaxy ceilings turn the roof of the cabin into part of the interior design. Layout, density and visual direction are planned around the cabin so the finished installation feels integrated into the vehicle rather than added afterward."
      />

      {/* ── BEFORE / AFTER ───────────────────────────────────────────── */}
      <section className={styles.baSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>The Transformation</span>
            <h2 className={styles.sectionTitle}>Drag to Compare</h2>
          </div>
          <BeforeAfter />
        </div>
      </section>

      {/* ── REAL INSTALLATIONS GALLERY ───────────────────────────── */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Real Installations</span>
            <h2 className={styles.sectionTitle}>A Closer Look</h2>
            <p className={styles.sectionSub}>A closer look at completed starlight interiors.</p>
          </div>

          <div className={styles.galleryGrid}>
            {GALLERY.map(({ img, label }) => (
              <div key={label} className={styles.galleryCard}>
                <img src={img} alt={label} className={styles.galleryImg} draggable={false} />
                <div className={styles.galleryOverlay} />
                <span className={styles.galleryLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL STATEMENT ──────────────────────────────────────── */}
      <section className={styles.editorialSection}>
        <img
          src={editorialImg}
          alt="Starlight Headliner Photoshoot"
          className={styles.editorialImg}
          draggable={false}
        />
        <div className={styles.editorialContent}>
          <h2 className={styles.editorialTitle}>Crafted</h2>
        </div>
      </section>

      <QuoteSection
        id="cta"
        initialService="starlight"
        subtitle="Ready to take the next step?"
        compact
      />

      <ServiceFaqSection service="starlight" />

      <Footer solid />
    </>
  );
}
