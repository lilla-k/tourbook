import type { Image } from './image.ts';

export type Trip = {
  country: string;
  startDate: Date;
  endDate: Date;
  countryInformation?: string;
  coverImageId?: string;
  images?: Array<Image>;
  tripExperience?: string;
  tripType?: string;
  ranking: number;
};

export type TripDatabaseObject = {
  country: string;
  startDate: string;
  endDate: string;
  countryInformation?: string;
  coverImageId?: string;
  images?: Array<Image>;
  tripExperience?: string;
  tripType?: string;
  ranking: number;
};
