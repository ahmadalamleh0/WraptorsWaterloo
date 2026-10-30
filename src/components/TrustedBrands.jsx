import { useEffect, useRef } from 'react';
import styles from './TrustedBrands.module.css';
import logo3m     from '../../Banner/3m-red.svg';
import logoHexis  from '../../hexis_logo.svg';
import logoAvery  from '../../graphics-rev-logo-290x45.avif';
import logoStek   from '../../jIsdVIhisFg6BDDsoZ6StvyW840.avif';
import logoSuntek from '../../suntek-logo.svg';
import logoFse    from '../../fse-ppf-logo.png';

const BRANDS = [
  { name: '3M',             src: logo3m,     style: { filter: 'none' } },
  { name: 'HEXIS',          src: logoHexis,  style: { filter: 'none' } },
  { name: 'Avery Dennison', src: logoAvery  },
  { name: 'STEK',           src: logoStek   },
  { name: 'SunTek',         src: logoSuntek, style: { filter: 'none' } },
  { name: 'FSE PPF',        src: logoFse    },
];

// Four copies so the strip always feels full regardless of screen width.
// Animate translateX(-50%) = two copies' worth → seamless loop.
const TRACK = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

export default function TrustedBrands() {
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section}>

      <div className={styles.header} ref={headerRef}>
        <span className={styles.label}>Trusted Brands</span>
        <h2 className={styles.title}>BUILT WITH THE WORLD'S MOST ICONIC NAMES</h2>
        <p className={styles.sub}>
          From German performance to Italian exotics, every badge becomes a statement.
        </p>
      </div>

      {/* Marquee — fades at edges via CSS mask */}
      <div className={styles.marqueeOuter}>
        <div className={styles.marqueeTrack}>
          {TRACK.map((brand, i) => (
            <div key={i} className={styles.logoItem}>
              <img
                src={brand.src}
                alt={brand.name}
                className={styles.logo}
                style={brand.style}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
