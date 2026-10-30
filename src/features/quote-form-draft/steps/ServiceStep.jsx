import styles from '../QuoteForm.module.css';
import OptionCard from '../OptionCard';
import { SERVICES } from '../quoteFormData';

export default function ServiceStep({ form }) {
  const { data, errors, toggleService } = form;
  return (
    <div>
      <h3 className={styles.question}>What are you looking to transform?</h3>
      <p className={styles.supportCopy}>Select everything you&rsquo;re interested in.</p>
      <div className={styles.cardGrid}>
        {SERVICES.map(({ id, label, icon: Icon }) => (
          <OptionCard
            key={id}
            Icon={Icon}
            label={label}
            selected={data.services.includes(id)}
            onClick={() => toggleService(id)}
          />
        ))}
      </div>
      {errors.services && <p className={styles.errorText}>{errors.services}</p>}
    </div>
  );
}
