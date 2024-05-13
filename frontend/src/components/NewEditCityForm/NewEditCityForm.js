import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './NewEditCityForm.css';
import tripService from '../../services/tripService.js';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import TitleInput from '../TitleInput/TitleInput'


function NewEditCityForm() {

  const navigate = useNavigate();
  const { tripId, cityId } = useParams();
  const { trips, setTrips, setToaster } = useOutletContext();
  console.log("trips", trips);
  const selectedTrip = trips.find(trip => trip.id === tripId);
  const selectedCity = selectedTrip.visitedCities.find(city => city.cityId === cityId)

  const [cityInformation, setCityInformation] = useState(cityId ? selectedCity.cityInformation : "");
  const [cityName, setCityName] = useState(cityId ? selectedCity.cityName : "");
  const [attractions, setAttractions] = useState(cityId ? selectedCity.attractions : [""]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const cityData = {
    cityName: cityName,
    cityInformation: cityInformation,
    attractions: attractions
  }

  async function postCityData() {
    const cityId = await tripService.postCity(tripId, cityData);
    setToaster("successfully created");
    const trips = await tripService.getTrips();
    setTrips(trips);
    navigate(`/trips/${tripId}/${cityId}`)
  }

  async function editCityData() {
    await tripService.editCity(tripId, cityId, cityData);
    setToaster("successfully updated");
    const trips = await tripService.getTrips();
    setTrips(trips);
    navigate(`/trips/${tripId}/${cityId}`);
  }

  function isCityNameValid() {
    const selectedTripCities = selectedTrip.visitedCities.map(city => city.cityName);
    console.log("selected trip cities", selectedTripCities);
    return !selectedTripCities.includes(cityName) || cityName === selectedCity?.cityName;
  }

  async function deleteCity() {
    setDeleteModalVisible(false);
    await tripService.deleteCity(tripId, cityId);
    setToaster("successfully deleted");
    const trips = await tripService.getTrips();
    setTrips(trips);
    navigate(`/trips/${tripId}`);
  }

  function cancelDelete() {
    setDeleteModalVisible(false);
  }

  function deleteConfirmation() {
    setDeleteModalVisible(true);
  }

  return (<div className="NewEditCityForm" >
    <div className="NewEditCityForm-header">
      <div className="NewEditCityForm-headerStart">
        <div className="NewEditCityForm-arrowBackIcon">
          <ArrowBackIcon onClick={cityId ? () => navigate(`/trips/${selectedTrip.id}/${cityId}`) : () => navigate(`/trips/${selectedTrip.id}`)} />
        </div>
        {cityId ?
          <TitleInput value={cityName} onChange={setCityName} /> :
          "Add a city"}
      </div>
      {cityId &&
        <Button
          variant="outlined"
          onClick={() => deleteConfirmation()}
          color="error"
          className="NewEditCityForm-deleteButton"
        >
          <DeleteIcon className="NewEditCityForm-deleteIcon" fontSize="small" />
          DELETE
        </Button>
      }
    </div>
    {deleteModalVisible && <DeleteConfirmationModal onDelete={deleteCity} onCancel={cancelDelete} type="city" />}
    <div className="NewEditCityForm-form">
      {cityId === undefined && <div className="NewEditCityForm-cityName">
        <TextField
          label="City name"
          variant="outlined"
          value={cityName}
          onChange={e => setCityName(e.target.value)}
          autoFocus
        />
      </div>}
      {!isCityNameValid() && <div className="NewEditCityForm-alreadyExist">This city is added already</div>}
      <div className="NewEditCityForm-cityInformation">
        <TextField
          label="City Information"
          placeholder="eg. population, interesting things"
          multiline
          rows={4}
          value={cityInformation}
          onChange={e => setCityInformation(e.target.value)}
        />
      </div>
      <div className="NewEditCityForm-attractions">
        {attractions.map((attraction, index) => {
          return (
            <div>
              <TextField
                label="Visited attraction"
                variant="outlined"
                value={attraction}
                autoFocus={attractions.length > 1 && attractions.length === (index + 1) && attractions[attractions.length - 1] === ''}
                onChange={e => {
                  attractions[index] = e.target.value;
                  console.log(attraction)
                  console.log(index)
                  setAttractions([...attractions]);
                }}
                onBlur={e => {
                  if (e.target.value === '') {
                    setAttractions(attractions.slice(0, Math.max(attractions.length - 1, 1)));
                  }
                }}
              />
              {attractions.length === (index + 1) && attractions[attractions.length-1] !== "" && 
                <Button
                  disabled={attractions[index].length === 0}
                  onClick={e => setAttractions([...attractions, ""])}
                  sx={{ margin: "20px 0" }}
                >
                  < AddCircleOutlineIcon className="NewEditCityForm-addAttractionIcon" />
                </Button>
              }
            </div>
          )
        })}
      </div>
      <div className="NewEditCityForm-saveButton">
        <Button
          variant="outlined"
          disabled={!isCityNameValid()}
          onClick={cityId ? () => editCityData() : () => postCityData()} >{cityId ? "Save" : "Add"}
        </Button>
      </div>
    </div>

  </div >)
}

export default NewEditCityForm;