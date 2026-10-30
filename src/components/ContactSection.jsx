import { useRef, useState, useEffect } from 'react';
import styles from './ContactSection.module.css';

const SERVICES = [
  'Full Vehicle Wrap',
  'Paint Protection Film',
  'Ceramic Coating',
  'Window Tint',
  'Custom Graphics & Styling',
  'Not Sure Yet',
];

const EMPTY_FORM = { name: '', email: '', phone: '', vehicle: '', service: '', message: '' };

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  // Placeholder handling for now — no backend behind this demo yet. Swap
  // this for a real submission call once one exists (see the same pattern
  // in src/features/quote-form-draft/submitQuote.js).
  function handleSubmit(e) {
    e.preventDefault();
    console.log('[ContactSection] inquiry submitted:', form);
    setSubmitted(true);
  }

  return (
    <section ref={sectionRef} className={`${styles.section} ${styles.animUp}`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>Start Your Project</span>
          <h2 className={styles.title}>BOOK YOUR CONSULTATION</h2>
          <p className={styles.sub}>
            Tell us about your vehicle and what you have in mind — a member of the Wraptors team will reach out to plan the details.
          </p>
        </div>

        <div className={styles.card}>
          {submitted ? (
            <div className={styles.confirmation}>
              <span className={styles.confirmIcon} aria-hidden="true">✓</span>
              <p className={styles.confirmText}>
                Thanks — your inquiry has been received. We&rsquo;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="cf-name">Full Name</label>
                  <input
                    id="cf-name"
                    className={styles.input}
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={update('name')}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="cf-email">Email</label>
                  <input
                    id="cf-email"
                    className={styles.input}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="cf-phone">Phone Number</label>
                  <input
                    id="cf-phone"
                    className={styles.input}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={form.phone}
                    onChange={update('phone')}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="cf-vehicle">Vehicle</label>
                  <input
                    id="cf-vehicle"
                    className={styles.input}
                    type="text"
                    placeholder="e.g. 2024 BMW M4"
                    required
                    value={form.vehicle}
                    onChange={update('vehicle')}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="cf-service">Service Interested In</label>
                <select
                  id="cf-service"
                  className={styles.select}
                  required
                  value={form.service}
                  onChange={update('service')}
                >
                  <option value="" disabled>Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="cf-message">Message</label>
                <textarea
                  id="cf-message"
                  className={styles.textarea}
                  rows={4}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={update('message')}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
