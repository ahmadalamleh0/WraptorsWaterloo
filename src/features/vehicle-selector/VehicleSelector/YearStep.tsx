export interface YearStepProps {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
}

export function YearStep({ options, selected, onSelect }: YearStepProps) {
  return (
    <>
      <p className="cfg-step-label">Select Year</p>
      <div className="cfg-options">
        {options.length === 0 && <p className="cfg-step-label">No options available.</p>}
        {options.map((item) => {
          const isSelected = selected === item;
          return (
            <button
              key={item}
              className={`cfg-option${isSelected ? ' selected' : ''}`}
              data-key="year"
              data-val={item}
              onClick={() => onSelect(item)}
            >
              <span className="cfg-option__label">{item}</span>
              <span className="cfg-option__check">
                {isSelected && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
