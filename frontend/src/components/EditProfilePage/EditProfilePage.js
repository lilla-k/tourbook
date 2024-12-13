import './EditProfilePage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from 'react';
import countries from '../../countries.js';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import findCountryPosition from '../../utils/location.js';
import Button from '@mui/material/Button';
import userServices from '../../services/userService.js';

function EditProfilePage(){

    const navigate = useNavigate();
    const { user } = useOutletContext();
    console.log(user);
    const countriesArray = countries.map(country => country.name).sort();

    const [locationName, setLocationName] = useState(user.location.name?user.location.name:"Choose your location");
    const [isPublicProfile, setIsPublicProfile] = useState(false);
    
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
            </div>
            <div className="EditProfilePage-saveButton">
                <Button variant="outlined" onClick={() => editUserData(userData)}>Save</Button>
            </div>
        </div>
    )
}

export default EditProfilePage;