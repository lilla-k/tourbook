import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import countries from '../../countries.js';
import './NewTripForm.css';

function NewTripForm() {

    const countriesArray = countries.map(country => country.name).sort();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [country, setCountry] = useState(null);
    const [countryInformation, setCountryInformation]= useState(null);
    const [tripExperience, setTripExperience]= useState(null);

    async function postTripData(){
        const tripData= {
            startDate: startDate,
            endDate: endDate,
            country: country,
            countryInformation: countryInformation,
            tripExperience: tripExperience
        }
        const response = await fetch ("https//localhost:3001/api", {
            method: "post",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(tripData)
        })
        console.log(response)
    }
    
    return (
        <div className="NewTripForm">
            <div className="NewTripForm-title">Information about your trip</div>
            <div className="NewTripForm-dates">
                <input
                    type="date"
                    value={startDate}
                    className="NewTripForm-start"
                    onChange={e => setStartDate(e.target.value)} />
                {startDate && <input
                    type="date"
                    value={endDate}
                    className="NewTripForm-end"
                    onChange={e => setEndDate(e.target.value)} />}
            </div>
            <Autocomplete
                className="NewTripForm-countrySelector"
                disablePortal
                options={countriesArray}
                value={country}
                onChange={e=> setCountry(e.target.value)}
                renderInput={(params) => <TextField {...params} label="Countries" />}
            />
            <div className="NewTripForm-countryInformation">
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                ></Box>
                <TextField
                    label="Country Information"
                    placeholder="eg. language, population, religion, history"
                    multiline
                    rows={4}
                    value={countryInformation}
                    onChange={e=> setCountryInformation(e.target.value)}
                />
            </div>
            <div className="NewTripForm-experience">
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                ></Box>
                <TextField
                    label="Your experience"
                    placeholder="eg. weather, unforgattable experiences"
                    multiline
                    rows={4}
                    value={tripExperience}
                    onChange={e=> setTripExperience(e.target.value)}
                />
            </div>
            <div className="NewTripForm-saveButton">
                <Button variant="outlined" onClick={()=>postTripData}>Save the trip</Button>
            </div>
        </div>
    )
}

export default NewTripForm;