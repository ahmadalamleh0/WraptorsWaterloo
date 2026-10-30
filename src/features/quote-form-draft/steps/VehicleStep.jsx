import styles from '../QuoteForm.module.css';
import OptionCard from '../OptionCard';
import { VEHICLE_TYPES } from '../quoteFormData';

export default function VehicleStep({ form }) {
  const { data, errors, updateVehicle } = form;
  const { vehicle } = data;

  return (
    <div>
      <h3 className={styles.question}>What are we working with?</h3>
      <p className={styles.supportCopy}>Pick the closest match, then fill in the details.</p>

      <div className={styles.cardGrid}>
        {VEHICLE_TYPES.map(({ id, label, icon: Icon }) => (
          <OptionCard
            key={id}
            Icon={Icon}
            label={label}
            selected={vehicle.type === id}
            onClick={() => updateVehicle({ type: id })}
          />
        ))}
      </div>
      {errors.type && <p className={styles.errorText}>{errors.type}</p>}

      <div className={styles.fieldRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="qf-year">Year</label>
          <input
            id="qf-year"
            className={`${styles.input} ${errors.year ? styles.inputError : ''}`}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="2024"
            maxLength={4}
            value={vehicle.year}
            onChange={(e) => updateVehicle({ year: e.target.value.replace(/[^0-9]/g, '') })}
          />
          {errors.year && <p className={styles.errorText}>{errors.year}</p>}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="qf-make">Make</label>
          <input
            id="qf-make"
            className={`${styles.input} ${errors.make ? styles.inputError : ''}`}
            type="text"
            autoComplete="off"
            placeholder="e.g. BMW"
            value={vehicle.make}
            onChange={(e) => updateVehicle({ make: e.target.value })}
          />
          {errors.make && <p className={styles.errorText}>{errors.make}</p>}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="qf-model">Model</label>
          <input
            id="qf-model"
            className={`${styles.input} ${errors.model ? styles.inputError : ''}`}
            type="text"
            autoComplete="off"
            placeholder="e.g. M4"
            value={vehicle.model}
            onChange={(e) => updateVehicle({ model: e.target.value })}
          />
          {errors.model && <p className={styles.errorText}>{errors.model}</p>}
        </div>
      </div>
    </div>
  );
}
