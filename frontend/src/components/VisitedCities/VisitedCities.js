import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';

import './VisitedCities.css';

function VisitedCities({ selectedTrip, selectedCity }) {

  console.log("selected trip", selectedTrip);
  console.log("selected city", selectedCity);
  const navigate = useNavigate();

  return (
    <div className="VisitedCities">
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
      <Button onClick={() => navigate(`/trips/${selectedTrip.id}/addCity`)} variant="outlined">+ Add City</Button>
    </div>
  )
}

export default VisitedCities