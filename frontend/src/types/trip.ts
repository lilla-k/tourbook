import type Image from './image.ts';
import type City from './city.ts';

export type Trip = {
  country: string;
  startDate: Date;
  endDate: Date;
  countryInformation?: string;
  coverImageId: string | null;
  images: Image[];
  tripExperience?: string;
  tripType: TripType;
  rating: number | null;
  id: string;
  visitedCities: City[];
};

export type TripType = 'bus' | 'flight' | 'train' | 'car';

export type TripDatabaseObject = {
  country: string;
  startDate: string;
  endDate: string;
  countryInformation?: string;
  coverImageId: string | null;
  images: Image[];
  tripExperience?: string;
  tripType: TripType;
  rating: number | null;
  id: string;
  visitedCities: City[];
};
