import { Link } from 'react-router-dom';
import styles from './BookingCTA.module.css';
import { LOCATION, WHATSAPP_URL, PHONE_URL } from '../config/location.js';

// Compact conversion strip — deliberately not another full-height section.
// "Get a Quote" (pricing-first) and this booking CTA (ready to speak/visit)
// stay separate on purpose; this one leads into the /book form.
export default function BookingCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.title}>
            <span className={styles.lineA}>Ready When You Are.</span>
            <span className={styles.lineB}>Book Your Wraptors Visit.</span>
          </h2>
          <p className={styles.sub}>
            Choose your vehicle, what you&rsquo;re interested in, and when you&rsquo;d like to come by.
          </p>
        </div>

        <div className={styles.actions}>
          <Link to="/book/" className={styles.primary}>
            Book A Consultation <span aria-hidden="true">→</span>
          </Link>
          {WHATSAPP_URL ? (
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
              WhatsApp Us <span aria-hidden="true">→</span>
            </a>
          ) : (
            <a href={PHONE_URL} className={styles.secondary}>
              Call {LOCATION.contact.phoneDisplay} <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
