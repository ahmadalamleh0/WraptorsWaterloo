import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './BookingPage.module.css';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useStructuredData } from '../lib/useStructuredData';
import { SITE_URL } from '../lib/siteConfig';
import { BOOKING_SERVICES } from '../data/bookingOptions';
import { buildBookingWhatsAppMessage, buildWhatsAppUrl } from '../lib/whatsappEnquiry';
import { LOCATION, PHONE_URL, EMAIL_URL } from '../config/location.js';
import { submitToWeb3Forms, submissionErrorMessage, isValidEmail, isValidPhone, FORMS_ENABLED } from '../lib/web3forms';
import Honeypot from './Honeypot';

const WHATSAPP_URL = buildWhatsAppUrl("Hi Wraptors, I'd like to book a consultation.");
const HAS_WHATSAPP = Boolean(WHATSAPP_URL);
// Bookings go through Web3Forms when this location's key is set, else
// WhatsApp if the location offers it — otherwise the form stays disabled.
const CAN_SUBMIT = FORMS_ENABLED || HAS_WHATSAPP;

const SEO_TITLE = `Book A Consultation — ${LOCATION.brandName}`;
const SEO_DESCRIPTION = `Book a consultation or visit with ${LOCATION.brandName}. Tell us about your vehicle, what you’re interested in, and when you’d like to come by — no account required.`;

const EMPTY_FORM = {
  year: '',
  make: '',
  model: '',
  services: [],
  preferredDate: '',
  name: '',
  phone: '',
  email: '',
  message: '',
};

const NEXT_YEAR = new Date().getFullYear() + 1;

// One message naming exactly what's missing or invalid, so the visitor
// doesn't have to hunt for it.
function validateBooking(form) {
  const missing = [
    !form.year.trim() && 'vehicle year',
    !form.make.trim() && 'make',
    !form.model.trim() && 'model',
    !form.name.trim() && 'name',
    !form.phone.trim() && 'phone number',
  ].filter(Boolean);
  if (missing.length) {
    const list = missing.length > 1 ? `${missing.slice(0, -1).join(', ')} and ${missing.at(-1)}` : missing[0];
    return `Please add your ${list} so we can follow up.`;
  }
  const year = Number(form.year.trim());
  if (!/^\d{4}$/.test(form.year.trim()) || year < 1950 || year > NEXT_YEAR) return `Enter the vehicle year as four digits (1950–${NEXT_YEAR}).`;
  if (!isValidPhone(form.phone)) return 'Enter a valid phone number, including area code.';
  if (form.email.trim() && !isValidEmail(form.email)) return 'Check the email address, or leave it blank.';
  return '';
}

// Booking is for someone ready to speak/visit; the separate Get a Quote
// flow (src/features/quote-form-draft) is for someone primarily looking
// for pricing. Kept intentionally minimal — no account, no login, just
// the fields needed to follow up.
export default function BookingPage() {
  const canonicalUrl = `${SITE_URL}/book/`;
  useDocumentMeta(SEO_TITLE, SEO_DESCRIPTION, canonicalUrl);

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Book A Consultation', item: canonicalUrl },
    ],
  });

  const [form, setForm] = useState(EMPTY_FORM);
  // error keeps the form (and the visitor's entries) on screen with the
  // message above the submit button, which then reads "Try Again".
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error
  const [via, setVia] = useState('form'); // form | whatsapp — which confirmation to show
  const [error, setError] = useState('');
  const [waUrl, setWaUrl] = useState(WHATSAPP_URL);
  const [botcheck, setBotcheck] = useState(false);

  // The confirmation view is much shorter than the filled-out form — without
  // this, whatever scroll position the user was at while filling the form
  // can leave the confirmation message below the fold.
  useEffect(() => {
    if (status === 'done') window.scrollTo(0, 0);
  }, [status]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const toggleService = (id) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(id)
        ? f.services.filter((s) => s !== id)
        : [...f.services, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!CAN_SUBMIT) return;
    const invalid = validateBooking(form);
    if (invalid) {
      setError(invalid);
      return;
    }
    setError('');

    // No lead-delivery backend exists yet, so this hands the booking off
    // to WhatsApp — a real, verifiable action — instead of faking a
    // "request received" screen for a submission that went nowhere.
    const serviceLabels = BOOKING_SERVICES
      .filter((s) => form.services.includes(s.id))
      .map((s) => s.label);

    if (FORMS_ENABLED) {
      setStatus('submitting');
      try {
        await submitToWeb3Forms({
          subject: `New Booking Request — ${LOCATION.brandName}`,
          from_name: `${LOCATION.brandName} Booking Form`,
          name: form.name,
          phone: form.phone,
          email: form.email.trim(), // Web3Forms uses this as the reply-to address
          vehicle: [form.year, form.make, form.model].filter(Boolean).join(' '),
          services: serviceLabels.join(', '),
          preferred_date: form.preferredDate,
          message: form.message,
        }, { botcheck });
        setVia('form');
        setStatus('done');
      } catch (err) {
        console.error('[Booking] Web3Forms submission failed:', err);
        setError(`${submissionErrorMessage(err)} You can also call ${LOCATION.contact.phoneDisplay}.`);
        setStatus('error');
      }
      return;
    }

    const message = buildBookingWhatsAppMessage(form, serviceLabels);
    const url = buildWhatsAppUrl(message);
    setWaUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
    setVia('whatsapp');
    setStatus('done');
  };

  if (status === 'done' && via === 'form') {
    return (
      <>
        <Navbar alwaysVisible />
        <main>
          <section className={styles.confirmSection}>
            <span className={styles.eyebrow}>Thank You</span>
            <h1 className={styles.confirmTitle}>Request Received.</h1>
            <p className={styles.confirmBody}>
              Thanks, {form.name.trim().split(' ')[0] || 'there'} &mdash; your booking request is with
              the {LOCATION.brandName} team. We&rsquo;ll call you on {form.phone.trim()}
              {form.email.trim() ? <> or reply to {form.email.trim()}</> : null} to confirm your visit.
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

  if (status === 'done') {
    return (
      <>
        <Navbar alwaysVisible />
        <main>
          <section className={styles.confirmSection}>
            <span className={styles.eyebrow}>Almost There</span>
            <h1 className={styles.confirmTitle}>Continue On WhatsApp.</h1>
            <p className={styles.confirmBody}>
              Thanks, {form.name.split(' ')[0] || 'there'} — we&rsquo;ve opened WhatsApp with your
              booking details ready to go. Hit send there to reach our team directly. If it
              didn&rsquo;t open, use the button below.
            </p>
            <div className={styles.confirmActions}>
              <Link to="/" className={styles.ctaPrimary}>Back To Home</Link>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
                Open WhatsApp
              </a>
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
          <span className={styles.breadcrumbCurrent}>Book A Consultation</span>
        </nav>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <span className={styles.eyebrow}>Book Your Visit</span>
          <h1 className={styles.headline}>Let&rsquo;s Get Your Build Started.</h1>
          <p className={styles.intro}>
            Tell us about your vehicle and what you&rsquo;re looking for — we&rsquo;ll follow up
            to confirm your visit. No account, no login, just the details we need to help.
          </p>
        </section>

        {/* ── Form ── */}
        <section className={styles.formSection}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Your Vehicle</span>
              <div className={styles.row3}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Year</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="2024"
                    value={form.year}
                    onChange={update('year')}
                    className={styles.input}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Make</span>
                  <input
                    type="text"
                    placeholder="e.g. BMW"
                    value={form.make}
                    onChange={update('make')}
                    className={styles.input}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Model</span>
                  <input
                    type="text"
                    placeholder="e.g. M4"
                    value={form.model}
                    onChange={update('model')}
                    className={styles.input}
                  />
                </label>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Service(s) Interested In</span>
              <div className={styles.serviceGrid}>
                {BOOKING_SERVICES.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleService(id)}
                    className={`${styles.serviceOption} ${form.services.includes(id) ? styles.serviceOptionActive : ''}`}
                    aria-pressed={form.services.includes(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Preferred Date</span>
              <label className={styles.field}>
                <input
                  type="date"
                  value={form.preferredDate}
                  onChange={update('preferredDate')}
                  className={styles.input}
                />
              </label>
            </div>

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
                  <span className={styles.fieldLabel}>{HAS_WHATSAPP ? 'Phone / WhatsApp' : 'Phone'}</span>
                  <input
                    type="tel"
                    placeholder={LOCATION.forms.phonePlaceholder}
                    value={form.phone}
                    onChange={update('phone')}
                    className={styles.input}
                  />
                </label>
              </div>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Email <span className={styles.optional}>(optional)</span></span>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={update('email')}
                  className={styles.input}
                  autoComplete="email"
                />
              </label>
              <Honeypot checked={botcheck} onChange={setBotcheck} />
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
            {!CAN_SUBMIT && (
              <p className={styles.error}>
                Online booking isn&rsquo;t switched on yet — call {LOCATION.contact.phoneDisplay} or
                email <a href={EMAIL_URL}>{LOCATION.contact.email}</a> to book your visit.
              </p>
            )}

            <div className={styles.submitRow}>
              <button type="submit" className={styles.submitBtn} disabled={!CAN_SUBMIT || status === 'submitting'}>
                {!CAN_SUBMIT ? 'Online Booking Coming Soon'
                  : status === 'submitting' ? 'Sending…'
                  : !FORMS_ENABLED ? 'Send Via WhatsApp'
                  : status === 'error' ? 'Try Again' : 'Request Booking'}
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
