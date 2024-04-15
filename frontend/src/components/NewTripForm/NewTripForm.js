import { useState } from 'react';
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
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
import tripService from '../../services/tripService.js'

function NewTripForm() {

    const navigate = useNavigate();
    const countriesArray = countries.map(country => country.name).sort();
    const tripTypeArray = Object.keys(tripTypes);
    const { tripId } = useParams();
    const {trips, setTrips, setToaster} = useOutletContext();
    const selectedTrip = trips.find(trip => trip.id === tripId);
    const [startDate, setStartDate] = useState(tripId ? selectedTrip.startDate : "");
    const [endDate, setEndDate] = useState(tripId ? selectedTrip.endDate : "");
    const [country, setCountry] = useState(tripId ? selectedTrip.country : null);
    const [countryInformation, setCountryInformation] = useState(tripId ? selectedTrip.countryInformation : "");
    const [tripExperience, setTripExperience] = useState(tripId ? selectedTrip.tripExperience : "");
    const [tripType, setTripType] = useState(tripId ? selectedTrip.tripType : "");

    const tripData = {
        startDate: startDate,
        endDate: endDate,
        country: country,
        tripType: tripType,
        images: [],
        countryInformation: countryInformation,
        tripExperience: tripExperience,
        visitedCities: []
    }

    async function postTripData() {
        const id = await tripService.postTrip(tripData);
        setToaster("successfully created");
        const trips = await tripService.getTrips();
        setTrips(trips);
        navigate(`/trips/${id}`);
    }

    async function editTripData() {
        delete tripData.visitedCities;
        await tripService.updateTrip(tripId, tripData);
        setToaster("successfully updated");
        const trips = await tripService.getTrips();
        setTrips(trips);
        navigate(`/trips/${tripId}`);
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
                    <Button variant="outlined" onClick={tripId ? () => editTripData() : () => postTripData()}>{tripId ? "Save" : "Add"}</Button>
                </div>
            </div>
        </div>
    )
}

export default NewTripForm;