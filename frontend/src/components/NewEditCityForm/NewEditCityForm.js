import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './NewEditCityForm.css';
import tripService from '../../services/tripService.js';


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

  const cityData = {
    cityName: cityName,
    cityInformation: cityInformation,
    attractions: attractions
  }

  async function postCityData() {
    console.log("create city");
    await tripService.postCity(tripId, cityData);
    setToaster("successfully created");
    const trips = await tripService.getTrips();
    setTrips(trips);
    navigate(`/trips/${tripId}`)
  }

  async function editCityData() {
    console.log("edit city");
    await tripService.editCity(tripId, cityId, cityData);
    setToaster("successfully updated");
    const trips = await tripService.getTrips();
    setTrips(trips);
    navigate(`/trips/${tripId}/${cityId}`);
  }

  async function deleteCity() {
    await tripService.deleteCity(tripId, cityId);
    setToaster("successfully deleted");
    const trips = await tripService.getTrips();
    setTrips(trips);
    navigate(`/trips/${tripId}`);
  }

  return (<div className="NewEditCityForm" >
    <div className="NewEditCityForm-header">
      <div className="NewEditCityForm-headerStart">
        <div className="NewEditCityForm-arrowBackIcon">
          <ArrowBackIcon onClick={cityId ? () => navigate(`/trips/${selectedTrip.id}/${cityId}`) : () => navigate(`/trips/${selectedTrip.id}`)} />
        </div>
        {cityId ?
          <div className="NewEditCityForm-title">{selectedCity.cityName}</div> :
          "Add a city"}
      </div>
      {cityId &&
          <Button
            variant="outlined"
            onClick={() => deleteCity()} 
            color="error"
            className="NewEditCityForm-deleteButton"
          >
            <DeleteIcon className="NewEditCityForm-deleteIcon" fontSize="small"/> 
            Delete
          </Button>
      }
    </div>
    <div className="NewEditCityForm-form">
      {cityId === undefined && <div className="NewEditCityForm-cityName">
        <TextField
          label="City name"
          variant="outlined"
          value={cityName}
          onChange={e => setCityName(e.target.value)}
        />
      </div>}
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
                key={index}
                label="Visited attraction"
                variant="outlined"
                value={attraction}
                onChange={e => {
                  attractions[index] = e.target.value;
                  setAttractions([...attractions]);
                }}
              />
              {console.log(!attractions[index])}
              {attractions.length === (index + 1) && < AddCircleOutlineIcon
                className="NewEditCityForm-addAttractionBtn"
                onClick={e => setAttractions([...attractions, ""])}  //miért van itt üres string?
                disabled={false}
              />
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