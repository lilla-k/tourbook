import './EditProfilePage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from 'react';
import countries from '../../countries.js';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function EditProfilePage(){

    const navigate = useNavigate();
    const { user } = useOutletContext();
    console.log(countries)
    const countriesArray = countries.map(country => country.name).sort();
    console.log(countriesArray)

    const [location, setLocation] = useState("Choose your location");


    return(
        <div className="EditProfilePage">
            <div className="EditProfilePage-header">
                <div className="EditProfilePage-arrowBackIcon">
                        <ArrowBackIcon onClick={ ()=>navigate(`/users/${user.uid}`)} />
                    </div>
                    <div className="EditProfilePage-title">Edit your profile</div>
            </div>
            <div className="EditProfilePage-form">
                <Autocomplete
                    className="EditProfilePage-locationSelector"
                    disablePortal
                    options={countriesArray}
                    value={location}
                    onChange={(e, selectedValue) => setLocation(selectedValue)}
                    renderInput={(params) => <TextField {...params} label="Location" />}
                />
            </div>
        </div>
    )
}

export default EditProfilePage;