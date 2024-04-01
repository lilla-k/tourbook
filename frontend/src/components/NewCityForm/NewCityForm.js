import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './NewCityForm.css';

function NewCityForm() {

    const navigate = useNavigate();
    const { tripId } = useParams();
    const {trips, setTrips} = useOutletContext();
    console.log(trips);
    const selectedTrip = trips.find(trip => trip.id === tripId);

    const [cityInformation, setCityInformation] = useState("");
    const [cityName, setCityName] = useState("");
    const [attractions, setAttractions] = useState([""]);



    async function postCityData() {
        const cityData = {
            cityName: cityName,
            cityInformation: cityInformation,
            attractions: attractions
        }
        const response = await fetch(`http://localhost:3001/api/${tripId}/cities`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cityData)
        })
        if (response.status === 201) {
            const pushNewCity = () => {
                console.log(trips)
                trips.forEach(trip => {
                    if (trip.id === tripId) {
                        trip.visitedCities.push(cityData);
                    }
                })
                console.log(trips);
                return trips;
            }

            setTrips(pushNewCity);
            navigate(`/trips/${tripId}`)
        }
    }
    console.log(attractions);

    return (<div className="NewCityForm" >
        <div className="NewCityForm-title">Information about the city in {selectedTrip.country}</div>
        <div className="NewCityForm-form">
            <div className="NewCityForm-cityName">
                <TextField
                    label="City name"
                    variant="outlined"
                    value={cityName}
                    onChange={e => setCityName(e.target.value)}
                />
            </div>
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
                                    attractions[index]= e.target.value;
                                    setAttractions([...attractions]);
                                }}
                            />
                            {attractions.length===(index+1) &&  < AddCircleOutlineIcon 
                                className="NewCityForm-addAttractionBtn"
                                    onClick={e=>setAttractions([...attractions, ""])} 
                                /> 
                            }
                        </div>
                    )
                })}
            </div>
            <div className="NewCityForm-saveButton">
                <Button variant="outlined" onClick={() => postCityData()} >Upload details</Button>
            </div>
        </div>

    </div >)
}

export default NewCityForm;