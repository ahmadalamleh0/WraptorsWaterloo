import styles from '../QuoteForm.module.css';
import { SERVICES, VEHICLE_TYPES, COVERAGE_STAGES, STYLES, TIMELINES } from '../quoteFormData';

function labelFor(list, id) {
  return list.find((item) => item.id === id)?.label ?? '—';
}

function ReviewRow({ label, value, onEdit }) {
  return (
    <div className={styles.reviewRow}>
      <div className={styles.reviewRowText}>
        <p className={styles.reviewKey}>{label}</p>
        <p className={styles.reviewValue}>{value}</p>
      </div>
      <button type="button" className={styles.editLink} onClick={onEdit}>Edit</button>
    </div>
  );
}

export default function ReviewStep({ form, onEdit }) {
  const { data, isOnline, submitting, submitted, submit, startOver } = form;

  if (submitted) {
    return (
      <div className={styles.successState}>
        <span className={styles.successIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
            <path d="M4 12.5 9.5 18 20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className={styles.successHeading}>Your Build Starts Here.</h3>
        <p className={styles.successText}>
          Thanks — the Wraptors team will review your project and reach out shortly.
        </p>
        <button type="button" className={styles.startOverButton} onClick={startOver}>
          Start Over
        </button>
      </div>
    );
  }

  const serviceLabels = data.services.map((id) => labelFor(SERVICES, id)).join(', ') || '—';
  const vehicleLine = [data.vehicle.year, data.vehicle.make, data.vehicle.model].filter(Boolean).join(' ') || '—';

  return (
    <div>
      <h3 className={styles.question}>Review your build</h3>
      <p className={styles.supportCopy}>Check everything below — you can edit any answer before sending.</p>

      <div className={styles.reviewList}>
        <ReviewRow label="Services" value={serviceLabels} onEdit={() => onEdit(1)} />
        <ReviewRow
          label="Vehicle"
          value={`${vehicleLine} — ${labelFor(VEHICLE_TYPES, data.vehicle.type)}`}
          onEdit={() => onEdit(2)}
        />
        <ReviewRow label="Coverage" value={labelFor(COVERAGE_STAGES, data.coverage)} onEdit={() => onEdit(3)} />
        <ReviewRow label="Style" value={labelFor(STYLES, data.style)} onEdit={() => onEdit(4)} />
        <ReviewRow label="Timeline" value={labelFor(TIMELINES, data.timeline)} onEdit={() => onEdit(4)} />
        <ReviewRow
          label="Contact"
          value={`${data.contact.name} · ${data.contact.phone} · ${data.contact.email} · ${data.contact.city}`}
          onEdit={() => onEdit(5)}
        />
        {data.contact.notes && <ReviewRow label="Notes" value={data.contact.notes} onEdit={() => onEdit(5)} />}
      </div>

      {!isOnline && (
        <p className={styles.offlineBanner}>
          You&rsquo;re offline. Your answers are saved—reconnect to submit your request.
        </p>
      )}

      <button
        type="button"
        className={styles.submitButton}
        onClick={submit}
        disabled={submitting || !isOnline}
      >
        {submitting ? 'Submitting…' : 'Request My Quote'}
      </button>
    </div>
  );
}
