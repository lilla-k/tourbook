import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';

import './VisitedCities.css';

import type { Trip } from '../../types/trip';
import type City from '../../types/city';

function VisitedCities({ trip, city }: { trip: Trip, city: City | undefined }) {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:950px)');

  return (
    <div className="VisitedCities">
      <Link to={`/trips/${trip.id}`} className="VisitedCities-country">{trip.country.toUpperCase()}</Link>
      {isSmallScreen
        ? trip.visitedCities?.length > 0
        && (
          <div>
            <FormControl className="VisitedCities-citySelector" size="small">
              <InputLabel>City</InputLabel>
              <Select
                value={city?.cityId}
                label="City"
                onChange={(event) => navigate(`/trips/${trip.id}/cities/${event.target.value}`)}
              >
                {trip.visitedCities?.map((c) => <MenuItem value={c.cityId}>{c.cityName}</MenuItem>)}
              </Select>
            </FormControl>
            <IconButton onClick={() => navigate(`/trips/${trip.id}/cities/${city?.cityId}/edit`)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
        )
        : (
          <div>
            <div className="VisitedCities-title">Visited cities</div>
            <div className="VisitedCities-container">
              {trip.visitedCities?.map((c) => (
                <div className={`VisitedCity ${c.cityId === city?.cityId ? 'selected' : ''}`} key={c.cityId}>
                  <Link to={`/trips/${trip.id}/cities/${c.cityId}`} className="VisitedCityLink">
                    <LocationOnIcon />
                    <div>{c.cityName}</div>
                  </Link>
                  <div className="VisitedCityIconEdit">
                    <EditIcon
                      fontSize="small"
                      onClick={() => navigate(`/trips/${trip.id}/cities/${c.cityId}/edit`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      <Button
        onClick={() => navigate(`/trips/${trip.id}/addCity`)}
        variant="outlined"
        sx={{ mt: '10px' }}
      >
        + Add City
      </Button>
    </div>
  );
}

export default VisitedCities;
