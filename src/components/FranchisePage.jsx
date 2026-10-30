import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './BookingPage.module.css';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useStructuredData } from '../lib/useStructuredData';
import { SITE_URL } from '../lib/siteConfig';
import { buildWhatsAppUrl } from '../lib/whatsappEnquiry';
import { submitToWeb3Forms, submissionErrorMessage, isValidEmail, isValidPhone, FRANCHISE_FORMS_ENABLED } from '../lib/web3forms';
import Honeypot from './Honeypot';
import { LOCATION, PHONE_URL, EMAIL_URL } from '../config/location.js';

const WHATSAPP_URL = buildWhatsAppUrl("Hi Wraptors, I'd like to ask about franchising.");
const HAS_WHATSAPP = Boolean(WHATSAPP_URL);

const SEO_TITLE = `Franchise With Wraptors | ${LOCATION.brandName}`;
const SEO_DESCRIPTION = 'Bring the Wraptors brand to your market. Explore franchise opportunities for premium vehicle wraps, PPF, ceramic coating and automotive styling.';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  location: '',
  experience: '',
  interest: '',
  message: '',
};

// Reuses BookingPage's form layout/styling exactly (see BookingPage.module.css)
// so this stays visually identical to the rest of the site's contact flows.
export default function FranchisePage() {
  const canonicalUrl = `${SITE_URL}/franchise/`;
  useDocumentMeta(SEO_TITLE, SEO_DESCRIPTION, canonicalUrl);

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Franchise', item: canonicalUrl },
    ],
  });

  const [form, setForm] = useState(EMPTY_FORM);
  // error keeps the form (and the visitor's entries) on screen with the
  // message above the submit button, which then reads "Try Again".
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error
  const [error, setError] = useState('');
  const [botcheck, setBotcheck] = useState(false);

  useEffect(() => {
    if (status === 'done') window.scrollTo(0, 0);
  }, [status]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = [
      !form.name.trim() && 'name',
      !form.email.trim() && 'email',
      !form.phone.trim() && 'phone number',
      !form.location.trim() && 'city / country',
    ].filter(Boolean);
    if (missing.length) {
      const list = missing.length > 1 ? `${missing.slice(0, -1).join(', ')} and ${missing.at(-1)}` : missing[0];
      setError(`Please add your ${list} so we can follow up.`);
      return;
    }
    if (!isValidEmail(form.email)) {
      setError('Enter a valid email address.');
      return;
    }
    if (!isValidPhone(form.phone)) {
      setError('Enter a valid phone number, including country and area code.');
      return;
    }
    setError('');
    setStatus('submitting');

    try {
      await submitToWeb3Forms({
        subject: `New Franchise Inquiry — ${LOCATION.brandName}`,
        from_name: `${LOCATION.brandName} Franchise Form`,
        form_type: 'Franchise Inquiry',
        name: form.name,
        email: form.email,
        phone: form.phone,
        city_country: form.location,
        business_experience: form.experience,
        franchise_interest: form.interest,
        message: form.message,
      }, { kind: 'franchise', botcheck });
      setStatus('done');
    } catch (err) {
      console.error('[Franchise] Web3Forms submission failed:', err);
      setError(`${submissionErrorMessage(err)} You can also email ${LOCATION.contact.email}.`);
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <>
        <Navbar alwaysVisible />
        <main>
          <section className={styles.confirmSection}>
            <span className={styles.eyebrow}>Thank You</span>
            <h1 className={styles.confirmTitle}>Inquiry Received.</h1>
            <p className={styles.confirmBody}>
              Thanks, {form.name.trim().split(' ')[0] || 'there'} &mdash; your franchise inquiry has
              been sent to the Wraptors franchise team, who will reply to {form.email.trim()}.
            </p>
            <div className={styles.confirmActions}>
              <Link to="/" className={styles.ctaPrimary}>Back To Home</Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar alwaysVisible />
      <main>

        {/* ── Breadcrumbs ── */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>Franchise</span>
        </nav>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <span className={styles.eyebrow}>Franchise Opportunities</span>
          <h1 className={styles.headline}>Franchise</h1>
          <p className={styles.intro}>
            Bring the Wraptors name, standard and craftsmanship to a new market. We partner with
            select operators who share our commitment to precision, quality and an uncompromising
            client experience — tell us about yourself below and our team will follow up directly.
          </p>
        </section>

        {/* ── Form ── */}
        <section className={styles.formSection}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Your Details</span>
              <div className={styles.row2}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Name</span>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={update('name')}
                    className={styles.input}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Email</span>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={update('email')}
                    className={styles.input}
                  />
                </label>
              </div>
              <div className={styles.row2}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>{HAS_WHATSAPP ? 'WhatsApp / Phone' : 'Phone'}</span>
                  <input
                    type="tel"
                    placeholder={LOCATION.forms.phonePlaceholder}
                    value={form.phone}
                    onChange={update('phone')}
                    className={styles.input}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>City / Country</span>
                  <input
                    type="text"
                    placeholder="e.g. Ottawa, Ontario"
                    value={form.location}
                    onChange={update('location')}
                    className={styles.input}
                  />
                </label>
              </div>
              <Honeypot checked={botcheck} onChange={setBotcheck} />
            </div>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Current Business / Automotive Experience <span className={styles.optional}>(optional)</span></span>
              <label className={styles.field}>
                <textarea
                  placeholder="Tell us about your current business or automotive background."
                  value={form.experience}
                  onChange={update('experience')}
                  className={styles.textarea}
                  rows={4}
                />
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Franchise Interest <span className={styles.optional}>(optional)</span></span>
              <label className={styles.field}>
                <input
                  type="text"
                  placeholder="e.g. Opening a Wraptors studio in your city"
                  value={form.interest}
                  onChange={update('interest')}
                  className={styles.input}
                />
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Message <span className={styles.optional}>(optional)</span></span>
              <label className={styles.field}>
                <textarea
                  placeholder="Anything else we should know?"
                  value={form.message}
                  onChange={update('message')}
                  className={styles.textarea}
                  rows={4}
                />
              </label>
            </div>

            {error && <p className={styles.error} role="alert">{error}</p>}
            {!FRANCHISE_FORMS_ENABLED && (
              <p className={styles.error}>
                Online inquiries aren&rsquo;t switched on yet — please email <a href={EMAIL_URL}>{LOCATION.contact.email}</a> or call {LOCATION.contact.phoneDisplay}.
              </p>
            )}

            <div className={styles.submitRow}>
              <button type="submit" className={styles.submitBtn} disabled={status === 'submitting' || !FRANCHISE_FORMS_ENABLED}>
                {status === 'submitting' ? 'Sending…' : !FRANCHISE_FORMS_ENABLED ? 'Inquiries Coming Soon' : status === 'error' ? 'Try Again' : 'Submit Inquiry'}
              </button>
              {HAS_WHATSAPP ? (
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.whatsappLink}>
                  Prefer WhatsApp? Message Us <span aria-hidden="true">→</span>
                </a>
              ) : (
                <a href={PHONE_URL} className={styles.whatsappLink}>
                  Prefer To Talk? Call {LOCATION.contact.phoneDisplay} <span aria-hidden="true">→</span>
                </a>
              )}
            </div>

          </form>
        </section>

      </main>
      <Footer />
    </>
  );
}
