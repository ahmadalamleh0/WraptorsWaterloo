import styles from '../QuoteForm.module.css';
import { COVERAGE_STAGES } from '../quoteFormData';

export default function CoverageStep({ form }) {
  const { data, setField } = form;
  const activeIndex = Math.max(0, COVERAGE_STAGES.findIndex((s) => s.id === data.coverage));
  const active = COVERAGE_STAGES[activeIndex];
  const lastIndex = COVERAGE_STAGES.length - 1;
  const fillPercent = (activeIndex / lastIndex) * 100;

  return (
    <div>
      <h3 className={styles.question}>How far are we taking it?</h3>
      <p className={styles.supportCopy}>Best guess is fine — we&rsquo;ll confirm the details with you.</p>

      <div className={styles.coveragePanel}>
        <p className={styles.coverageLabel}>{active.label}</p>
        <p className={styles.coverageDescription}>{active.description}</p>

        <div className={styles.coverageTrack} role="group" aria-label="Coverage level">
          <div className={styles.coverageTrackBase} aria-hidden="true" />
          <div className={styles.coverageTrackFill} style={{ width: `${fillPercent}%` }} aria-hidden="true" />
          {COVERAGE_STAGES.map((stage, i) => (
            <button
              key={stage.id}
              type="button"
              className={`${styles.coverageStop} ${i === activeIndex ? styles.coverageStopActive : ''}`}
              style={{ left: `${(i / lastIndex) * 100}%` }}
              onClick={() => setField('coverage', stage.id)}
              aria-pressed={i === activeIndex}
              aria-label={stage.label}
            />
          ))}
        </div>

        <div className={styles.coverageStopLabels}>
          {COVERAGE_STAGES.map((stage) => (
            <span key={stage.id} className={styles.coverageStopLabelText}>{stage.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
