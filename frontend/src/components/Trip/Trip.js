import { useParams, useOutletContext, Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import CityDetails from '../CityDetails/CityDetails';
import CountryDetails from '../CountryDetails/CountryDetails';
import ImageGrid from '../ImageGrid/ImageGrid';
import './Trip.css';


function Trip() {

  const tripTypes = {
    "flight": <FlightIcon />,
    "bus": <DirectionsBusIcon />,
    "car": <DirectionsCarIcon />
  }

  const [trips] = useOutletContext();
  const { tripId, city } = useParams();
  console.log(trips)
  const selectedTrip = trips.find(trip => trip.id === tripId);
  console.log(selectedTrip);
  const selectedCity = selectedTrip.visitedCities?.find(c => city ===c.cityName);

  const cityImages=[];
  selectedTrip.visitedCities?.forEach((city)=>cityImages.push(...city.images));
  const allImages=[...(selectedTrip.images? selectedTrip.images:[]), ...cityImages];
  const coverImageURL=allImages.map(image=>{   //find
    if(image.cover){
      return image.url
    }
  })
  console.log(coverImageURL);

  return (
    <div className="Trip">
      <div className="Trip-img-container">
        <img src={process.env.PUBLIC_URL + coverImageURL} className="Trip-img" alt="" />
        <div className="Trip-title">
          <div className="Trip-title-border">
            <div>{selectedTrip.country.toUpperCase()}</div>
            <div>{tripTypes[selectedTrip.type]}</div>
            <div className="Trip-date">{new Date(selectedTrip.startDate).toLocaleString('en-us', { month: 'short', year: 'numeric' })}</div>
          </div>
        </div>
      </div>
      <div className="Trip-info">
        <div className="Trip-visitedCities">
          <div className="Trip-visitedCities-title">VISITED CITIES</div>
          {selectedTrip.visitedCities?.map(city => {
            return (
              <Link to={`/trips/${selectedTrip.id}/${city.cityName}`} className="Trip-visitedCity">
                <LocationOnIcon />
                <div>{city.cityName}</div>
              </Link>
            )
          })}
        </div>
        {city===undefined?<CountryDetails selectedTrip={selectedTrip}/>:<CityDetails selectedCity={selectedCity}/>}
        <ImageGrid
          images={selectedCity===undefined? allImages : selectedCity.images}
        />
      </div>
    </div>
  )
}

export default Trip;