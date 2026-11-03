import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './MobileQuoteCta.module.css';

// Mobile-only floating "Get a Quote" link. Fades in once the visitor has
// scrolled past the hero, and steps aside whenever a quote form (#cta) is
// on screen (or the footer, which has its own quote link). Bottom-left, opposite the WhatsApp button and the same height,
// so the two read as a pair. Goes to the page's own quote form if it has
// one, otherwise to the homepage form.
export default function MobileQuoteCta() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      const form = document.getElementById('cta');
      let formInView = false;
      if (form) {
        const r = form.getBoundingClientRect();
        formInView = r.top < window.innerHeight && r.bottom > 0;
      }
      // The footer has its own Get a Quote link, and the pill would sit over
      // its text, so step aside there too.
      const footer = document.querySelector('footer');
      const footerInView = Boolean(footer) && footer.getBoundingClientRect().top < window.innerHeight;
      setVisible(pastHero && !formInView && !footerInView);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const onClick = (e) => {
    const form = document.getElementById('cta');
    if (!form) return; // no form here: follow the link to the homepage form
    e.preventDefault();
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <a
      href="/#cta"
      onClick={onClick}
      className={`${styles.cta} ${visible ? styles.visible : ''}`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      Get a Quote
      <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </svg>
    </a>
  );
}
