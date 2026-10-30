export interface VehicleModel {
  name: string;
  engine: string;
  year: string;
}

export interface BrandData {
  models: VehicleModel[];
}

export type VehicleData = Record<string, BrandData>;

export type StepIndex = 1 | 2 | 3 | 4;

export interface Selections {
  model: string | null;
  engine: string | null;
  year: string | null;
}

export interface VehicleSelection {
  brand: string;
  model: string | null;
  engine: string | null;
  year: string | null;
}

export interface BrandLogo {
  brand: string;
  src: string;
  alt: string;
}
