import { useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import styles from './ServiceHero.module.css';

// Shared hero for every service page — identical structure, positioning,
// typography hierarchy, spacing and overlay treatment everywhere. Only the
// media (video / image / canvas, passed in as `media`) and the wording
// change per page. Do not fork this per service — extend it instead.
export default function ServiceHero({
  eyebrow,
  headline,
  supportingLine,
  ctaLabel = 'Start Your Project',
  ctaHref = '#cta',
  media,
  // Set true for a headline that spans two lines (pass the break as \n in
  // the string) — sizes it down so a two-line headline doesn't take up
  // noticeably more of the hero than the usual single-line version.
  compactHeadline = false,
  // Set true to push the whole text group down into the lower part of the
  // hero (e.g. when the shot's main subject sits higher in frame and the
  // usual position covers it) — same content, just anchored lower.
  lowerContent = false,
  // Last step of the Home / Services / <service> trail. Defaults to the
  // service part of the eyebrow ("Wraptors Tri-City · Window Tint").
  breadcrumbName,
}) {
  const { pathname } = useLocation();
  const crumbName = breadcrumbName || String(eyebrow).split(' · ').pop();
  return (
    <section className={styles.hero}>
      <div className={styles.media}>{media}</div>
      <div className={`${styles.heroOverlay} ${lowerContent ? styles.heroOverlayLower : ''}`}>
        <Breadcrumbs
          className={styles.crumbs}
          items={[
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: crumbName, path: pathname },
          ]}
        />
        {/* The eyebrow sits inside the H1 so the page heading carries the
            service + city ("Wraptors Tri-City · Window Tint") as well as
            the cinematic line. .heading is display: contents — the layout
            is identical to the eyebrow and headline as separate siblings. */}
        <h1 className={styles.heading}>
          <span className={styles.eyebrow}>{eyebrow}</span>{' '}
          <span className={`${styles.headline} ${compactHeadline ? styles.headlineCompact : ''}`}>{headline}</span>
        </h1>
        <span className={styles.heroSubline}>{supportingLine}</span>
        <a href={ctaHref} className={styles.cta}>
          {ctaLabel} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
