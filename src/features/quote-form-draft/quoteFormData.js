import {
  IconFullWrap, IconPPF, IconCeramic, IconTint, IconFleet, IconGraphics, IconStyling, IconNotSure,
  IconCoupe, IconSedan, IconSUV, IconTruck, IconExotic, IconCommercial, IconOtherVehicle,
} from './icons';

export const SERVICES = [
  { id: 'full-wrap',  label: 'Full Vehicle Wrap',        icon: IconFullWrap },
  { id: 'ppf',        label: 'Paint Protection Film',    icon: IconPPF },
  { id: 'ceramic',    label: 'Ceramic Coating',          icon: IconCeramic },
  { id: 'tint',       label: 'Window Tint',              icon: IconTint },
  { id: 'fleet',      label: 'Commercial / Fleet Wrap',  icon: IconFleet },
  { id: 'graphics',   label: 'Custom Graphics',          icon: IconGraphics },
  { id: 'styling',    label: 'Styling & Customization',  icon: IconStyling },
  { id: 'not-sure',   label: 'Not Sure Yet',             icon: IconNotSure },
];

export const VEHICLE_TYPES = [
  { id: 'coupe',      label: 'Coupe / Sports Car',   icon: IconCoupe },
  { id: 'sedan',      label: 'Sedan',                icon: IconSedan },
  { id: 'suv',        label: 'SUV',                  icon: IconSUV },
  { id: 'truck',      label: 'Truck',                icon: IconTruck },
  { id: 'exotic',     label: 'Exotic / Supercar',    icon: IconExotic },
  { id: 'commercial', label: 'Commercial Vehicle',   icon: IconCommercial },
  { id: 'other',      label: 'Other',                icon: IconOtherVehicle },
];

export const COVERAGE_STAGES = [
  {
    id: 'details',
    label: 'Details & Accents',
    description: 'Small visual changes such as trim, roof, mirrors, or individual panels.',
  },
  {
    id: 'partial',
    label: 'Partial Coverage',
    description: 'A focused transformation covering key areas of the vehicle.',
  },
  {
    id: 'full',
    label: 'Full Vehicle',
    description: 'Complete exterior coverage with one consistent finish.',
  },
  {
    id: 'complete',
    label: 'Complete Transformation',
    description: 'Wrap, protection, tint, details, and finishing work combined.',
  },
];

export const STYLES = [
  { id: 'gloss',       label: 'Gloss' },
  { id: 'satin',       label: 'Satin' },
  { id: 'matte',       label: 'Matte' },
  { id: 'color-shift', label: 'Color Shift' },
  { id: 'custom',      label: 'Custom Design' },
  { id: 'factory-look', label: 'Factory-Look Protection' },
  { id: 'not-sure',    label: 'Not Sure' },
];

export const TIMELINES = [
  { id: 'asap',       label: 'As Soon as Possible' },
  { id: '2-4-weeks',  label: 'Within 2–4 Weeks' },
  { id: '1-2-months', label: 'Within 1–2 Months' },
  { id: 'exploring',  label: 'Just Exploring' },
];

export const TOTAL_STEPS = 6;
