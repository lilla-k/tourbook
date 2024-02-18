import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import countries from '../../countries.js';
import './NewTripForm.css';

function NewTripForm() {

    const countriesArray = countries.map(country => country.name).sort();
    return (
        <div className="NewTripForm">
            <div className="NewTripForm-title">Information about your trip</div>
            <Autocomplete
                className="NewTripForm-countrySelector"
                disablePortal
                options={countriesArray}
                renderInput={(params) => <TextField {...params} label="Countries" />}
            />
            <div className="NewTripForm-countryInformation">
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                ></Box>
                <TextField
                    label="Country Information"
                    placeholder="eg. language, population, religion, history"
                    multiline
                    rows={4}
                />
            </div>
            <div className="NewTripForm-experience">
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                ></Box>
                <TextField
                    label="Your experience"
                    placeholder="eg. weather, unforgattable experiences"
                    multiline
                    rows={4}
                />
            </div>
            <div className="NewTripForm-saveButton">
                    <Button variant="outlined">Save the trip</Button>
            </div>
        </div>
    )
}

export default NewTripForm;