import { useParams, useOutletContext, Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CityDetails from '../CityDetails/CityDetails';
import CountryDetails from '../CountryDetails/CountryDetails';
import ImageGrid from '../ImageGrid/ImageGrid';
import tripTypes from '../../tripTypes.js';
import './Trip.css';
import '../../style/Tooltip.css';


function Trip() {

  const navigate = useNavigate();
  const [trips] = useOutletContext();
  console.log(trips);
  const { tripId, city } = useParams();
  const selectedTrip = trips.find(trip => trip.id === tripId);
  const selectedCity = selectedTrip.visitedCities?.find(c => city === c.cityName);


  const cityImages = [];
  selectedTrip.visitedCities?.forEach((city) => cityImages.push(...(city.images || [])));
  const allImages = [...(selectedTrip.images ? selectedTrip.images : []), ...cityImages];
  const coverImage = allImages.find(image => image.cover === true);

  return (
    <div className="Trip">
      <div className="Trip-img-container">
        <img src={process.env.PUBLIC_URL + coverImage.url} className="Trip-img" alt="" />
        <div className="Trip-edit-icon-container" onClick={()=>navigate(`/trips/${selectedTrip.id}/edit`)}>
          <EditIcon className="Trip-edit-icon" />
          <div className="tooltip" >Edit trip</div>
        </div>
        <div className="Trip-title">
          <div className="Trip-title-border">
            <div>{selectedTrip.country.toUpperCase()}</div>
            <div>{tripTypes[selectedTrip.tripType]}</div>
            <div className="Trip-date">{new Date(selectedTrip.startDate).toLocaleString('en-us', { month: 'short', year: 'numeric' })}</div>
          </div>
        </div>
      </div>
      <div className="Trip-info">
        <div className="Trip-visitedCities-container">
          <div className="Trip-visitedCities-title">VISITED CITIES</div>
          <div className="Trip-visitedCities">
            {selectedTrip.visitedCities?.map(city => {
              return (
                <Link to={`/trips/${selectedTrip.id}/${city.cityName}`} className="Trip-visitedCity">
                  <LocationOnIcon />
                  <div>{city.cityName}</div>
                </Link>
              )
            })}
          </div>
          <Button onClick={() => navigate(`/trips/${tripId}/addCity`)} variant="outlined">+ Add City</Button>
        </div>
        {city === undefined ? <CountryDetails selectedTrip={selectedTrip} /> : <CityDetails selectedCity={selectedCity} />}
        <ImageGrid
          images={selectedCity === undefined ? allImages : selectedCity.images}
        />
      </div>
    </div>
  )
}

export default Trip;