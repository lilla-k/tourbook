import { useState } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
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
import Rating from '@mui/material/Rating';

import { getTripTypes } from '../TripTypeIcons/tripTypeIcons.jsx';
import { countryNames } from '../../utils/location.js';
import './NewEditTripPage.css';
import tripService from '../../services/tripService.js';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.jsx';

import type { Trip } from '../../types/trip';
import type { UserData } from '../../types/user';

function NewEditTripPage() {
  const navigate = useNavigate();
  const tripTypeArray = getTripTypes();
  const { tripId } = useParams();
  const {
    trips, setTrips, setToaster, userData,
  }: {
    trips: Trip[], setTrips: Function, setToaster: Function, userData: UserData
  } = useOutletContext();
  const trip = trips.find((t) => t.id === tripId);
  const isSmallScreen = useMediaQuery('(max-width:950px)');

  const [startDate, setStartDate] = useState<Date | undefined>(trip ? trip.startDate : undefined);
  const [endDate, setEndDate] = useState(trip ? trip.endDate : undefined);
  const [country, setCountry] = useState(trip ? trip.country : undefined);
  const [countryInformation, setCountryInformation] = useState(trip ? trip.countryInformation : '');
  const [tripExperience, setTripExperience] = useState(trip ? trip.tripExperience : '');
  const [tripType, setTripType] = useState(trip ? trip.tripType : '');
  const [rating, setRating] = useState(trip ? trip.rating : null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const tripData = {
    startDate,
    endDate,
    country,
    tripType,
    images: [],
    coverImageId: null,
    countryInformation,
    tripExperience,
    rating,
    visitedCities: [],
  };

  function isValidTripData(t: Partial<Trip>): t is Trip {
    if (t.startDate && t.endDate && t.country && t.tripType) {
      return true;
    }
    return false;
  }

  async function postTripData() {
    if (isValidTripData(tripData)) {
      const newTripId = await tripService.postTrip(userData.uid, tripData);
      setToaster('successfully created');
      const tripsFromDB = await tripService.getTrips(userData.uid);
      setTrips(tripsFromDB);
      navigate(`/trips/${newTripId}`);
    } else {
      throw new Error('Trip data is not valid!');
    }
  }

  async function editTripData(id: string) {
    await tripService.editTrip(userData.uid, id, tripData);
    setToaster('successfully updated');
    const tripsFromDB = await tripService.getTrips(userData.uid);
    setTrips(tripsFromDB);
    navigate(`/trips/${id}`);
  }

  async function deleteTrip(id: string) {
    setDeleteModalVisible(false);
    await tripService.deleteTrip(userData.uid, id);
    setToaster('successfully deleted');
    const tripsFromDB = await tripService.getTrips(userData.uid);
    setTrips(tripsFromDB);
    navigate('/trips/');
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
            <ArrowBackIcon onClick={trip ? () => navigate(`/trips/${trip.id}`) : () => navigate('/trips/')} />
          </div>
          <div className="NewEditTripPage-title">{tripId ? 'Edit your trip' : 'Add a new trip'}</div>
        </div>
        {trip
          && (
            <Button
              variant="outlined"
              onClick={() => deleteConfirmation()}
              color="error"
              className="NewEditTripPage-deleteButton"
            >
              <DeleteIcon className="NewEditTripPage-deleteIcon" fontSize="small" />
              {isSmallScreen ? '' : 'DELETE'}
            </Button>
          )}
      </div>
      {trip && deleteModalVisible && <DeleteConfirmationModal onDelete={() => deleteTrip(trip.id)} onCancel={() => cancelDelete} type="trip" />}
      <div className="NewEditTripPage-form">
        <div className="NewEditTripPage-dates">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date *"
              value={dayjs(startDate)}
              onChange={(newDate) => setStartDate(!newDate?.isValid() ? undefined : newDate.toDate())}
            />
            {startDate && (
              <DatePicker
                label="End date *"
                minDate={dayjs(startDate)}
                value={dayjs(endDate)}
                onChange={(newDate) => setEndDate(!newDate?.isValid() ? undefined : newDate.toDate())}
              />
            )}
          </LocalizationProvider>
        </div>
        <Autocomplete
          className="NewEditTripPage-countrySelector"
          disablePortal
          options={countryNames}
          value={country}
          onChange={(e, selectedValue) => setCountry(selectedValue || undefined)}
          // eslint-disable-next-line react/jsx-props-no-spreading
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
            onChange={(e) => setTripExperience(e.target.value)}
          />
        </div>
        <div className="NewEditTripPage-countryInformation">
          <TextField
            label="Country Information"
            placeholder="eg. language, population, religion, history"
            multiline
            rows={4}
            value={countryInformation}
            onChange={(e) => setCountryInformation(e.target.value)}
          />
        </div>
        <Rating
          className="NewEditTripPage-rating"
          value={rating}
          onChange={(event, newValue) => { setRating(newValue); }}
        />
        <div className="NewEditTripPage-saveButton">
          <Button
            variant="outlined"
            onClick={trip ? () => editTripData(trip.id) : () => postTripData()}
            disabled={!isValidTripData(tripData)}
          >
            {trip ? 'Save' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewEditTripPage;
