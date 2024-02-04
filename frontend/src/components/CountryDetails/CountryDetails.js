import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import './CountryDetails.css';

function CountryDetails({ selectedTrip }) {


    return (
        <div className="CountryDetails">
            <div className="CountryDetails-info">
                <div className="CountryDetails-date">
                    <CalendarMonthIcon />
                    <div>{new Date(selectedTrip.start).toLocaleDateString("en-EN")}</div>
                    <span> — </span>
                    <div>{new Date(selectedTrip.end).toLocaleDateString("en-EN")}</div>
                </div>
                <div>
                    <div className="CountryDetails-climate">
                        <Brightness6Icon />
                        <div>{selectedTrip.climate}</div>
                    </div>
                    <div className="CountryDetails-country">
                        <LocationCityIcon />
                        <div>{selectedTrip.countryDetails}</div>
                    </div>
                    <div className="CountryDetails-experience">
                        <div>Our experience:</div>
                        <div>{selectedTrip.experience}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountryDetails;