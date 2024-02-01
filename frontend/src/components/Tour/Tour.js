import { useParams, useOutletContext } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import './Tour.css';

function Tour() {

  let { tourId } = useParams();
  const tours = useOutletContext();
  const selectedDestination = tours.find(tour => tour.id === parseInt(tourId));


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
          <div className="Tour-time-container">
            <div className="Tour-start">
              <div className="Tour-start-border">
                <div>{new Date(selectedDestination.start).toLocaleDateString("en-EN")}</div>
              </div>
            </div>
            <div> _ </div>
            <div className="Tour-end">
              <div className="Tour-end-border">
                <div>{new Date(selectedDestination.end).toLocaleDateString("en-EN")}</div>
              </div>
            </div>
          </div>
          <div className="Tour-climate">
            <div className="Tour-climate-border">
              <Brightness6Icon/>
              <div>{selectedDestination.climate}</div>
            </div>
          </div>
          <div className="Tour-country">
            <div className="Tour-country-border">
              <LocationCityIcon/>
              <div>{selectedDestination.destinationDetails}</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Tour;