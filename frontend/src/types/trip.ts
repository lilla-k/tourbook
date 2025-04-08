import type Image from './image.ts';
import type City from './city.ts';

export type Trip = {
  country: string;
  startDate: Date;
  endDate: Date;
  countryInformation?: string;
  coverImageId?: string;
  images: Image[];
  tripExperience?: string;
  tripType?: string;
  rating?: number;
  id: string;
  visitedCities?: City[];
};

export type TripDatabaseObject = {
  country: string;
  startDate: string;
  endDate: string;
  countryInformation?: string;
  coverImageId?: string;
  images?: Image[];
  tripExperience?: string;
  tripType?: string;
  rating?: number;
  id: string;
  visitedCities?: City[];
};
