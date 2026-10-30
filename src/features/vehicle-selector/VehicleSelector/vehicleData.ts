import type { VehicleData } from './types';

// Ported verbatim from the original site's main_v2.js CONFIGURATOR module,
// then expanded to five models per brand (concept-demo catalog only — no
// images, descriptions, pricing, or extra UI attached to these entries).
export const VEHICLE_DATA: VehicleData = {
  BMW: {
    models: [
      { name: 'M2', engine: '3.0L S58 Inline-6 Twin-Turbo', year: '2024' },
      { name: 'M3', engine: '3.0L S58 Inline-6 Twin-Turbo', year: '2024' },
      { name: 'M4', engine: '3.0L S58 Inline-6 Twin-Turbo', year: '2024' },
      { name: 'M5', engine: '4.4L S63 V8 Twin-Turbo', year: '2024' },
      { name: 'X5 M', engine: '4.4L S63 V8 Twin-Turbo', year: '2024' },
    ],
  },
  Porsche: {
    models: [
      { name: '911 Carrera', engine: '3.0L Flat-6 Twin-Turbo', year: '2024' },
      { name: '911 Turbo S', engine: '3.8L Flat-6 Twin-Turbo', year: '2024' },
      { name: '718 Cayman', engine: '2.0L Flat-4 Turbo', year: '2024' },
      { name: 'Cayenne', engine: '3.0L V6 Turbo', year: '2024' },
      { name: 'Panamera', engine: '2.9L V6 Twin-Turbo', year: '2024' },
    ],
  },
  'Mercedes-Benz': {
    models: [
      { name: 'C 63', engine: '2.0L M139 Inline-4 Turbo Hybrid', year: '2024' },
      { name: 'E 63', engine: '4.0L M177 V8 Biturbo', year: '2024' },
      { name: 'GT 63', engine: '4.0L M177 V8 Biturbo', year: '2024' },
      { name: 'AMG GT', engine: '4.0L M178 V8 Biturbo', year: '2024' },
      { name: 'G 63', engine: '4.0L M177 V8 Biturbo', year: '2024' },
    ],
  },
  Lamborghini: {
    models: [
      { name: 'Huracán', engine: '5.2L V10 Naturally Aspirated', year: '2023' },
      { name: 'Revuelto', engine: '6.5L V12 Hybrid HPEV', year: '2024' },
      { name: 'Urus', engine: '4.0L V8 Twin-Turbo', year: '2024' },
      { name: 'Aventador', engine: '6.5L V12 Naturally Aspirated', year: '2022' },
      { name: 'Temerario', engine: '4.0L V8 Twin-Turbo Hybrid', year: '2025' },
    ],
  },
  Audi: {
    models: [
      { name: 'RS 3', engine: '2.5L Inline-5 Turbo', year: '2024' },
      { name: 'RS 5', engine: '2.9L V6 Twin-Turbo', year: '2024' },
      { name: 'RS 6 Avant', engine: '4.0L V8 TFSI Biturbo', year: '2024' },
      { name: 'RS 7', engine: '4.0L V8 TFSI Biturbo', year: '2024' },
      { name: 'R8', engine: '5.2L V10 FSI', year: '2023' },
    ],
  },
  Chevrolet: {
    models: [
      { name: 'Corvette Stingray', engine: '6.2L LT2 V8 Naturally Aspirated', year: '2024' },
      { name: 'Corvette Z06', engine: '5.5L LT6 V8 Flat-Plane', year: '2024' },
      { name: 'Camaro SS', engine: '6.2L LT1 V8 Naturally Aspirated', year: '2023' },
      { name: 'Camaro ZL1', engine: '6.2L LT4 Supercharged V8', year: '2024' },
      { name: 'Tahoe', engine: '5.3L V8', year: '2024' },
    ],
  },
  Ford: {
    models: [
      { name: 'Mustang GT', engine: '5.0L Coyote V8', year: '2024' },
      { name: 'Mustang Dark Horse', engine: '5.0L Coyote V8', year: '2024' },
      { name: 'Shelby GT500', engine: '5.2L Predator Supercharged V8', year: '2023' },
      { name: 'F-150 Raptor', engine: '3.5L EcoBoost V6 Twin-Turbo', year: '2024' },
      { name: 'Bronco', engine: '2.7L EcoBoost V6 Twin-Turbo', year: '2024' },
    ],
  },
  Dodge: {
    models: [
      { name: 'Challenger Hellcat', engine: '6.2L Supercharged HEMI V8', year: '2023' },
      { name: 'Charger Hellcat', engine: '6.2L Supercharged HEMI V8', year: '2023' },
      { name: 'Durango SRT', engine: '6.4L HEMI V8', year: '2023' },
      { name: 'RAM 1500 TRX', engine: '6.2L Supercharged HEMI V8', year: '2023' },
      { name: 'Viper', engine: '8.4L V10 Naturally Aspirated', year: '2017' },
    ],
  },
  McLaren: {
    models: [
      { name: 'Artura', engine: '3.0L V6 Twin-Turbo Hybrid', year: '2024' },
      { name: '570S', engine: '3.8L V8 Twin-Turbo', year: '2019' },
      { name: '720S', engine: '4.0L V8 Twin-Turbo', year: '2023' },
      { name: '750S', engine: '4.0L M840T V8 Twin-Turbo', year: '2024' },
      { name: '765LT', engine: '4.0L M840TE V8 Twin-Turbo', year: '2022' },
    ],
  },
  Nissan: {
    models: [
      { name: 'GT-R', engine: '3.8L VR38DETT V6 Twin-Turbo', year: '2024' },
      { name: 'Z', engine: '3.0L VR30DDTT V6 Twin-Turbo', year: '2024' },
      { name: '370Z', engine: '3.7L VQ37VHR V6 Naturally Aspirated', year: '2020' },
      { name: '350Z', engine: '3.5L VQ35DE V6 Naturally Aspirated', year: '2006' },
      { name: 'Skyline GT-R', engine: '2.6L RB26DETT Inline-6 Twin-Turbo', year: '1999' },
    ],
  },
  Toyota: {
    models: [
      { name: 'GR Supra', engine: '3.0L B58 Inline-6 Turbo', year: '2024' },
      { name: 'GR Corolla', engine: '1.6L G16E-GTS Inline-3 Turbo AWD', year: '2024' },
      { name: 'GR86', engine: '2.4L Flat-4 Naturally Aspirated', year: '2024' },
      { name: 'Land Cruiser', engine: '2.4L Turbo Hybrid Inline-4', year: '2024' },
      { name: 'Tundra', engine: '3.4L Twin-Turbo V6 Hybrid', year: '2024' },
    ],
  },
  Subaru: {
    models: [
      { name: 'WRX', engine: '2.4L FA24 Turbo Boxer-4', year: '2024' },
      { name: 'WRX STI', engine: '2.5L EJ25 Turbo Boxer-4', year: '2021' },
      { name: 'BRZ', engine: '2.4L Naturally Aspirated Boxer-4', year: '2024' },
      { name: 'Forester XT', engine: '2.0L Turbo Boxer-4', year: '2018' },
      { name: 'Crosstrek', engine: '2.5L Naturally Aspirated Boxer-4', year: '2024' },
    ],
  },
};

// Brand → logo asset filename, matching the original config-card markup.
export const BRAND_LOGOS: Record<string, string> = {
  BMW: 'bmw.svg',
  Porsche: 'porsche.svg',
  'Mercedes-Benz': 'amg.svg',
  Lamborghini: 'lamborghini.svg',
  Audi: 'audi.svg',
  Chevrolet: 'chevrolet.svg',
  Ford: 'ford.svg',
  Dodge: 'dodge-4.svg',
  McLaren: 'mclaren.svg',
  Nissan: 'nissan.svg',
  Toyota: 'toyota.svg',
  Subaru: 'subaru.svg',
};

// Display order of brand cards in the manufacturer grid.
export const BRAND_ORDER: string[] = [
  'BMW',
  'Porsche',
  'Mercedes-Benz',
  'Lamborghini',
  'Audi',
  'Chevrolet',
  'Ford',
  'Dodge',
  'McLaren',
  'Nissan',
  'Toyota',
  'Subaru',
];
