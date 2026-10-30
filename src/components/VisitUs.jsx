import { useEffect, useRef, useState } from 'react';
import styles from './VisitUs.module.css';
import { LOCATION, MAPS_SEARCH_URL as OPEN_MAPS_URL, MAPS_DIRECTIONS_URL as DIRECTIONS_URL } from '../config/location.js';

const { brandName, media } = LOCATION;
const ADDRESS_LINE = LOCATION.address.display;
// Where Google places the studio — used for the embed so the pin is exact.
const STUDIO_COORDS = LOCATION.address.coords;
// Keyless Google Maps embed, satellite layer (t=k), zoomed to street level.
// Embedded by coordinates, not address: an address query makes Google show
// its own "Open in Maps" card, and that link opens Maps with an empty search.
// Our own card below replaces it with a link that pre-fills the address.
const EMBED_URL = `https://maps.google.com/maps?q=${STUDIO_COORDS}&t=k&z=18&ie=UTF8&output=embed`;

// How long the satellite image zooms toward the pin before the live map
// fades in over it. Matches the transform transition in the CSS.
const ZOOM_MS = 1400;

export default function VisitUs() {
  const headerRef = useRef(null);
  // idle → zooming (image scales into the pin) → live (embedded map shown)
  const [stage, setStage] = useState('idle');

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

  useEffect(() => {
    if (stage !== 'zooming') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setStage('live'), reduced ? 0 : ZOOM_MS);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <section className={styles.section} id="visit-us">
      <div className={styles.header} ref={headerRef}>
        <h2 className={styles.title}>Visit Us</h2>
        <p className={styles.address}>{ADDRESS_LINE}</p>
        <a
          className={styles.directions}
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions
        </a>
      </div>

      <div className={styles.map} data-stage={stage}>
        <div className={styles.still} aria-hidden={stage === 'live'}>
          {media.mapImage && (
            <img
              className={styles.stillImg}
              src={media.mapImage}
              alt={media.mapImageAlt}
              style={media.mapImagePin ? { objectPosition: media.mapImagePin, transformOrigin: media.mapImagePin } : undefined}
              loading="lazy"
              decoding="async"
            />
          )}
          <button
            type="button"
            className={styles.explore}
            onClick={() => setStage('zooming')}
            disabled={stage !== 'idle'}
          >
            Explore Location
          </button>
        </div>

        {/* Mounted only once the visitor asks for it, so the Google Maps
            embed never loads for people who don't open it. */}
        {stage !== 'idle' && (
          <iframe
            className={styles.live}
            src={EMBED_URL}
            title={`${brandName} on Google Maps`}
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
        {stage === 'live' && (
          <div className={styles.card}>
            <p className={styles.cardName}>{brandName}</p>
            <p className={styles.cardAddress}>{ADDRESS_LINE}</p>
            <a
              className={styles.cardLink}
              href={OPEN_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
