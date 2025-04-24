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

import type Context from '../../types/context.js';
import type { UserSettings } from '../../types/user';

function EditProfilePage() {
  const navigate = useNavigate();
  const { userData, setToaster, setUserSettings } = useOutletContext<Context>();

  const [locationName, setLocationName] = useState(userData.location?.name ? userData.location.name : null);
  const [visibility, setVisibility] = useState<string>(userData.visibility ? 'private' : 'public');

  const userSettings: UserSettings = {
    visibility,
  };

  if (locationName) {
    const { lat, lng } = findCountryPosition(locationName);
    userSettings.location = {
      name: locationName,
      lat,
      lng,
    };
  }

  async function editUserData(settings: UserSettings) {
    await userServices.editUser(userData.uid, settings);
    setToaster('successfully updated');
    setUserSettings(userSettings);
    navigate(`/users/${userData.uid}`);
  }

  return (
    <div className="EditProfilePage">
      <div className="EditProfilePage-header">
        <div className="EditProfilePage-arrowBackIcon">
          <ArrowBackIcon onClick={() => navigate(`/users/${userData.uid}`)} />
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
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} label="Location" />}
        />
        <FormControl className="EditProfilePage-typeSelector">
          <InputLabel>Trip visibility</InputLabel>
          <Select
            value={visibility}
            label="Trip visibility"
            onChange={(event) => setVisibility(event.target.value === 'private' ? 'private' : 'public')}
          >
            <MenuItem value="private">private</MenuItem>
            <MenuItem value="public">public</MenuItem>
          </Select>
        </FormControl>
        <div className="EditProfilePage-saveButton">
          <Button variant="contained" onClick={() => editUserData(userSettings)}>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
