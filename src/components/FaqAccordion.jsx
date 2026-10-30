import { useState } from 'react';
import styles from './FaqAccordion.module.css';

// The answer is always in the DOM and only `hidden` while closed, so the
// prerendered HTML carries every answer for crawlers. An item with an `id`
// starts open when the URL hash points at it (legacy /ufaq/ URLs redirect
// to /faqs/#<id>).
function FaqItem({ id, q, a, mono }) {
  const [open, setOpen] = useState(() => Boolean(id) && window.location.hash === `#${id}`);
  return (
    <div className={styles.faqItem} id={id}>
      <button
        type="button"
        className={styles.faqQuestion}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {q}
        <span
          className={`${styles.faqIcon} ${mono ? styles.faqIconMono : ''} ${open ? styles.faqIconOpen : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <p className={styles.faqAnswer} hidden={!open}>{a}</p>
    </div>
  );
}

// `mono` swaps the expand icon from the site's red accent to white — used
// on service pages, which are strictly black/white/grey. Everywhere else
// (Learn articles, GEO pages) keeps the default red icon.
// `light` swaps the whole accordion to a white-background variant (black
// text, black icon, light-grey dividers) — service pages only.
export default function FaqAccordion({ faqs, mono = false, light = false }) {
  return (
    <div className={`${styles.faqList} ${light ? styles.faqListLight : ''}`}>
      {faqs.map((faq) => (
        <FaqItem key={faq.q} id={faq.id} q={faq.q} a={faq.a} mono={mono} />
      ))}
    </div>
  );
}
