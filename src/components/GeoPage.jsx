import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FaqAccordion from './FaqAccordion';
import Breadcrumbs from './Breadcrumbs';
import styles from './GeoPage.module.css';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useStructuredData } from '../lib/useStructuredData';
import { LOCATION, localBusinessSchema, MAPS_DIRECTIONS_URL } from '../config/location.js';
import { ARTICLES } from '../data/articles';
import { SERVICE_CATALOG, SERVICE_CATEGORY_LABEL, TRUST_COPY, WHY_WRAPTORS_SHARED, SITE_URL, AREA_LINKS, getLocationBySlug } from '../data/geoLocations';

// One reusable template rendered entirely from a location object — see
// src/data/geoLocations.js for the field reference and how to add/edit
// service areas without touching this file.
export default function GeoPage({ location }) {
  const canonicalUrl = `${SITE_URL}/areas/${location.slug}/`;
  useDocumentMeta(location.seoTitle, location.metaDescription, canonicalUrl);
  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${location.primaryKeyword} — ${LOCATION.brandName}`,
    provider: localBusinessSchema(),
    areaServed: {
      '@type': 'Place',
      name: location.locationName,
    },
    description: location.metaDescription,
  });

  const whyWraptors = [...WHY_WRAPTORS_SHARED, location.whyWraptorsLocal];
  const areaLinks = AREA_LINKS[location.slug] || { guides: [], services: [] };
  const guides = areaLinks.guides
    .map((slug) => ARTICLES.find((a) => a.slug === slug))
    .filter(Boolean);
  const extraServices = areaLinks.services
    .map((id) => SERVICE_CATALOG[id])
    .filter(Boolean);
  const relatedLocations = (location.relatedAreas || [])
    .map((slug) => getLocationBySlug(slug))
    .filter(Boolean);

  return (
    <>
      <Navbar alwaysVisible />
      <main>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            {/* Breadcrumb in the place (and type style) of the old "All
                Service Areas" back link; /locations/ lists every area. */}
            <Breadcrumbs
              className={styles.crumbs}
              items={[
                { name: 'Home', path: '/' },
                { name: 'Locations', path: '/locations' },
                { name: location.locationName, path: `/areas/${location.slug}` },
              ]}
            />
            <span className={styles.eyebrow}>{location.eyebrow}</span>
            <h1 className={styles.headline}>{location.h1}</h1>
            {location.heroCopy.map((paragraph, i) => (
              <p key={i} className={styles.intro}>{paragraph}</p>
            ))}
            <a href="/#cta" className={styles.heroCta}>
              Get a Quote
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* ── Local angle ── */}
        <section className={styles.contentSection}>
          <div className={styles.contentInner}>
            <h2 className={styles.contentHeading}>{location.localAngleHeading}</h2>
            {location.localAngle.map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* ── Trust / differentiation — shared brand philosophy, only the
             heading is location-specific. ── */}
        <section className={styles.trustSection}>
          <div className={styles.contentInner}>
            <h2 className={styles.contentHeading}>{location.trustHeading}</h2>
            {TRUST_COPY.map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* ── Services ── */}
        <section className={styles.servicesSection}>
          <div className={styles.servicesGrid}>
            {location.services.map(({ id, title, description }) => {
              const svc = SERVICE_CATALOG[id];
              if (!svc) return null;
              return (
                <Link key={id} to={svc.path} className={styles.serviceCard}>
                  <span className={styles.serviceCategory}>{SERVICE_CATEGORY_LABEL[id]}</span>
                  <span className={styles.serviceName}>{title}</span>
                  <p className={styles.serviceBlurb}>{description}</p>
                  <span className={styles.serviceLink}>Explore {svc.label} <span aria-hidden="true">→</span></span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Why Wraptors ── */}
        <section className={styles.whySection}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Why {location.locationName} Drivers Choose Wraptors</h2>
          </div>
          <div className={styles.whyGrid}>
            {whyWraptors.map(({ title, description }) => (
              <div key={title} className={styles.whyCard}>
                <span className={styles.whyTitle}>{title}</span>
                <p className={styles.whyDesc}>{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQs ── */}
        {/* ── Before you book — two guides that fit this area, plus any
             specialist services offered at the studio. ── */}
        {(guides.length > 0 || extraServices.length > 0) && (
          <section className={styles.relatedSection}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrowSmall}>Before You Book</span>
              <h2 className={styles.sectionTitle}>Guides &amp; Specialist Work</h2>
            </div>
            <div className={styles.relatedRow}>
              {guides.map((a) => (
                <Link key={a.slug} to={`/learn/${a.slug}/`} className={styles.relatedPill}>{a.title}</Link>
              ))}
              {extraServices.map((svc) => (
                <Link key={svc.path} to={svc.path} className={styles.relatedPill}>{svc.label}</Link>
              ))}
            </div>
          </section>
        )}

        <section className={styles.faqSection}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrowSmall}>Questions</span>
            <h2 className={styles.sectionTitle}>{location.locationName} FAQs</h2>
          </div>
          <FaqAccordion faqs={location.faqs} />
        </section>

        {/* ── Related areas ── */}
        {relatedLocations.length > 0 && (
          <section className={styles.relatedSection}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrowSmall}>Nearby</span>
              <h2 className={styles.sectionTitle}>Related Service Areas</h2>
            </div>
            <div className={styles.relatedRow}>
              {relatedLocations.map((loc) => (
                <Link key={loc.slug} to={`/areas/${loc.slug}/`} className={styles.relatedPill}>
                  {loc.locationName}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className={styles.ctaSection}>
          <span className={styles.eyebrowSmall}>Start Your Build</span>
          <h2 className={styles.ctaTitle}>Ready to get started in {location.locationName}?</h2>
          <div className={styles.ctaActions}>
            <a href="/#cta" className={styles.ctaPrimary}>
              Request a Quote <span aria-hidden="true">→</span>
            </a>
            <a href={`tel:${LOCATION.contact.phone}`} className={styles.ctaSecondary}>Call {LOCATION.contact.phoneDisplay}</a>
            {/* Every area page points to the studio: the Waterloo page (the
                physical studio) links to directions, the rest to it. */}
            {location.isPhysicalStudio ? (
              <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
                Get Directions To The Studio
              </a>
            ) : (
              <Link to="/areas/waterloo/" className={styles.ctaSecondary}>Visit The Waterloo Studio</Link>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
