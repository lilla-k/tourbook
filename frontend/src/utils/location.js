import countries from '../countries.js';


function findCountryPosition(country) {
    const countryObj = countries.find(c => c.name === country);
    const coordinateObj = { lat: countryObj.lat, lng: countryObj.lng };
    return coordinateObj;
}

export default findCountryPosition;