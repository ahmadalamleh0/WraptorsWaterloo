export interface VehicleSummaryProps {
  brand: string;
  model: string | null;
  engine: string | null;
  year: string | null;
  note?: string;
}

const DEFAULT_NOTE = 'Your configuration will be reviewed by our engineering team within 24 hours.';

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="cfg-review__row">
      <span className="cfg-review__key">{k}</span>
      <span className="cfg-review__val">{v}</span>
    </div>
  );
}

export function VehicleSummary({ brand, model, engine, year, note = DEFAULT_NOTE }: VehicleSummaryProps) {
  return (
    <>
      <div className="cfg-review">
        <Row k="Brand" v={brand} />
        <Row k="Model" v={model || '—'} />
        <Row k="Engine" v={engine || '—'} />
        <Row k="Year" v={year || '—'} />
      </div>
      <p className="cfg-review__note">{note}</p>
    </>
  );
}
