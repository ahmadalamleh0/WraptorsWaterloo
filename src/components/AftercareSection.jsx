import styles from './AftercareSection.module.css';
import { getAftercareProducts } from '../data/aftercareProducts';
import { LOCATION } from '../config/location.js';

// Shared "Don't Forget the Aftercare" section — was previously built
// inline inside PPFPage.jsx. Now data-driven (src/data/aftercareProducts.js)
// so each service page shows only the real products that genuinely apply
// to it, rather than the same three cards everywhere. Drop it onto any
// service page as <AftercareSection service="wraps" />.
export default function AftercareSection({ service }) {
  const products = getAftercareProducts(service);
  if (products.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>Aftercare</span>
          <h2 className={styles.sectionTitle}>Don&apos;t Forget the Aftercare</h2>
          <p className={styles.sectionSub}>
            Keep your protected finish looking fresh with Wraptors-approved care products.
          </p>
        </div>
      </div>

      <div className={styles.scroll}>
        <div className={styles.track}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imgWrap}>
                <img
                  src={product.img}
                  alt={product.name}
                  className={styles.img}
                  draggable={false}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.desc}>{product.desc}</p>
                <a
                  href={LOCATION.shopUrl}
                  className={styles.btn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shop Product
                  <span className={styles.btnArrow}>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
