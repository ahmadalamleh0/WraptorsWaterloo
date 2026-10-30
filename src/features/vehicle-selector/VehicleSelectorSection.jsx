import { VehicleSelector } from './VehicleSelector';
import './VehicleSelectorSection.css';

// Temporary concept-demo section for performance shops. No backend, no real
// vehicle database, no booking logic — VehicleSelector itself is an
// unmodified drop-in (see VehicleSelector/README.md); this file only wires
// up the placeholder completion action and the font it expects the host
// project to provide. Removable by deleting this file's import + usage in
// App.jsx and this folder.
export default function VehicleSelectorSection() {
  return (
    <VehicleSelector
      onComplete={(selection) => {
        console.log('[VehicleSelector] concept demo — build selected:', selection);
      }}
    />
  );
}
