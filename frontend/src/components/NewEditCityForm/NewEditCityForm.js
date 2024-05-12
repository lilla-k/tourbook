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
  const [haveAlreadyExistCity, setHaveAlreadyExistCity] = useState(false);

  const cityData = {
    cityName: cityName,
    cityInformation: cityInformation,
    attractions: attractions
  }

  async function postCityData() {
    console.log("create city");
    if (nameValidation() === "validated") {
    const cityId = await tripService.postCity(tripId, cityData);
    setToaster("successfully created");
    const trips = await tripService.getTrips();
    setTrips(trips);
    navigate(`/trips/${tripId}/${cityId}`)
    }
  }

  async function editCityData() {
    console.log("edit city");
    if (nameValidation() === "validated") {
      await tripService.editCity(tripId, cityId, cityData);
      setToaster("successfully updated");
      const trips = await tripService.getTrips();
      setTrips(trips);
      navigate(`/trips/${tripId}/${cityId}`);
    };
  }

  function nameValidation() {
    const selectedTripCities = selectedTrip.visitedCities.map(city => city.cityName);
    const alreadyExistCity = selectedTripCities.find(city => city === cityName);
    if (alreadyExistCity === undefined) {
      setHaveAlreadyExistCity(false)
      return "validated";
    } else { setHaveAlreadyExistCity(true) }
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
    {deleteModalVisible && <DeleteConfirmationModal deleteCity={deleteCity} cancelDelete={cancelDelete} />}
    <div className="NewEditCityForm-form">
      {cityId === undefined && <div className="NewEditCityForm-cityName">
        <TextField
          label="City name"
          variant="outlined"
          value={cityName}
          onChange={e => setCityName(e.target.value)}
        />
      </div>}
      {haveAlreadyExistCity && <div className="NewEditCityForm-alreadyExist">This city is added already</div>}
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
                key={attraction}
                label="Visited attraction"
                variant="outlined"
                value={attraction}
                onChange={e => {
                  attractions[index] = e.target.value;
                  console.log(attraction)
                  console.log(index)
                  setAttractions([...attractions]);
                }}
              />
              {attractions.length === (index + 1) &&
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
        <Button variant="outlined" onClick={cityId ? () => editCityData() : () => postCityData()} >{cityId ? "Save" : "Add"}</Button>
      </div>
    </div>

  </div >)
}

export default NewEditCityForm;