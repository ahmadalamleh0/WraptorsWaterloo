import styles from './PressCards.module.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatMonth = (ym) => {
  if (!ym) return null;
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};

// Compact editorial cards for external press coverage (src/data/press.js).
// Each card opens the original article on the publisher's site; the label
// shows when the publisher identifies a piece as a press release,
// syndicated or contributor content.
export default function PressCards({ items }) {
  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
            {item.thumb && (
              <div className={styles.thumbWrap}>
                <img src={item.thumb} alt="" className={styles.thumb} loading="lazy" decoding="async" />
              </div>
            )}
            <div className={styles.body}>
              <span className={styles.meta}>
                {item.publisher}
                {item.date && <> · {formatMonth(item.date)}</>}
              </span>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.footer}>
                {item.label && <span className={styles.label}>{item.label}</span>}
                <span className={styles.read}>
                  Read on {item.publisher} <span aria-hidden="true">↗</span>
                </span>
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
