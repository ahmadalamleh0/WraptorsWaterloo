export interface EngineStepProps {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
}

export function EngineStep({ options, selected, onSelect }: EngineStepProps) {
  return (
    <>
      <p className="cfg-step-label">Select Engine</p>
      <div className="cfg-options">
        {options.length === 0 && <p className="cfg-step-label">No options available.</p>}
        {options.map((item) => {
          const isSelected = selected === item;
          return (
            <button
              key={item}
              className={`cfg-option${isSelected ? ' selected' : ''}`}
              data-key="engine"
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
