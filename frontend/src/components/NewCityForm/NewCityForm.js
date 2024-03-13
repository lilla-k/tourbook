import { useParams, useOutletContext } from "react-router-dom";
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './NewCityForm.css';

function NewCityForm() {

    const { tripId } = useParams();
    const [trips] = useOutletContext();
    console.log(trips);
    const selectedTrip = trips.find(trip => trip.id === tripId);
    //console.log(selectedTripCountry)  hogy lehet leadni a country-t?

    const [cityInformation, setCityInformation] = useState("");
    const [cityName, setCityName] = useState("");

    async function postCityData() {
        const cityData = {
            cityName: cityName,
            cityInformation: cityInformation
        }
        const response = await fetch(`http://localhost:3001/api/${tripId}/cities`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cityData)
        })
        if (response.status === 201){
           
        }
    }

    return(<div className = "NewCityForm" >
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
                <div>You can add the visited attractions:</div>
            </div>
            <div className="NewCityForm-saveButton">
                    <Button variant="outlined"onClick={() => postCityData()} >Upload details</Button>
            </div>
        </div>

    </div >)
    }

    export default NewCityForm;