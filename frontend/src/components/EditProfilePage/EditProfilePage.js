import { useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import countries from '../../countries.js';
import findCountryPosition from '../../utils/location.js';
import userServices from '../../services/userService.js';


import './EditProfilePage.css';

function EditProfilePage(){

    const navigate = useNavigate();
    const { user } = useOutletContext();
    console.log(user);
    const countriesArray = countries.map(country => country.name).sort();

    const [locationName, setLocationName] = useState(user.location.name?user.location.name:"Choose your location");
    const [isPublicProfile, setIsPublicProfile] = useState(user.publicProfile? user.publicProfile: false);
    
    const {lat, lng} = findCountryPosition(locationName);

    const userData={
        location: {
            name: locationName,
            lat: lat,
            lng: lng
        },
        publicProfile: isPublicProfile
    }
    function editUserData(userData){
        console.log("btn clicked");
        userServices.editUser(user.uid, userData)
    }

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
                    value={locationName}
                    onChange={(e, selectedValue) => setLocationName(selectedValue)}
                    renderInput={(params) => <TextField {...params} label="Location" />}
                />
                <FormControl className="EditProfilePage-typeSelector">
                    <InputLabel>Trip visibility</InputLabel>
                    <Select
                        value={isPublicProfile}
                        label="Trip visibility"
                        onChange={(event) => setIsPublicProfile(event.target.value)}
                    >
                        <MenuItem value={false}>private</MenuItem>
                        <MenuItem value={true}>public</MenuItem>
                    </Select>
                </FormControl>
                <div className="EditProfilePage-saveButton">
                <Button variant="outlined" onClick={() => editUserData(userData)}>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default EditProfilePage;