import { useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import countries from '../../countries.js';
import './NewTripForm.css';

function NewTripForm() {

    const navigate = useNavigate();
    const countriesArray = countries.map(country => country.name).sort();

    const [trips, setTrips] = useOutletContext();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [country, setCountry] = useState(null);
    const [countryInformation, setCountryInformation] = useState("");
    const [tripExperience, setTripExperience] = useState("");

    async function postTripData() {
        const postTripData = {
            startDate: startDate,
            endDate: endDate,
            country: country,
            images: [{ url: "/images/Jordan/1_Amman_citadel.jpg", title: "Amman_citadel", cover: false }, { url: "/images/Jordan/2_Petra_rosecity.jpg", title: "Petra_rosecity", cover: true }],
            countryInformation: countryInformation,
            tripExperience: tripExperience
        }
        const response = await fetch("http://localhost:3001/api/trips", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postTripData)
        })
        if (response.status === 201) {
            const tripIdObj = await response.json();
            const pushNewTrip = () => {
                const newTrip = { ...tripIdObj, ...postTripData };
                console.log(trips);
                trips.push(newTrip);
                return trips;
            }
            setTrips(pushNewTrip);
            navigate(`/trips/${tripIdObj.id}`);
        }
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
                onChange={(e, selectedValue) => setCountry(selectedValue)}
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
                    onChange={e => setCountryInformation(e.target.value)}
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
                    onChange={e => setTripExperience(e.target.value)}
                />
            </div>
            <div className="NewTripForm-saveButton">
                <Button variant="outlined" onClick={() => postTripData()}>Upload your trip</Button>
            </div>
        </div>
    )
}

export default NewTripForm;