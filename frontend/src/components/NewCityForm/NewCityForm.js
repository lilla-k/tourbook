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

    return (<div className="NewCityForm">
        <div className="NewCityForm-title">Information about the city in {selectedTrip.country}</div>
        <div className="NewCityForm-form">
            <TextField id="outlined-basic" label="City name" variant="outlined" />
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
            <div>Attractions</div>
            <div className="NewCityForm-saveButton">
                    <Button variant="outlined" >Upload details</Button>
            </div>
        </div>

    </div>)
}

export default NewCityForm;