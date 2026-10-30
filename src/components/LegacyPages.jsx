import { Link } from 'react-router-dom';
import SectionPage from './SectionPage';
import FaqAccordion from './FaqAccordion';
import OriginalServicesSection from './original-services/ServicesSection';
import SignatureBuilds from './SignatureBuilds';
import GlobalLocations from './GlobalLocations';
import VisitUs from './VisitUs';
import ServiceAreas from './ServiceAreas';
import YoutubeReel from './YoutubeReel';
import PressCards from './PressCards';
import learnStyles from './LearnHub.module.css';
import styles from './LegacyPages.module.css';
import { SERVICE_LINKS } from '../data/serviceLinks';
import { FAQS } from '../data/faqs';
import { PRESS_LIVE } from '../data/press';
import { LOCATION } from '../config/location.js';
import { pageUrl } from '../lib/siteConfig';

// Pages that keep the old WordPress site's URLs alive (see
// SEO-MIGRATION-AUDIT.md). Each one is an existing homepage section under
// a page header, so visitors from Google or old links land on the content
// they were looking for instead of being redirected to the homepage.

function ServicePills({ label }) {
  return (
    <nav className={learnStyles.filterRow} aria-label={label}>
      {SERVICE_LINKS.map((l) => (
        <Link key={l.href} to={l.href} className={learnStyles.filterPill}>{l.label}</Link>
      ))}
    </nav>
  );
}

export function ServicesHubPage() {
  return (
    <SectionPage
      path="/services"
      seoTitle={`Services | Wraps, PPF, Ceramic Coating & Tint in ${LOCATION.city} | Wraptors`}
      seoDescription={`Every service at ${LOCATION.brandName} in ${LOCATION.address.locality}: vehicle wraps, PPF, ceramic coating, window tint, starlight headliners, detailing and styling.`}
      eyebrow={LOCATION.brandName}
      title="Services"
      intro={`Vehicle wraps, paint protection film, ceramic coating, window tint, starlight headliners and more, all at our ${LOCATION.address.locality} studio.`}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: SERVICE_LINKS.map((l, i) => ({
          '@type': 'ListItem', position: i + 1, name: l.label, url: pageUrl(l.href),
        })),
      }}
    >
      <ServicePills label="All services" />
      <OriginalServicesSection />
    </SectionPage>
  );
}

export function GalleryPage() {
  return (
    <SectionPage
      path="/gallery"
      seoTitle={`Gallery | Wraps, PPF & Custom Builds | ${LOCATION.brandName}`}
      seoDescription={`Builds completed at ${LOCATION.brandName} in ${LOCATION.address.locality}, followed by work from the wider Wraptors network: wraps, paint protection, starlight and custom builds.`}
      eyebrow={LOCATION.brandName}
      title="Gallery"
      intro={`Builds completed at our ${LOCATION.address.locality} studio, followed by work from the wider Wraptors network.`}
    >
      <SignatureBuilds />
    </SectionPage>
  );
}

export function LocationsPage() {
  return (
    <SectionPage
      path="/locations"
      seoTitle={`Locations | ${LOCATION.brandName} in ${LOCATION.address.locality} & Wraptors Worldwide`}
      seoDescription={`${LOCATION.brandName} is at ${LOCATION.address.display}. Find the studio, the areas it serves and every Wraptors location worldwide.`}
      eyebrow="Wraptors Locations"
      title="Locations"
      intro={`${LOCATION.brandName} is at ${LOCATION.address.display}. Below: the studio, the areas we serve and the wider Wraptors network.`}
    >
      <VisitUs />
      <ServiceAreas />
      <GlobalLocations />
    </SectionPage>
  );
}

export function VideosPage() {
  return (
    <SectionPage
      path="/videos"
      seoTitle={`Videos | Wraptors Builds & Transformations | ${LOCATION.brandName}`}
      seoDescription="Wraptors build and transformation videos: widebody builds, colour changes and studio openings from the Wraptors YouTube channel."
      eyebrow={LOCATION.brandName}
      title="Videos"
      intro="Build and transformation videos from the Wraptors YouTube channel."
    >
      <YoutubeReel />
    </SectionPage>
  );
}

export function FaqPage() {
  // Legacy /ufaq/<id>/ URLs land on /faqs/#<id>: that item starts open
  // (FaqAccordion) and ScrollToTop in App.jsx brings it into view.
  return (
    <SectionPage
      path="/faqs"
      seoTitle={`Car Wrap FAQs | ${LOCATION.brandName}`}
      seoDescription={`Answers to common car wrap questions from ${LOCATION.brandName}: paint damage, removal, leased vehicles, window wraps, partial vs full wraps and caring for your wrap.`}
      eyebrow={LOCATION.brandName}
      title="FAQs"
      intro="Straight answers to the questions we hear most about vehicle wraps."
      schema={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }}
    >
      <section className={styles.faqSection}>
        <FaqAccordion faqs={FAQS} />
      </section>
      <div className={styles.moreHead}>
        <h2 className={styles.moreTitle}>More Questions By Service</h2>
      </div>
      <ServicePills label="Service FAQs" />
    </SectionPage>
  );
}

// /articles/ on the old site was a list of external press coverage, not
// guides; it stays a press page (the Learn hub is separate).
export function PressPage() {
  return (
    <SectionPage
      path="/articles"
      seoTitle="In The Press | Wraptors Media Coverage"
      seoDescription="Media coverage of the Wraptors brand and its founder: features, profiles and announcements from publishers including The Globe and Mail and Yahoo Finance."
      eyebrow="In The Press"
      title="Wraptors In The Media"
      intro={`Coverage of the wider Wraptors brand and its founder, not specific to the ${LOCATION.address.locality} studio. Labels show where a publisher marks a piece as a press release, syndicated or contributor content. Articles open on the publisher's site.`}
    >
      <section className={styles.pressSection}>
        <PressCards items={PRESS_LIVE} />
      </section>
    </SectionPage>
  );
}
