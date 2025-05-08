import { getCountry } from './location.js';
import type { Trip } from '../types/trip.js';

function getContinent(country: string): string {
  const countryObj = getCountry(country);
  const { continent } = countryObj.properties;
  if (continent === undefined) {
    return continent;
  }
  return '';
}

export function getVisitedCountries(trips: Trip[]) {
  const visitedCountries = trips.map((trip) => trip.country);
  return [...new Set(visitedCountries)];
}

export function getVisitedContinents(trips: Trip[]): string[] {
  const visitedCountries = getVisitedCountries(trips);
  const visitedContinents: string[] = [];
  visitedCountries.forEach((visitedCountry) => {
    const continent = getContinent(visitedCountry);
    visitedContinents.push(continent);
  });
  return [...new Set(visitedContinents)];
}
