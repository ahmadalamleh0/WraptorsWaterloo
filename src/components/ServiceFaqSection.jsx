import FaqAccordion from './FaqAccordion';
import styles from './ServiceFaqSection.module.css';
import { SERVICE_FAQS } from '../data/serviceFaqs';

// Customer-facing FAQs for a service page, sourced from
// src/data/serviceFaqs.js. Renders nothing for a service with no approved
// copy yet, rather than showing placeholder questions.
export default function ServiceFaqSection({ service }) {
  const faqs = SERVICE_FAQS[service];
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>FAQ</span>
        <h2 className={styles.title}>Common Questions</h2>
      </div>
      <FaqAccordion faqs={faqs} light />
    </section>
  );
}
