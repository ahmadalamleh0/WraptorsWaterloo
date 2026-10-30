import styles from './QuoteForm.module.css';

export default function OptionCard({ Icon, label, selected, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.optionCard} ${selected ? styles.optionCardSelected : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className={styles.optionIcon} aria-hidden="true">
        <Icon />
      </span>
      <span className={styles.optionLabel}>{label}</span>
      <span className={styles.optionCheck} aria-hidden="true">
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
          <path d="M3 8.5 6.2 12 13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}
