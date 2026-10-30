import MediaPlaceholder from './MediaPlaceholder';
import styles from './Timeline.module.css';

const MILESTONES = [
  {
    id: 'toronto',
    year: '2013',
    title: 'Toronto Roots',
    copy: 'Born in the garage culture of Toronto. One installer, one vision: to make every vehicle impossible to ignore.',
    mediaLabel: 'Toronto Origins — Shop / Lifestyle Placeholder',
  },
  {
    id: 'mississauga',
    year: '2016',
    title: 'Mississauga HQ',
    copy: 'The flagship facility opens. Full-service customization at a scale the Canadian market had never seen.',
    mediaLabel: 'Mississauga HQ — Shop Interior Placeholder',
  },
  {
    id: 'canada',
    year: '2018',
    title: 'Canadian Expansion',
    copy: 'Vaughan, Ottawa, Whitby, Hamilton, Calgary, Waterloo, Vancouver, Barrie, Kingston, Oakville. One standard, coast to coast.',
    mediaLabel: 'Canada Expansion — Location Montage Placeholder',
  },
  {
    id: 'usa',
    year: '2022',
    title: 'USA Growth',
    copy: 'Fort Lauderdale and Orlando open their doors. The Wraptors standard crosses the border.',
    mediaLabel: 'Fort Lauderdale / Orlando — Shop Lifestyle Placeholder',
  },
  {
    id: 'capetown',
    year: '2024',
    title: 'Cape Town',
    copy: 'Africa enters the empire. Cape Town becomes the most ambitious location yet.',
    mediaLabel: 'Cape Town — City / Shop Lifestyle Placeholder',
  },
  {
    id: 'next',
    year: 'NEXT',
    title: 'Next Era',
    copy: 'The empire is not finished expanding. New locations, new standards, new territory.',
    mediaLabel: null,
    isNext: true,
  },
];

export default function Timeline() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <span className="section-label">The Empire Story</span>
          <h2 className={styles.title}>
            BUILT IN MISSISSAUGA.<br />
            <span className="chrome-text">EXPANDED ACROSS THE WORLD.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {/* Vertical spine */}
          <div className={styles.spine} />

          {MILESTONES.map((m, i) => (
            <div
              key={m.id}
              className={`${styles.item} ${i % 2 === 0 ? styles.itemLeft : styles.itemRight}`}
            >
              {/* Node on the spine */}
              <div className={styles.node}>
                <div className={`${styles.nodeDot} ${m.isNext ? styles.nodeDotNext : ''}`} />
                <span className={styles.nodeYear}>{m.year}</span>
              </div>

              {/* Content card */}
              <div className={styles.card}>
                {!m.isNext && m.mediaLabel && (
                  <div className={styles.cardMedia}>
                    {/* REPLACE: swap with real shop/lifestyle/city photo */}
                    <MediaPlaceholder
                      label={m.mediaLabel}
                      showPlay={false}
                      style={{ minHeight: 160 }}
                    />
                  </div>
                )}
                <div className={styles.cardBody}>
                  <h3 className={`${styles.cardTitle} ${m.isNext ? styles.cardTitleNext : ''}`}>
                    {m.title}
                  </h3>
                  <p className={styles.cardCopy}>{m.copy}</p>
                </div>
                {m.isNext && (
                  <div className={styles.nextPulse} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
