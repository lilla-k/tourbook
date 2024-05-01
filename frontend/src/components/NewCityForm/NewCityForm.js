import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './NewCityForm.css';
import tripService from '../../services/tripService.js';


function NewCityForm() {

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
        navigate(`/trips/${tripId}`);
    }

    function deleteCity() {
        console.log("delete");
    }

    return (<div className="NewCityForm" >
        <div className="NewCityForm-header">
            <div className="NewCityForm-arrowBackIcon">
                <ArrowBackIcon onClick={cityId ? () => navigate(`/trips/${selectedTrip.id}/${cityId}`) : () => navigate(`/trips/${selectedTrip.id}`)}/>
            </div>
            {cityId ?
                <div className="NewCityForm-title">{selectedCity.cityName}</div> :
                "Add a city"}
        </div>
        <div className="NewCityForm-form">
            {cityId === undefined && <div className="NewCityForm-cityName">
                <TextField
                    label="City name"
                    variant="outlined"
                    value={cityName}
                    onChange={e => setCityName(e.target.value)}
                />
            </div>}
            <div className="NewCityForm-cityInformation">
                <TextField
                    label="City Information"
                    placeholder="eg. population, interesting things"
                    multiline
                    rows={4}
                    value={cityInformation}
                    onChange={e => setCityInformation(e.target.value)}
                />
            </div>
            <div className="NewCityForm-attractions">
                {attractions.map((attraction, index) => {
                    return (
                        <div>
                            <TextField
                                label="Visited attraction"
                                variant="outlined"
                                value={attraction}
                                onChange={e => {
                                    attractions[index] = e.target.value;
                                    setAttractions([...attractions]);
                                }}
                            />
                            {attractions.length === (index + 1) && < AddCircleOutlineIcon
                                className="NewCityForm-addAttractionBtn"
                                onClick={e => setAttractions([...attractions, ""])}
                            />
                            }
                        </div>
                    )
                })}
            </div>
            <div className="NewCityForm-saveButton">
                <Button variant="outlined" onClick={cityId ? () => editCityData() : () => postCityData()} >{cityId ? "Save" : "Add"}</Button>
            </div>
            {cityId && <div className="NewCityForm-deleteButton">
                <Button variant="outlined" onClick={() => deleteCity()} sx={{ color: '#d0312d', borderColor: '#d0312d' }}>Delete this city</Button>
            </div>}
        </div>

    </div >)
}

export default NewCityForm;