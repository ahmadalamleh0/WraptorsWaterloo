import styles from './QuoteForm.module.css';
import { TOTAL_STEPS } from './quoteFormData';

export default function StepIndicator({ step }) {
  const percent = (step / TOTAL_STEPS) * 100;
  return (
    <div className={styles.stepIndicator}>
      <span className={styles.stepIndicatorLabel}>
        {String(step).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')}
      </span>
      <div className={styles.stepIndicatorTrack}>
        <div className={styles.stepIndicatorFill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
