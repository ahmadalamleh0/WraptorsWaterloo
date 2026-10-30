import type { MouseEvent } from 'react';

export interface ManufacturerStepProps {
  brands: string[];
  logoSrc: (brand: string) => string;
  onSelect: (brand: string) => void;
}

// Spotlight-on-hover effect, ported 1:1 from the original mousemove listener
// that set --mx/--my custom properties consumed by .config-card::before in styles.css.
function handleCardMouseMove(e: MouseEvent<HTMLButtonElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
  card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
}

export function ManufacturerStep({ brands, logoSrc, onSelect }: ManufacturerStepProps) {
  return (
    <div className="configurator__panel">
      <div className="configurator__grid">
        {brands.map((brand) => (
          <button
            key={brand}
            className="config-card"
            data-brand={brand}
            onMouseMove={handleCardMouseMove}
            onClick={() => onSelect(brand)}
          >
            <div className="config-card__logo">
              <img src={logoSrc(brand)} alt={brand} />
            </div>
            <span className="config-card__name">{brand}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
