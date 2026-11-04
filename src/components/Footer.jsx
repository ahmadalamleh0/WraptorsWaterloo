import { Fragment } from 'react';
import styles from './Footer.module.css';
import { SERVICE_LINKS } from '../data/serviceLinks';
import WraptorsMafiaLogo from './WraptorsMafiaLogo';
import footerImg from '../../Footer.jpeg';
import { LOCATION, MAPS_SEARCH_URL } from '../config/location.js';

const { contact, address, socials } = LOCATION;

// Footer renders on every page, so these use an absolute "/#id" path
// (navigate home, then scroll) rather than a bare "#id" fragment, which
// would only work while already on the homepage.
const NAV_LINKS = [
  { label: 'Services',    href: '/#services'         },
  { label: 'Locations',   href: '/#locations'        },
  { label: 'Builds',      href: '/#signature-builds' },
  { label: 'FAQs',        href: '/faqs/'             },
  { label: 'Press',       href: '/articles/'         },
  { label: 'Get a Quote', href: '/#cta'               },
];

const CONTACT = [
  { icon: <LocIcon />,   text: address.display,      href: MAPS_SEARCH_URL           },
  { icon: <MailIcon />,  text: contact.email,        href: `mailto:${contact.email}` },
  { icon: <PhoneIcon />, text: contact.phoneDisplay, href: `tel:${contact.phone}`, sub: contact.phoneIntl },
];

// Accounts without a URL in the location config are left out entirely.
const SOCIALS = [
  { label: 'Instagram', href: socials.instagram, icon: <InstagramIcon /> },
  { label: 'TikTok',    href: socials.tiktok,    icon: <TikTokIcon />    },
  { label: 'Facebook',  href: socials.facebook,  icon: <FacebookIcon />  },
  { label: 'YouTube',   href: socials.youtube,   icon: <YouTubeIcon />   },
].filter(s => s.href);

// Legal pages only render once they exist (see location config).
const LEGAL = [
  { label: 'Privacy', href: LOCATION.legal.privacy },
  { label: 'Terms',   href: LOCATION.legal.terms },
].filter(l => l.href);

// `solid` renders a plain black footer with no background photo — used on
// service pages, where the logo becomes the focal point instead. The
// homepage (and every other page) keeps the default photo footer.
export default function Footer({ solid = false }) {
  return (
    <>
    <footer className={`${styles.footer} ${solid ? styles.footerSolid : ''}`}>

      {!solid && (
        <>
          {/* Full-bleed background — boat is the hero */}
          <img
            className={styles.bg}
            src={footerImg}
            alt="Wraptors race boat"
            aria-hidden="true"
          />
          <div className={styles.overlay} aria-hidden="true" />
          <div className={styles.contentScrim} aria-hidden="true" />
        </>
      )}

      <div className={styles.content}>

        {/* ── Main columns ── */}
        <div className={styles.grid}>

          {/* Brand + socials */}
          <div className={styles.brand}>
            <WraptorsMafiaLogo className={`${styles.logo} ${solid ? styles.logoSolid : ''}`} />

            <p className={styles.tagline}>
              ELEVATING VEHICLES.<br />SETTING STANDARDS.
            </p>

            {/* Social icons — inline with brand */}
            <div className={styles.socials}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className={styles.socialLink}
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <p className={styles.brandSub}>
              The global standard for precision<br />automotive customisation.
            </p>
          </div>

          {/* Order: brand, Contact, Navigation, Services (client request 2026-11-04). */}
          {/* Contact */}
          <div id="contact" className={styles.col}>
            <h4 className={styles.colHeading}>Contact</h4>
            {CONTACT.map(c => (
              <a
                key={c.text}
                href={c.href}
                className={styles.contactRow}
                target={c.href?.startsWith('http') ? '_blank' : undefined}
                rel={c.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <span className={styles.contactIcon} aria-hidden="true">{c.icon}</span>
                {c.sub ? (
                  <span>{c.text}<span className={styles.contactSub}>{c.sub}</span></span>
                ) : c.text}
              </a>
            ))}
          </div>

          {/* Navigation */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Navigation</h4>
            <nav>
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href} className={styles.colLink}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className={`${styles.col} ${styles.colServices}`}>
            <h4 className={styles.colHeading}>Services</h4>
            <nav aria-label="Services">
              {SERVICE_LINKS.map(l => (
                <a key={l.href} href={l.href} className={styles.colLink}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

        </div>

        {/* ── Separator ── */}
        <div className={styles.sep} aria-hidden="true" />

        {/* ── Bottom bar ── */}
        <div className={styles.bar}>
          <span className={styles.copy}>
            © {new Date().getFullYear()} Wraptors. All rights reserved.
          </span>
          {LEGAL.length > 0 && (
            <div className={styles.legal}>
              {LEGAL.map((l, i) => (
                <Fragment key={l.label}>
                  {i > 0 && <span className={styles.legalDot} aria-hidden="true" />}
                  <a href={l.href} className={styles.legalLink}>{l.label}</a>
                </Fragment>
              ))}
            </div>
          )}
        </div>

      </div>
    </footer>

    {/* ── Powered-by credit — its own full-width solid-black section below
        the footer, deliberately bold/bright rather than a quiet aside. ── */}
    <div className={styles.poweredSection}>
      <span className={styles.poweredLabel}>Powered By</span>
      <a
        href="https://thediablo.co/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.poweredBrand}
      >
        Diablo
      </a>
    </div>
    </>
  );
}

/* ── Inline SVG icons ────────────────────────────────────── */
function LocIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 15.92z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.84 4.84 0 0 1-1.01-.09z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#000"/>
    </svg>
  );
}
