import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServiceAreas.module.css';
import { getFeaturedLocations } from '../data/geoLocations';

const INITIAL_COUNT = 5;

// Pulls from the same centralized data as the GEO pages themselves
// (src/data/geoLocations.js) — add/remove/reorder a location there and
// both this row and its page update together.
export default function ServiceAreas() {
  const [expanded, setExpanded] = useState(false);
  const locations = getFeaturedLocations();
  const visible = expanded ? locations : locations.slice(0, INITIAL_COUNT);
  const hasMore = locations.length > INITIAL_COUNT;
  if (locations.length === 0) return null;

  return (
    <section id="service-areas" className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Where We Work</span>
        <h2 className={styles.title}>Service Areas</h2>

        <div className={styles.pillRow}>
          {visible.map((loc) => (
            <Link key={loc.slug} to={`/areas/${loc.slug}/`} className={styles.pill}>
              {loc.locationName}
            </Link>
          ))}
        </div>

        {hasMore && !expanded && (
          <button type="button" className={styles.viewAll} onClick={() => setExpanded(true)}>
            View All Areas <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </section>
  );
}
