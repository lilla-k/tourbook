import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import tripService from '../../services/tripService.js';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.js';
import TitleInput from '../TitleInput/TitleInput.jsx';
import AttractionsForm from '../AttractionsForm/AttractionsForm.js';
import './NewEditCityPage.css';

import type Context from '../../types/context.js';
import type City from '../../types/city';

function useTrip() {
  const { trips } = useOutletContext<Context>();
  const { tripId } = useParams();
  const trip = trips.find((t) => t.id === tripId);
  if (tripId === undefined || trip === undefined) {
    throw new Error("This trip doesn't exist");
  }
  return trip;
}

function NewEditCityPage() {
  const navigate = useNavigate();
  const { cityId } = useParams();
  const trip = useTrip();
  const {
    setTrips, setToaster, userData,
  } = useOutletContext<Context>();
  const selectedCity = trip.visitedCities?.find((city) => city.cityId === cityId);

  const [cityInformation, setCityInformation] = useState(selectedCity ? selectedCity.cityInformation : '');
  const [cityName, setCityName] = useState(selectedCity ? selectedCity.cityName : '');
  const [attractions, setAttractions] = useState(selectedCity ? selectedCity.attractions : ['']);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const cityData = {
    cityName,
    cityInformation,
    attractions,
  };

  async function postCityData() {
    const newCityId = await tripService.postCity(userData.uid, trip.id, cityData);
    setToaster('successfully created');
    const trips = await tripService.getTrips(userData.uid);
    setTrips(trips);
    navigate(`/trips/${trip.id}/cities/${newCityId}`);
  }

  async function editCityData(selectedCityInformation: City) {
    await tripService.editCity(userData.uid, trip.id, selectedCityInformation, cityData);
    setToaster('successfully updated');
    const trips = await tripService.getTrips(userData.uid);
    setTrips(trips);
    navigate(`/trips/${trip.id}/cities/${cityId}`);
  }

  function doesCityNameExist() {
    const selectedTripCities = trip.visitedCities?.map((city) => city.cityName);
    return !selectedTripCities?.includes(cityName) || cityName === selectedCity?.cityName;
  }

  async function deleteCity(selectedCityInformation: City) {
    setDeleteModalVisible(false);
    await tripService.deleteCity(userData.uid, trip.id, selectedCityInformation);
    setToaster('successfully deleted');
    const trips = await tripService.getTrips(userData.uid);
    setTrips(trips);
    navigate(`/trips/${trip.id}`);
  }

  function cancelDelete() {
    setDeleteModalVisible(false);
  }

  function deleteConfirmation() {
    setDeleteModalVisible(true);
  }

  return (
    <div className="NewEditCityPage">
      <div className="NewEditCityPage-header">
        <div className="NewEditCityPage-headerStart">
          <div className="NewEditCityPage-arrowBackIcon">
            <ArrowBackIcon onClick={cityId ? () => navigate(`/trips/${trip.id}/cities/${cityId}`) : () => navigate(`/trips/${trip.id}`)} />
          </div>
          {cityId
            ? <TitleInput value={cityName} onChange={setCityName} />
            : 'Add a city'}
        </div>
        {cityId
          && (
            <Button
              variant="outlined"
              onClick={() => deleteConfirmation()}
              color="error"
              className="NewEditCityPage-deleteButton"
            >
              <DeleteIcon className="NewEditCityPage-deleteIcon" fontSize="small" />
              DELETE
            </Button>
          )}
      </div>
      {deleteModalVisible && selectedCity && <DeleteConfirmationModal onDelete={() => deleteCity(selectedCity)} onCancel={() => cancelDelete()} type="city" />}
      <div className="NewEditCityPage-form">
        {cityId === undefined && (
          <div className="NewEditCityPage-cityName">
            <TextField
              label="City name"
              variant="outlined"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              autoFocus
            />
          </div>
        )}
        {!doesCityNameExist() && <div className="NewEditCityPage-alreadyExist">This city is added already</div>}
        <div className="NewEditCityPage-cityInformation">
          <TextField
            label="City Information"
            placeholder="eg. population, interesting things"
            multiline
            rows={4}
            value={cityInformation}
            onChange={(e) => setCityInformation(e.target.value)}
          />
        </div>
        <AttractionsForm attractions={attractions} setAttractions={setAttractions} />
        <div className="NewEditCityPage-saveButton">
          <Button
            variant="outlined"
            disabled={!doesCityNameExist() || cityName === ''}
            onClick={selectedCity ? () => editCityData(selectedCity) : () => postCityData()}
          >
            {cityId ? 'Save' : 'Add'}
          </Button>
        </div>
      </div>

    </div>
  );
}

export default NewEditCityPage;
