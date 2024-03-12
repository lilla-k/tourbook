import { useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import tripTypes from '../../tripTypes.js';
import countries from '../../countries.js';
import './NewTripForm.css';

function NewTripForm() {

    const navigate = useNavigate();
    const countriesArray = countries.map(country => country.name).sort();
    const tripTypeArray = Object.keys(tripTypes);

    const [trips, setTrips] = useOutletContext();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [country, setCountry] = useState(null);
    const [countryInformation, setCountryInformation] = useState("");
    const [tripExperience, setTripExperience] = useState("");
    const [tripType, setTripType] = useState("");

    async function postTripData() {
        const tripData = {
            startDate: startDate,
            endDate: endDate,
            country: country,
            tripType: tripType,
            images: [{ url: "/images/Jordan/1_Amman_citadel.jpg", title: "Amman_citadel", cover: false }, { url: "/images/Jordan/2_Petra_rosecity.jpg", title: "Petra_rosecity", cover: true }],
            countryInformation: countryInformation,
            tripExperience: tripExperience
        }
        const response = await fetch("http://localhost:3001/api/trips", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tripData)
        })
        if (response.status === 201) {
            const tripIdObj = await response.json();
            const pushNewTrip = () => {
                const newTrip = { ...tripIdObj, ...postTripData };
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
            <div className="NewTripForm-form">
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
                    renderInput={(params) => <TextField {...params} label="Country" />}
                />
                <FormControl className="NewTripForm-typeSelector">
                    <InputLabel>Trip type</InputLabel>
                    <Select
                        value={tripType}
                        label="Trip type"
                        onChange={(event) => setTripType(event.target.value)}
                    >
                        <MenuItem value={tripTypeArray[0]}>{tripTypeArray[0]}</MenuItem>
                        <MenuItem value={tripTypeArray[1]}>{tripTypeArray[1]}</MenuItem>
                        <MenuItem value={tripTypeArray[2]}>{tripTypeArray[2]}</MenuItem>
                        <MenuItem value={tripTypeArray[3]}>{tripTypeArray[3]}</MenuItem>
                    </Select>
                </FormControl>
                <div className="NewTripForm-countryInformation">
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
        </div>
    )
}

export default NewTripForm;