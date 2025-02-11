import fs from 'fs';
import countries from './src/countries.mjs';

const cleanedCountries = countries.map(country => ({
    properties: {
        name: country.properties.name,
        label_x: country.properties.label_x,
        label_y: country.properties.label_y,
        continent: country.properties.continent,
        wikidataid: country.properties.wikidataid,
        pop_est: country.properties.pop_est
    },
    geometry: {
        coordinates: country.geometry.coordinates
    }           
}));

fs.writeFileSync('./src/countries.min.js', `const countries = ${JSON.stringify(cleanedCountries, null, 2)};\n export default countries;`);

