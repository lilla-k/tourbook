import { useParams, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import './Tour.css';

function Tour() {

  let { tourId } = useParams();
  const tours = useOutletContext();
  const selectedDestination = tours.find(tour => tour.id === parseInt(tourId));
  const [showDetails, setShowDetails] = useState(true);


  return (
    <div className="Tour">
      <div className="Tour-img-container">
        <img src={selectedDestination.imgURL} className="Tour-img" />
        <div className="Tour-title">
          <div className="Tour-title-border">
            <div>{selectedDestination.destination.toUpperCase()}</div>
            <div>{selectedDestination.type}</div>
          </div>
        </div>
      </div>
      <div className="Tour-info">
        <div className="Tour-visitedCities">
          <div className="Tour-visitedCities-title">VISITED CITIES</div>
          {selectedDestination.visitedCities.map(city => {
            return (
              <div className="Tour-visitedCity">
                <LocationOnIcon />
                <div>{city.cityName}</div>
              </div>
            )
          })}
        </div>
        <div className="Tour-details">
          <div className="Tour-date">
            <CalendarMonthIcon />
            <div>{new Date(selectedDestination.start).toLocaleDateString("en-EN")}</div>
            <span> — </span>
            <div>{new Date(selectedDestination.end).toLocaleDateString("en-EN")}</div>
            {!showDetails &&<KeyboardArrowDownIcon className="Tour-details-arrow" onClick={()=> setShowDetails(true)}/>}
            {showDetails &&<KeyboardArrowUpIcon className="Tour-details-arrow" onClick={()=> setShowDetails(false)}/>}
          </div>
          {showDetails &&
          <div>
            <div className="Tour-climate">
              <Brightness6Icon />
              <div>{selectedDestination.climate}</div>
            </div>
            <div className="Tour-country">
              <LocationCityIcon />
              <div>{selectedDestination.destinationDetails}</div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Tour;