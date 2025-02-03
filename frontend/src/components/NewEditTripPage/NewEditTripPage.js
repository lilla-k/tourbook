import { useState } from 'react';
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { getTripTypes } from '../TripTypeIcons/tripTypeIcons.js';
import {countryNames} from '../../utils/location.js';
import './NewEditTripPage.css';
import tripService from '../../services/tripService.js';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.js';


function NewEditTripPage() {

    const navigate = useNavigate();
    const tripTypeArray = getTripTypes();
    const { tripId } = useParams();
    const { trips, setTrips, setToaster, user } = useOutletContext();
    const selectedTrip = trips.find(trip => trip.id === tripId);
    const isSmallScreen = useMediaQuery('(max-width:950px)');

    const [startDate, setStartDate] = useState(tripId ? selectedTrip.startDate : null);
    const [endDate, setEndDate] = useState(tripId ? selectedTrip.endDate : null);
    const [country, setCountry] = useState(tripId ? selectedTrip.country : null);
    const [countryInformation, setCountryInformation] = useState(tripId ? selectedTrip.countryInformation : "");
    const [tripExperience, setTripExperience] = useState(tripId ? selectedTrip.tripExperience : "");
    const [tripType, setTripType] = useState(tripId ? selectedTrip.tripType : "");
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);


    const tripData = {
        startDate: startDate,
        endDate: endDate,
        country: country,
        tripType: tripType,
        images: [],
        coverImageId: null,
        countryInformation: countryInformation,
        tripExperience: tripExperience
    }

    async function postTripData() {
        const tripId = await tripService.postTrip({ ...tripData, userId: user.uid }); // TODO: get userId from context
        setToaster("successfully created");
        const trips = await tripService.getTrips(user.uid);
        setTrips(trips);
        navigate(`/trips/${tripId}`);
    }

    async function editTripData() {
        await tripService.editTrip(tripId, tripData);
        setToaster("successfully updated");
        const trips = await tripService.getTrips(user.uid);
        setTrips(trips);
        navigate(`/trips/${tripId}`);
    }

    async function deleteTrip() {
        setDeleteModalVisible(false);
        await tripService.deleteTrip(tripId);
        setToaster("successfully deleted");
        const trips = await tripService.getTrips(user.uid);
        setTrips(trips);
        navigate("/trips/");
    }

    function deleteConfirmation() {
        setDeleteModalVisible(true);
    }

    function cancelDelete() {
        setDeleteModalVisible(false);
    }

    return (
        <div className="NewEditTripPage">
            <div className="NewEditTripPage-header">
                <div className="NewEditTripPage-headerStart">
                    <div className="NewEditTripPage-arrowBackIcon">
                        <ArrowBackIcon onClick={tripId ? () => navigate(`/trips/${selectedTrip.id}`) : () => navigate("/trips/")} />
                    </div>
                    <div className="NewEditTripPage-title">{tripId ? "Edit your trip" : "Add a new trip"}</div>
                </div>
                {tripId &&
                    <Button
                        variant="outlined"
                        onClick={() => deleteConfirmation()}
                        color="error"
                        className="NewEditTripPage-deleteButton"
                    >
                        <DeleteIcon className="NewEditTripPage-deleteIcon" fontSize="small" />
                        {isSmallScreen ? "" : "DELETE"}
                    </Button>
                }
            </div>
            {deleteModalVisible && <DeleteConfirmationModal onDelete={deleteTrip} onCancel={cancelDelete} type="trip" />}
            <div className="NewEditTripPage-form">
                <div className="NewEditTripPage-dates">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start date *"
                                value={dayjs(startDate)}
                                onChange={(newDate) => setStartDate(newDate)}
                            />
                            {startDate && <DatePicker
                                label="End date *"
                                minDate = {dayjs(startDate)}
                                value={dayjs(endDate)}
                                onChange={(newDate) => setEndDate(newDate)}  
                            />}
                    </LocalizationProvider>
                </div>
                <Autocomplete
                    className="NewEditTripPage-countrySelector"
                    disablePortal
                    options={countryNames}
                    value={country}
                    onChange={(e, selectedValue) => setCountry(selectedValue)}
                    renderInput={(params) => <TextField {...params} label="Country *" />}
                />
                <FormControl className="NewEditTripPage-typeSelector">
                    <InputLabel>Trip type *</InputLabel>
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
                <div className="NewEditTripPage-experience">
                    <TextField
                        label="Your experience"
                        placeholder="eg. weather, unforgattable experiences"
                        multiline
                        rows={4}
                        value={tripExperience}
                        onChange={e => setTripExperience(e.target.value)}
                    />
                </div>
                <div className="NewEditTripPage-countryInformation">
                    <TextField
                        label="Country Information"
                        placeholder="eg. language, population, religion, history"
                        multiline
                        rows={4}
                        value={countryInformation}
                        onChange={e => setCountryInformation(e.target.value)}
                    />
                </div>
                <div className="NewEditTripPage-saveButton">
                    <Button variant="outlined"
                        onClick={tripId ? () => editTripData() : () => postTripData()}
                        disabled={startDate === null || endDate === null || country === null || tripType === ""}
                    >
                        {tripId ? "Save" : "Add"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NewEditTripPage;