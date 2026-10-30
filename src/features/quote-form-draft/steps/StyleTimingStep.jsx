import styles from '../QuoteForm.module.css';
import { STYLES, TIMELINES } from '../quoteFormData';

export default function StyleTimingStep({ form }) {
  const { data, errors, setField } = form;

  return (
    <div>
      <h3 className={styles.question}>What direction are you thinking?</h3>
      <p className={styles.supportCopy}>Pick the finish that&rsquo;s closest to your vision.</p>
      <div className={styles.chipRow}>
        {STYLES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`${styles.chip} ${data.style === id ? styles.chipSelected : ''}`}
            onClick={() => setField('style', id)}
            aria-pressed={data.style === id}
          >
            {label}
          </button>
        ))}
      </div>
      {errors.style && <p className={styles.errorText}>{errors.style}</p>}

      <h3 className={`${styles.question} ${styles.questionSecondary}`}>When would you like to start?</h3>
      <div className={styles.timelineList}>
        {TIMELINES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`${styles.timelineOption} ${data.timeline === id ? styles.timelineOptionSelected : ''}`}
            onClick={() => setField('timeline', id)}
            aria-pressed={data.timeline === id}
          >
            {label}
          </button>
        ))}
      </div>
      {errors.timeline && <p className={styles.errorText}>{errors.timeline}</p>}
    </div>
  );
}
