import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './YoutubeReel.module.css';
import { YOUTUBE_VIDEOS, YOUTUBE_CHANNEL_URL } from '../data/youtubeVideos';

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M3 2l9 5-9 5V2z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M3.5 11.5L11.5 3.5M11.5 3.5H5.5M11.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Card starts as a lightweight <img> thumbnail — the YouTube iframe is only
// created once the user actually clicks play, so nothing near this section
// costs a real video request on page load.
function ReelCard({ video, isActive, cardRef }) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <div ref={cardRef} data-video-id={video.id} className={`${styles.card} ${isActive ? styles.cardActive : ''}`}>
      <div
        className={styles.mediaWrap}
        role={playing ? undefined : 'button'}
        tabIndex={playing ? undefined : 0}
        aria-label={playing ? undefined : `Play ${video.title}`}
        onClick={() => !playing && setPlaying(true)}
        onKeyDown={(e) => {
          if (!playing && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setPlaying(true); }
        }}
      >
        {playing ? (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
              alt={video.title}
              className={styles.thumb}
              loading="lazy"
              draggable={false}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
              }}
            />
            <div className={styles.thumbOverlay} aria-hidden="true" />
            <span className={styles.playBtn} aria-hidden="true"><PlayIcon /></span>
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalBtn}
              aria-label={`Open ${video.title} on YouTube`}
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowIcon />
            </a>
            <div className={styles.cardInfo}>
              <span className={styles.cardTitle}>{video.title}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function YoutubeReel() {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeId, setActiveId] = useState(YOUTUBE_VIDEOS[0].id);
  const dragRef = useRef({ dragging: false, startX: 0, startScroll: 0, moved: false });

  // Whichever card sits in the centered ~40% band of the track counts as
  // "active" — no manual scroll-position math needed.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const entry of entries) {
          if (entry.isIntersecting && (!best || entry.intersectionRatio > best.intersectionRatio)) best = entry;
        }
        if (best) setActiveId(best.target.dataset.videoId);
      },
      { root: track, threshold: [0.3, 0.5, 0.7, 0.9], rootMargin: '0px -30% 0px -30%' }
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Click-and-drag scrolling for mouse users — touch/trackpad already scroll
  // natively. A drag that actually moved the track suppresses the click that
  // follows, so releasing the mouse over a card never accidentally plays it.
  const onPointerDown = useCallback((e) => {
    const track = trackRef.current;
    if (!track || e.pointerType === 'touch') return;
    dragRef.current = { dragging: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false };
    track.setPointerCapture(e.pointerId);
    track.classList.add(styles.dragging);
  }, []);

  const onPointerMove = useCallback((e) => {
    const st = dragRef.current;
    if (!st.dragging || !trackRef.current) return;
    const dx = e.clientX - st.startX;
    if (Math.abs(dx) > 4) st.moved = true;
    trackRef.current.scrollLeft = st.startScroll - dx;
  }, []);

  const endDrag = useCallback((e) => {
    const track = trackRef.current;
    if (dragRef.current.dragging && track) track.releasePointerCapture?.(e.pointerId);
    dragRef.current.dragging = false;
    track?.classList.remove(styles.dragging);
  }, []);

  const onClickCapture = useCallback((e) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  // Vertical mouse-wheel scroll becomes horizontal carousel movement.
  const onWheel = useCallback((e) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    track.scrollLeft += e.deltaY;
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.headRow}>
        <h2 className={styles.title}>Wraptors In Motion</h2>
        <p className={styles.sub}>Inside the builds, transformations and machines that define Wraptors.</p>
        <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className={styles.viewChannel}>
          View YouTube <span aria-hidden="true">→</span>
        </a>
      </div>

      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onWheel={onWheel}
      >
        <div className={styles.spacer} aria-hidden="true" />
        {YOUTUBE_VIDEOS.map((video, i) => (
          <ReelCard
            key={video.id}
            video={video}
            isActive={activeId === video.id}
            cardRef={(el) => { cardRefs.current[i] = el; }}
          />
        ))}
        <div className={styles.spacer} aria-hidden="true" />
      </div>
    </section>
  );
}
