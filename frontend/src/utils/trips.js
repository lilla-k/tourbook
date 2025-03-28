import countries from '../countries.min.js';

function getContinent(country) {
    return countries.find(c => (c.properties.name === country)).properties.continent;
}

export function getVisitedCountries(trips) {
    const visitedCountries = trips.map(trip => trip.country);
    return [...new Set(visitedCountries)]
}

export function getVisitedContinents(trips) {
    const visitedCountries = getVisitedCountries(trips)
    const visitedContinents = [];
    visitedCountries.forEach(visitedCountry => {
        const continent = getContinent(visitedCountry);
        console.log(continent)
        visitedContinents.push(continent);
    });
    console.log(visitedContinents)
    return [...new Set(visitedContinents)]
}