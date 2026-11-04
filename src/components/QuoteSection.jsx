import { useState, useEffect, useRef } from 'react';
import {
  QUOTE_STEPS,
  QUOTE_SERVICES,
  QUOTE_CATEGORIES,
  categoryForService,
  QUOTE_PROJECT_OPTIONS,
  QUOTE_TIMING_OPTIONS,
  QUOTE_CONTACT_METHODS,
  QUOTE_YEARS,
  QUOTE_CAR_BRANDS,
} from '../data/quoteFormData';
import { buildQuoteWhatsAppMessage, buildWhatsAppUrl } from '../lib/whatsappEnquiry';
import { submitToWeb3Forms, submissionErrorMessage, isValidEmail, isValidPhone, FORMS_ENABLED } from '../lib/web3forms';
import Honeypot from './Honeypot';
import styles from './QuoteSection.module.css';
import { LOCATION, PHONE_URL, EMAIL_URL } from '../config/location.js';

const labelFor = (list, id) => list.find((o) => o.id === id)?.label || '';

const EMPTY_FORM = {
  category: '', // step 1 group
  service: '',  // exact service — only known when arriving from a service page
  year: '', make: '', model: '',
  projectDetail: '', notes: '',
  timing: '', preferredDate: '',
  name: '', phone: '', email: '', preferredContact: '',
};

function validateStep(step, form) {
  const err = {};
  if (step === 1 && !form.category) {
    err.category = 'Choose a service to continue';
  }
  if (step === 2) {
    if (!form.year.trim())  err.year  = 'Required';
    if (!form.make.trim())  err.make  = 'Required';
    if (!form.model.trim()) err.model = 'Required';
  }
  if (step === 3) {
    const hasOptions = Boolean(QUOTE_PROJECT_OPTIONS[form.service]);
    if (hasOptions && !form.projectDetail) err.projectDetail = 'Choose the option closest to what you want';
  }
  if (step === 4 && !form.timing) {
    err.timing = 'Choose a timeframe to continue';
  }
  if (step === 5) {
    if (!form.name.trim())  err.name  = 'Required';
    if (!form.phone.trim()) err.phone = 'Required';
    else if (!isValidPhone(form.phone)) err.phone = 'Enter a valid phone number, including area code';
    if (!form.email.trim()) err.email = 'Required';
    else if (!isValidEmail(form.email)) err.email = 'Enter a valid email address';
  }
  return err;
}

// One reusable selectable card, used for service, build-option and
// timing choices — a single-select "radio" behind a plain button so no
// native radio styling has to be fought.
function OptionRow({ label, selected, onSelect }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`${styles.optionRow} ${selected ? styles.optionRowActive : ''}`}
    >
      <span className={styles.optionLabel}>{label}</span>
      <span className={styles.optionCheck} aria-hidden="true" />
    </button>
  );
}

// Searchable brand dropdown — a text input that filters QUOTE_CAR_BRANDS as
// you type, with selection only possible from the list (typing alone never
// sets the value), so submissions always carry a clean brand name.
function BrandSelect({ value, onChange, error }) {
  // query only holds what's being typed while the list is open; closed, the
  // input just displays `value` directly — no state needs syncing from it.
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const filtered = query.trim()
    ? QUOTE_CAR_BRANDS.filter((b) => b.toLowerCase().includes(query.trim().toLowerCase()))
    : QUOTE_CAR_BRANDS;

  const select = (brand) => {
    onChange(brand);
    setQuery('');
    setOpen(false);
  };

  return (
    <div className={styles.combo} ref={wrapRef}>
      <input
        type="text"
        placeholder={value || 'Search brand…'}
        value={open ? query : (value || '')}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (value) onChange('');
        }}
        onFocus={() => { setQuery(''); setOpen(true); }}
        className={styles.input}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
      />
      {open && (
        filtered.length > 0 ? (
          <ul className={styles.comboList} role="listbox">
            {filtered.map((b) => (
              <li key={b} role="option" aria-selected={value === b}>
                <button type="button" className={styles.comboOption} onMouseDown={(e) => e.preventDefault()} onClick={() => select(b)}>
                  {b}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.comboEmpty}>No matching brand</div>
        )
      )}
      {error && <span className={styles.errorSmall}>{error}</span>}
    </div>
  );
}

export default function QuoteSection({
  id,
  initialService,
  eyebrow = 'Quote Request',
  title = 'Start Your Build',
  subtitle = 'Tell us what you’re building and we’ll shape the right next step.',
  compact = false,
}) {
  // On a service page, the visitor already told us what they're here for
  // by being on that page — start them one step in rather than asking
  // again. Step 1 stays fully intact and reachable via Back, so they can
  // still change the service if they want to.
  const [step, setStep] = useState(initialService ? 2 : 1);
  const [form, setForm] = useState(() => (
    initialService
      ? { ...EMPTY_FORM, service: initialService, category: categoryForService(initialService) }
      : EMPTY_FORM
  ));
  const [errors, setErrors] = useState({});
  // error keeps the form on screen with the visitor's entries, so they can
  // retry (or fall back to WhatsApp / phone) instead of starting over.
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error
  const [submitError, setSubmitError] = useState('');
  const [waUrl, setWaUrl] = useState('');
  const [botcheck, setBotcheck] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  // Picking a group is unambiguous — jump straight to Vehicle instead of
  // making them click Next. Back still returns here to change it. An exact
  // service (from a service page) is kept only if it belongs to the group.
  const selectCategory = (id) => {
    setForm((f) => {
      const keep = QUOTE_CATEGORIES.find((c) => c.id === id)?.services.includes(f.service);
      return { ...f, category: id, service: keep ? f.service : '', projectDetail: keep ? f.projectDetail : '' };
    });
    setErrors({});
    setStep(2);
  };
  const selectOption = (field, id) => setForm((f) => ({ ...f, [field]: id }));

  const goNext = async () => {
    const err = validateStep(step, form);
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    if (step < QUOTE_STEPS.length) {
      setStep((s) => s + 1);
      return;
    }

    const labels = {
      // Exact service when we have it (service pages), otherwise the group.
      service: labelFor(QUOTE_SERVICES, form.service) || labelFor(QUOTE_CATEGORIES, form.category),
      category: labelFor(QUOTE_CATEGORIES, form.category),
      projectDetail: projectOptions ? labelFor(projectOptions, form.projectDetail) : '',
      timing: labelFor(QUOTE_TIMING_OPTIONS, form.timing),
      preferredContact: labelFor(QUOTE_CONTACT_METHODS, form.preferredContact),
    };

    setStatus('submitting');
    setSubmitError('');
    try {
      await submitToWeb3Forms({
        subject: `New Quote Request — ${LOCATION.brandName}`,
        from_name: `${LOCATION.brandName} Quote Form`,
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: labels.service,
        service_category: labels.category,
        vehicle: [form.year, form.make, form.model].filter(Boolean).join(' '),
        build_details: labels.projectDetail,
        notes: form.notes,
        timing: labels.timing,
        preferred_date: form.preferredDate,
        preferred_contact: labels.preferredContact,
      }, { botcheck });
      setStatus('done');
    } catch (err2) {
      // Web3Forms is the primary path; WhatsApp (or the phone) is offered
      // alongside a retry only if that submission actually fails.
      console.error('[Quote] Web3Forms submission failed:', err2);
      const message = buildQuoteWhatsAppMessage(form, labels);
      setWaUrl(buildWhatsAppUrl(message) || PHONE_URL);
      setSubmitError(submissionErrorMessage(err2));
      setStatus('error');
    }
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const projectOptions = QUOTE_PROJECT_OPTIONS[form.service];
  const isLastStep = step === QUOTE_STEPS.length;

  return (
    <section id={id} className={`${styles.section} ${compact ? styles.sectionCompact : ''}`}>
      <div className={styles.head}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.sub}>{subtitle}</p>
      </div>

      <div className={styles.panel}>
        {status === 'done' ? (
          <div className={styles.success}>
            <span className={styles.successEyebrow}>Thank You</span>
            <h3 className={styles.successTitle}>Request Received.</h3>
            <p className={styles.successBody}>
              Thanks, {form.name.trim().split(' ')[0] || 'there'} &mdash; your build details are with
              the {LOCATION.brandName} team. We&rsquo;ll reply to {form.email.trim() || 'you'} or
              call {form.phone.trim() || 'you'} to confirm next steps.
            </p>
          </div>
        ) : (
          <>
            {/* ── Progress ── */}
            <div className={styles.progress}>
              <div className={styles.progressBarTrack}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${((step - 1) / (QUOTE_STEPS.length - 1)) * 100}%` }}
                />
              </div>
              <ol className={styles.progressList}>
                {QUOTE_STEPS.map((s) => (
                  <li
                    key={s.id}
                    className={`${styles.progressItem} ${s.id === step ? styles.progressItemActive : ''} ${s.id < step ? styles.progressItemDone : ''}`}
                  >
                    <span className={styles.progressNum}>{String(s.id).padStart(2, '0')}</span>
                    <span className={styles.progressLabel}>{s.label}</span>
                  </li>
                ))}
              </ol>
              <div className={styles.progressCompact}>
                <span className={styles.progressCompactNum}>{String(step).padStart(2, '0')}</span>
                <span aria-hidden="true">/</span>
                <span className={styles.progressCompactLabel}>{QUOTE_STEPS[step - 1].label}</span>
              </div>
            </div>

            {/* ── Step body ── */}
            <div className={styles.body}>
              {step === 1 && (
                <div className={styles.stepInner}>
                  <h3 className={styles.stepTitle}>What are you building?</h3>
                  <p className={styles.stepSub}>Choose the direction that fits your vehicle.</p>
                  <div className={`${styles.optionGrid} ${styles.optionGridCompact}`} role="radiogroup" aria-label="Service interest">
                    {QUOTE_CATEGORIES.map(({ id, label }) => (
                      <OptionRow key={id} label={label} selected={form.category === id} onSelect={() => selectCategory(id)} />
                    ))}
                  </div>
                  {errors.category && <p className={styles.error}>{errors.category}</p>}
                </div>
              )}

              {step === 2 && (
                <div className={styles.stepInner}>
                  <h3 className={styles.stepTitle}>Tell us about the vehicle</h3>
                  <div className={styles.row3}>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Year</span>
                      <select value={form.year} onChange={update('year')} className={styles.input}>
                        <option value="" disabled>Select year</option>
                        {QUOTE_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                      {errors.year && <span className={styles.errorSmall}>{errors.year}</span>}
                    </label>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Make</span>
                      <BrandSelect value={form.make} onChange={(v) => setForm((f) => ({ ...f, make: v }))} error={errors.make} />
                    </label>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Model</span>
                      <input type="text" placeholder="e.g. M4" value={form.model} onChange={update('model')} className={styles.input} />
                      {errors.model && <span className={styles.errorSmall}>{errors.model}</span>}
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className={styles.stepInner}>
                  <h3 className={styles.stepTitle}>What are you trying to build?</h3>
                  {projectOptions ? (
                    <>
                      <p className={styles.stepSub}>Choose the option closest to what you have in mind.</p>
                      <div className={styles.optionList} role="radiogroup" aria-label="Build details">
                        {projectOptions.map(({ id, label }) => (
                          <OptionRow key={id} label={label} selected={form.projectDetail === id} onSelect={() => selectOption('projectDetail', id)} />
                        ))}
                      </div>
                      {errors.projectDetail && <p className={styles.error}>{errors.projectDetail}</p>}
                    </>
                  ) : (
                    <p className={styles.stepSub}>
                      {form.category === 'multiple'
                        ? <>Tell us which services you&rsquo;re interested in and what you have in mind below.</>
                        : <>Tell us which {labelFor(QUOTE_CATEGORIES, form.category).toLowerCase()} service you&rsquo;re after and what you have in mind below.</>}
                    </p>
                  )}
                  <label className={styles.field} style={{ marginTop: projectOptions ? 24 : 4 }}>
                    <span className={styles.fieldLabel}>Additional Notes / Goals <span className={styles.optional}>(optional)</span></span>
                    <textarea
                      placeholder="Tell us what look, finish or protection direction you have in mind."
                      value={form.notes}
                      onChange={update('notes')}
                      className={styles.textarea}
                      rows={4}
                    />
                  </label>
                </div>
              )}

              {step === 4 && (
                <div className={styles.stepInner}>
                  <h3 className={styles.stepTitle}>When are you looking to do this?</h3>
                  <div className={styles.optionList} role="radiogroup" aria-label="Timing">
                    {QUOTE_TIMING_OPTIONS.map(({ id, label }) => (
                      <OptionRow key={id} label={label} selected={form.timing === id} onSelect={() => selectOption('timing', id)} />
                    ))}
                  </div>
                  {errors.timing && <p className={styles.error}>{errors.timing}</p>}
                  <label className={styles.field} style={{ marginTop: 24 }}>
                    <span className={styles.fieldLabel}>Preferred Appointment Date <span className={styles.optional}>(optional)</span></span>
                    <input type="date" value={form.preferredDate} onChange={update('preferredDate')} className={styles.input} />
                  </label>
                </div>
              )}

              {step === 5 && (
                <div className={styles.stepInner}>
                  <h3 className={styles.stepTitle}>Where should we send your quote?</h3>
                  <Honeypot checked={botcheck} onChange={setBotcheck} />
                  <div className={styles.row2}>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Full Name</span>
                      <input type="text" placeholder="Full name" value={form.name} onChange={update('name')} className={styles.input} />
                      {errors.name && <span className={styles.errorSmall}>{errors.name}</span>}
                    </label>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>{LOCATION.contact.whatsapp ? 'Phone / WhatsApp' : 'Phone'}</span>
                      <input type="tel" placeholder={LOCATION.forms.phonePlaceholder} value={form.phone} onChange={update('phone')} className={styles.input} />
                      {errors.phone && <span className={styles.errorSmall}>{errors.phone}</span>}
                    </label>
                  </div>
                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Email</span>
                    <input type="email" placeholder="you@email.com" value={form.email} onChange={update('email')} className={styles.input} />
                    {errors.email && <span className={styles.errorSmall}>{errors.email}</span>}
                  </label>
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Preferred Contact Method <span className={styles.optional}>(optional)</span></span>
                    <div className={styles.optionListInline} role="radiogroup" aria-label="Preferred contact method">
                      {QUOTE_CONTACT_METHODS.map(({ id, label }) => (
                        <button
                          key={id}
                          type="button"
                          role="radio"
                          aria-checked={form.preferredContact === id}
                          onClick={() => selectOption('preferredContact', id)}
                          className={`${styles.pill} ${form.preferredContact === id ? styles.pillActive : ''}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isLastStep && status === 'error' && (
              <div className={styles.submitError} role="alert">
                <p className={styles.error}>{submitError}</p>
                <a href={waUrl} className={styles.submitErrorLink} {...(LOCATION.contact.whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {LOCATION.contact.whatsapp ? 'Or send it on WhatsApp' : `Or call ${LOCATION.contact.phoneDisplay}`} <span aria-hidden="true">→</span>
                </a>
              </div>
            )}

            {isLastStep && !FORMS_ENABLED && (
              <p className={styles.formsOff}>
                Online requests aren&rsquo;t switched on yet — call <a href={PHONE_URL}>{LOCATION.contact.phoneDisplay}</a> or
                email <a href={EMAIL_URL}>{LOCATION.contact.email}</a> with your build details.
              </p>
            )}

            {/* ── Nav ── */}
            <div className={styles.nav}>
              {step > 1 ? (
                <button type="button" onClick={goBack} className={styles.backBtn}>
                  <span aria-hidden="true">←</span> Back
                </button>
              ) : <span />}
              <button type="button" onClick={goNext} className={styles.nextBtn} disabled={status === 'submitting' || (isLastStep && !FORMS_ENABLED)}>
                {isLastStep ? (status === 'submitting' ? 'Sending…' : !FORMS_ENABLED ? 'Requests Coming Soon' : status === 'error' ? 'Try Again' : 'Submit Request') : 'Next'}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
