import { useEffect, useRef, useState } from 'react';
import { NEON_PATHS, NEON_VIEWBOX } from './neonSignPaths';
import styles from './NeonSign.module.css';

const rand = (min, max) => min + Math.random() * (max - min);

// Irregular neon fault for the location tube: mostly a quick blink or two,
// now and then a stutter or a short outage. Each step is [offMs, onMs].
function flickerPattern() {
  const r = Math.random();
  if (r < 0.6) return [[rand(50, 90), rand(60, 110)], [rand(40, 70), 0]];
  if (r < 0.88) return [[rand(30, 60), rand(50, 90)], [rand(25, 45), rand(90, 160)], [rand(60, 110), 0]];
  return [[rand(320, 650), rand(50, 80)], [rand(40, 70), 0]];
}

function Tubes({ className }) {
  return (
    <g className={className}>
      {NEON_PATHS.map((d, i) => (
        <path key={i} d={d} vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  );
}

// Studio sign before Client Experiences: the Wraptors neon sign (tube outlines
// traced from the physical Dubai studio sign) with the studio location under
// it. Dim until scrolled into view, then the wordmark powers on once and stays
// lit; the location tube flickers on its own every so often.
export default function NeonSign({ location }) {
  const ref = useRef(null);
  const placeRef = useRef(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Location flicker: starts once the sign is lit, only runs while the
  // section is on screen, and never runs for reduced-motion users.
  useEffect(() => {
    if (!lit) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const el = ref.current;
    const place = placeRef.current;
    let visible = true;
    let timer;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);

    const setOff = (off) => place?.classList.toggle(styles.placeOff, off);
    const runBurst = (steps, i = 0) => {
      if (i >= steps.length) { schedule(); return; }
      const [offMs, onMs] = steps[i];
      setOff(true);
      timer = setTimeout(() => {
        setOff(false);
        timer = setTimeout(() => runBurst(steps, i + 1), onMs);
      }, offMs);
    };
    const schedule = () => {
      timer = setTimeout(() => {
        if (visible) runBurst(flickerPattern());
        else schedule();
      }, rand(3500, 9500));
    };
    // First fault a little after the power-on has settled.
    timer = setTimeout(schedule, 2200);

    return () => {
      clearTimeout(timer);
      io.disconnect();
      setOff(false);
    };
  }, [lit]);

  return (
    <section
      ref={ref}
      className={`${styles.section} ${lit ? styles.lit : ''}`}
      aria-label={`Wraptors ${location}`}
    >
      <div className={styles.sign} role="img" aria-label={`Wraptors ${location} neon sign`}>
        <span className={styles.wall} aria-hidden="true" />
        <div className={styles.word} aria-hidden="true">
          {/* Unlit glass, always present underneath. */}
          <svg className={styles.unlit} viewBox={NEON_VIEWBOX}>
            <Tubes />
          </svg>
          {/* Lit tube: violet body + near-white core; fades in on power-on. */}
          <svg className={styles.litTubes} viewBox={NEON_VIEWBOX}>
            <Tubes className={styles.tubeBody} />
            <Tubes className={styles.tubeCore} />
          </svg>
        </div>
        <span ref={placeRef} className={styles.place} aria-hidden="true">{location}</span>
      </div>
    </section>
  );
}
