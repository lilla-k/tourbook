import { useParams, useOutletContext, Link } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import CountryDetails from '../CountryDetails/CountryDetails';
import CityDetails from '../CityDetails/CityDetails';
import ImageGrid from '../ImageGrid/ImageGrid';
import './Trip.css';


function Trip() {

  const tripTypes = {
    "flight": <FlightIcon />,
    "bus": <DirectionsBusIcon />,
    "car": <DirectionsCarIcon />
  }

  let { tripId, city } = useParams();
  const trips = useOutletContext();
  const selectedTrip = trips.find(trip => trip.id === parseInt(tripId));
  console.log(selectedTrip.type);
  console.log(tripTypes[selectedTrip.type])


  return (
    <div className="Trip">
      <div className="Trip-img-container">
        <img src={process.env.PUBLIC_URL + selectedTrip.imgURL} className="Trip-img" alt=""/>
        <div className="Trip-title">
          <div className="Trip-title-border">
            <div>{selectedTrip.country.toUpperCase()}</div> 
            <div>{tripTypes[selectedTrip.type]}</div>
            <div className="Trip-date">{new Date(selectedTrip.start).toLocaleString('en-us',{month:'short', year:'numeric'})}</div>
          </div>
        </div>
      </div>
      <div className="Trip-info">
        <div className="Trip-visitedCities">
          <div className="Trip-visitedCities-title">VISITED CITIES</div>
          {selectedTrip.visitedCities.map(city => {
            return (
              <Link to={`/trips/${selectedTrip.id}/${city.cityName}`} className="Trip-visitedCity">
                <LocationOnIcon />
                <div>{city.cityName}</div>
              </Link>
            )
          })}
        </div>
        {city === undefined && <CountryDetails selectedTrip={selectedTrip} />}
        {city !== undefined && <CityDetails selectedTrip={selectedTrip} />}
          <ImageGrid
          images={selectedTrip.images}
          />
      </div>
    </div>
  )
}

export default Trip;