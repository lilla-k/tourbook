import countries from '../countries.min.js';
import type Country from '../types/country.js';

export function findCountryPosition(country: string) {
  const countryObj = getCountry(country);
  const coordinateObj = { lat: countryObj.properties.label_y, lng: countryObj.properties.label_x };
  return coordinateObj;
}

export function findCountryBorders(country: string) {
  const countryObj = getCountry(country);
  const coordinatesArray = mergeCountryArrays(countryObj);
  const coordinateObjectsArray = coordinatesArray.map((a) => a.map((coorinateArray) => ({ lat: coorinateArray[1], lng: coorinateArray[0] })));
  return coordinateObjectsArray;
}

export function getCountry(country: string) {
  const countryObj = countries.find((c) => c.properties.name === country);
  if (countryObj === undefined) {
    throw new Error('unknown country');
  }
  return countryObj;
}

function mergeCountryArrays(country: Country) {
  if (Array.isArray(country.geometry.coordinates[0][0][0])) {
    return ([] as number[][][]).concat(...country.geometry.coordinates);
  }
  return country.geometry.coordinates;
}

export const countryNames = countries.map((c) => c.properties.name).sort();

export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
