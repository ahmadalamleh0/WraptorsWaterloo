import styles from '../QuoteForm.module.css';

export default function ContactStep({ form }) {
  const { data, errors, updateContact } = form;
  const { contact } = data;

  return (
    <div>
      <h3 className={styles.question}>Where should we reach you?</h3>
      <p className={styles.supportCopy}>We&rsquo;ll use this to send your tailored recommendation.</p>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="qf-name">Full Name</label>
        <input
          id="qf-name"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          value={contact.name}
          onChange={(e) => updateContact({ name: e.target.value })}
        />
        {errors.name && <p className={styles.errorText}>{errors.name}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="qf-phone">Phone Number</label>
        <input
          id="qf-phone"
          className={`${styles.input} ${styles.inputImportant} ${errors.phone ? styles.inputError : ''}`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(555) 123-4567"
          value={contact.phone}
          onChange={(e) => updateContact({ phone: e.target.value })}
        />
        {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="qf-email">Email Address</label>
        <input
          id="qf-email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={contact.email}
          onChange={(e) => updateContact({ email: e.target.value })}
        />
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="qf-city">City</label>
        <input
          id="qf-city"
          className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
          type="text"
          autoComplete="address-level2"
          placeholder="Your city"
          value={contact.city}
          onChange={(e) => updateContact({ city: e.target.value })}
        />
        {errors.city && <p className={styles.errorText}>{errors.city}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="qf-notes">
          Project Notes <span className={styles.optionalTag}>(optional)</span>
        </label>
        <textarea
          id="qf-notes"
          className={styles.textarea}
          rows={3}
          placeholder="Anything else we should know?"
          value={contact.notes}
          onChange={(e) => updateContact({ notes: e.target.value })}
        />
      </div>
    </div>
  );
}
