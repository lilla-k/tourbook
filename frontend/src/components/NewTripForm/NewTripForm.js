import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import countries from '../../countries.js';
import './NewTripForm.css';

function NewTripForm() {

    const countriesArray=countries.map(country=>country.name).sort();
    return (
        <div className="NewTripForm">
            <div className="NewTripForm-title">Information about your trip</div>
            <Autocomplete
                className="NewTripForm-countrySelector"
                disablePortal
                options={countriesArray}
                renderInput={(params) => <TextField {...params} label="Countries" />}
            />
            <div>Add information about the country</div>
            <textarea>eg. location, capital, language, religion</textarea>
            <div>Your experience</div>
            <textarea>eg. weather, unforgattable experience</textarea>
        </div>
    )
}

export default NewTripForm;