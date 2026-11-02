import { Link } from 'react-router-dom';
import { SERVICE_LOCAL, SERVICE_LOCAL_EYEBROW } from '../data/serviceLocal';
import { getFeaturedLocations } from '../data/geoLocations';
import styles from './ServiceLocal.module.css';

// Short local section for a service page (copy in src/data/serviceLocal.js),
// with quiet links to the area pages. Renders nothing for a service that
// has no local entry, so it can sit on every service page safely.
export default function ServiceLocal({ service }) {
  const local = SERVICE_LOCAL[service];
  if (!local) return null;
  const areas = getFeaturedLocations();

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>{SERVICE_LOCAL_EYEBROW}</span>
      <h2 className={styles.title}>{local.heading}</h2>
      {local.body.map((paragraph, i) => (
        <p key={i} className={styles.desc}>{paragraph}</p>
      ))}
      {areas.length > 0 && (
        <p className={styles.areas}>
          <span className={styles.areasLabel}>Areas we serve</span>
          {areas.map((loc, i) => (
            <span key={loc.slug}>
              {/* <wbr> lets the row wrap between areas on narrow screens. */}
              {i > 0 && <><span className={styles.dot} aria-hidden="true">·</span><wbr /></>}
              <Link to={`/areas/${loc.slug}/`}>{loc.locationName}</Link>
            </span>
          ))}
        </p>
      )}
    </section>
  );
}
