import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './VisitedCities.css';

function VisitedCities({ selectedTrip, selectedCity }) {

  console.log("selected trip", selectedTrip);
  console.log("selected city", selectedCity.cityName);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:950px)');


  return (
    <div className="VisitedCities">
      {isSmallScreen ?
        <FormControl className="VisitedCities-citySelector" >
          <InputLabel>City</InputLabel>
          <Select
            value={selectedCity?.cityId}
            label="City"  
            onChange={(event) => navigate(`/trips/${selectedTrip.id}/${event.target.value}`)}
            sx={{color: "#a19f9b"}}
          >
            {selectedTrip.visitedCities?.map(city => <MenuItem value={city.cityId} sx={{color: "#a19f9b"}}>{city.cityName}</MenuItem>)}
          </Select>
        </FormControl> :
        <div>
          <div className="VisitedCities-title">Visited cities</div>
          <div className="VisitedCities-container">
            {selectedTrip.visitedCities?.map(city => {
              return (
                <div className={`VisitedCity ${city.cityId === selectedCity?.cityId ? `selected` : ``}`} key={city.cityId}>
                  <Link to={`/trips/${selectedTrip.id}/${city.cityId}`} className="VisitedCityLink" >
                    <LocationOnIcon />
                    <div>{city.cityName}</div>
                  </Link>
                  <div className="VisitedCityIconEdit">
                    <EditIcon
                      fontSize="small"
                      onClick={() => navigate(`/trips/${selectedTrip.id}/${city.cityId}/edit`)} />
                  </div>
                </div>
              )
            })}
           </div> 
      </div>}
      <Button 
        onClick={() => navigate(`/trips/${selectedTrip.id}/addCity`)} 
        variant="outlined"
        sx={{mt: "10px"}}
      >+ Add City</Button>
    </div>
  )
}

export default VisitedCities