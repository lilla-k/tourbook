import countries from '../countries.js';


export function findCountryPosition(country) {
    const countryObj = countries.find(c => c.properties.name === country);
    const coordinateObj = { lat: countryObj.properties.label_y, lng: countryObj.properties.label_x };
    return coordinateObj;
}

export function findCountryBorders(country){
  const countryObj = countries.find(c => c.properties.name === country);
  const depth = countryObj.geometry.coordinates[0][0][0][0] === undefined ? 2 : 3;
  const coordinatesArray = depth === 3 ? countryObj.geometry.coordinates[0]: countryObj.geometry.coordinates;
  const coordinateObjectsArray = coordinatesArray.map(a=>a.map(coorinateArray=> ({lat: coorinateArray[1], lng: coorinateArray[0]})));
  return coordinateObjectsArray;
}

export const countryNames = countries.map(c=>c.properties.name).sort();

export function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    console.log(lat1,lon1,lat2,lon2)
    var R = 6371; 
    var dLat = deg2rad(lat2-lat1);  
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  
