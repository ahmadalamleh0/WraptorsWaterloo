/* Reusable media placeholder — swap with <video> or <img> when real assets arrive */
export default function MediaPlaceholder({ label = 'Media Placeholder', showPlay = true, style = {} }) {
  return (
    <div className="media-placeholder" style={style}>
      {/* Corner brackets */}
      <span className="mp-corner mp-tl" />
      <span className="mp-corner mp-tr" />
      <span className="mp-corner mp-bl" />
      <span className="mp-corner mp-br" />

      {showPlay && <div className="media-placeholder__play" />}
      <span className="media-placeholder__label">{label}</span>
    </div>
  );
}
