import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import WraptorsMafiaLogo from './WraptorsMafiaLogo';
import { LOCATION } from '../config/location.js';
import { pagePath } from '../lib/siteConfig';
import { LEARN_ENABLED } from '../data/articles';

const NAV_LINKS = [
  { label: 'Services',  href: '/#services'  },
  { label: 'Locations', href: '/#locations' },
];

// Full-screen mobile menu — a deliberately separate, simplified list from
// the desktop nav above rather than the same items reflowed. `match`
// determines the "active" (bright white + underline) item from the
// current pathname; anchor-only items (Services, Locations, Contact) live
// on the homepage but aren't a distinct route, so they never light up as
// active — only Home/Franchise/About/Learn can.
const MOBILE_NAV_LINKS = [
  { label: 'Home',      href: '/',          match: (p) => p === '/' },
  { label: 'Services',  href: '/#services'  },
  { label: 'Locations', href: '/#locations' },
  { label: 'Franchise', to:   '/franchise/', match: (p) => p === '/franchise/' },
  { label: 'About',     to:   '/about/',     match: (p) => p === '/about/' },
  LEARN_ENABLED && { label: 'Learn', to: '/learn/', match: (p) => p.startsWith('/learn/') },
  { label: 'Contact',   href: '/#contact'   },
].filter(Boolean);

const MOBILE_SOCIALS = [
  { label: 'Instagram', href: LOCATION.socials.instagram, icon: <InstagramGlyph /> },
  { label: 'YouTube',   href: LOCATION.socials.youtube,   icon: <YouTubeGlyph /> },
  { label: 'LinkedIn',  href: LOCATION.socials.linkedin,  icon: <LinkedInGlyph /> },
].filter(s => s.href); // accounts without a URL are left out

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YouTubeGlyph() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4.5h16A1.5 1.5 0 0 1 21.5 6v12a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 18V6A1.5 1.5 0 0 1 4 4.5z" />
      <line x1="7" y1="10.5" x2="7" y2="16" />
      <circle cx="7" cy="7.3" r="0.6" fill="currentColor" stroke="none" />
      <path d="M11 16v-3.4c0-1.5 1-2.6 2.4-2.6 1.4 0 2.6 1 2.6 2.6V16" />
      <line x1="11" y1="10.5" x2="11" y2="16" />
    </svg>
  );
}

export default function Navbar({ alwaysVisible = false }) {
  const location = useLocation();
  const [scrolled,      setScrolled]      = useState(alwaysVisible);
  const [linksRevealed, setLinksRevealed] = useState(alwaysVisible);
  const [logoReady,     setLogoReady]     = useState(alwaysVisible);
  const [menuOpen,      setMenuOpen]      = useState(false);

  useEffect(() => {
    if (alwaysVisible) return;
    // Logo + "Dubai Edition" stay hidden through the whole initial hero
    // view (curtain intro, then the video/image hero itself) and only
    // reveal once the user has scrolled essentially a full viewport height,
    // into the next section — same threshold as `scrolled`, which already
    // marks that point for the navbar's solid background.
    const onScroll = () => {
      const y = window.scrollY;
      const pastHero = y > window.innerHeight * 0.88;
      setScrolled(pastHero);
      setLinksRevealed(y > 40);
      if (pastHero) setLogoReady(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [alwaysVisible]);

  // Lock page scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Portalled to document.body: nested inside <nav> (position:fixed,
  // z-index:200), this panel's own z-index would only ever be compared
  // against .nav's *other children* — .nav's stacking context as a whole
  // still loses to any higher-z-index element elsewhere in the document
  // (e.g. PresentationAdminControl's floating gear at 9999). Rendering at
  // the body level puts its z-index in direct competition with everything
  // else on the page, which is what "above ... all floating controls"
  // actually requires.
  const mobileMenu = (
    <div
      className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
      aria-hidden={!menuOpen}
    >
      <div className={styles.mobileMenuTop}>
        <Link to="/" className={styles.mobileMenuLogo} aria-label="Wraptors — home" onClick={closeMenu}>
          <WraptorsMafiaLogo className={styles.mobileMenuLogoMark} />
        </Link>
        <button
          className={styles.mobileMenuClose}
          onClick={closeMenu}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
        >
          <span /><span />
        </button>
      </div>

      <div className={styles.mobileMenuScroll}>
        <ul className={styles.mobileMenuList}>
          {MOBILE_NAV_LINKS.map(({ label, href, to, match }, i) => {
            const active = match ? match(pagePath(location.pathname)) : false;
            const linkClass = `${styles.mobileMenuLink} ${active ? styles.mobileMenuLinkActive : ''}`;
            return (
              <li
                key={label}
                className={styles.mobileMenuItem}
                style={{ transitionDelay: menuOpen ? `${0.28 + i * 0.045}s` : '0s' }}
              >
                {to ? (
                  <Link to={to} className={linkClass} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
                    <span className={styles.mobileMenuLinkText}>{label}</span>
                  </Link>
                ) : (
                  <a href={href} className={linkClass} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
                    <span className={styles.mobileMenuLinkText}>{label}</span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <div className={styles.mobileMenuFooter}>
          <div className={styles.mobileMenuSocials}>
            {MOBILE_SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileMenuSocial}
                aria-label={label}
                tabIndex={menuOpen ? 0 : -1}
              >
                {icon}
              </a>
            ))}
          </div>
          {/* Legal pages only render once they exist (see location config). */}
          {(LOCATION.legal.terms || LOCATION.legal.privacy) && (
            <div className={styles.mobileMenuLegal}>
              {LOCATION.legal.terms && <a href={LOCATION.legal.terms} tabIndex={menuOpen ? 0 : -1}>Terms and Conditions</a>}
              {LOCATION.legal.terms && LOCATION.legal.privacy && <span aria-hidden="true">&middot;</span>}
              {LOCATION.legal.privacy && <a href={LOCATION.legal.privacy} tabIndex={menuOpen ? 0 : -1}>Privacy Policy</a>}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''} ${!linksRevealed ? styles.navHeroMode : ''}`}>

      {/* Call / Email — left side of the bar (the logo is centred and the
          links/burger sit right). Icons only on smaller screens, icon +
          label on wide desktop. Hidden with the rest of the nav items
          during the homepage hero reveal. */}
      <div className={styles.contact}>
        <a href={`tel:${LOCATION.contact.phone}`} className={styles.contactBtn} aria-label={`Call the studio: ${LOCATION.contact.phoneIntl}`} title={LOCATION.contact.phoneIntl}>
          <PhoneGlyph />
          <span className={styles.contactLabel}>Call</span>
        </a>
        <a href={`mailto:${LOCATION.contact.email}`} className={styles.contactBtn} aria-label={`Email the studio: ${LOCATION.contact.email}`} title={LOCATION.contact.email}>
          <MailGlyph />
          <span className={styles.contactLabel}>Email</span>
        </a>
      </div>

      {/* Logo mark, with a small "<Location> Edition" label above it */}
      <a href="/" className={styles.logo} aria-label="Wraptors — back to home">
        <span className={`${styles.dubaiEdition} ${logoReady ? styles.dubaiEditionVisible : ''}`}>
          <span className={`${styles.dubaiEditionWord} ${styles.dubaiEditionWordLeft}`}>{LOCATION.edition.label}</span>
          <img src={LOCATION.edition.flag} alt="" className={styles.dubaiFlag} />
          <span className={`${styles.dubaiEditionWord} ${styles.dubaiEditionWordRight}`}>Edition</span>
        </span>
        <WraptorsMafiaLogo
          className={`${styles.navLogoMark} ${logoReady ? styles.navLogoVisible : ''}`}
        />
      </a>

      {/* Desktop links */}
      <ul className={styles.links}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className={styles.link}>
              {label}
            </a>
          </li>
        ))}
        <li>
          <Link to="/franchise/" className={styles.link}>
            Franchise
          </Link>
        </li>
        <li>
          <Link to="/about/" className={styles.link}>
            About
          </Link>
        </li>
        {LEARN_ENABLED && (
          <li>
            <Link to="/learn/" className={styles.link}>
              Learn
            </Link>
          </li>
        )}
      </ul>

      {/* Desktop CTA */}
      <a href="/#cta" className={`btn-primary ${styles.navCta}`}>
        Start Your Build
      </a>

      {/* Mobile burger — opens the full-screen mobile menu below */}
      <button
        className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>

    </nav>
    {createPortal(mobileMenu, document.body)}
    </>
  );
}
