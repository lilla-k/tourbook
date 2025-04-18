import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { findCountryPosition, countryNames } from '../../utils/location.js';
import userServices from '../../services/userService.js';

import './EditProfilePage.css';

function EditProfilePage() {
  const navigate = useNavigate();
  const { user, setToaster, setUserData } = useOutletContext();

  const [locationName, setLocationName] = useState(user.location?.name ? user.location.name : null);
  const [isPublicProfile, setIsPublicProfile] = useState(user.publicProfile ? user.publicProfile : false);

  const userData = {
    publicProfile: isPublicProfile,
  };

  if (locationName) {
    const { lat, lng } = findCountryPosition(locationName);
    userData.location = {
      name: locationName,
      lat,
      lng,
    };
  }

  async function editUserData(userData) {
    console.log(userData);
    console.log(user.uid)
    await userServices.editUser(user.uid, userData);
    setToaster('successfully updated');
    setUserData(userData);
    navigate(`/users/${user.uid}`);
  }

  return (
    <div className="EditProfilePage">
      <div className="EditProfilePage-header">
        <div className="EditProfilePage-arrowBackIcon">
          <ArrowBackIcon onClick={() => navigate(`/users/${user.uid}`)} />
        </div>
        <div className="EditProfilePage-title">Edit your profile</div>
      </div>
      <div className="EditProfilePage-form">
        <Autocomplete
          className="EditProfilePage-locationSelector"
          disablePortal
          options={countryNames}
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
            <MenuItem value>public</MenuItem>
          </Select>
        </FormControl>
        <div className="EditProfilePage-saveButton">
          <Button variant="contained" onClick={() => editUserData(userData)}>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
