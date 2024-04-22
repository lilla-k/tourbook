import { useParams, useOutletContext, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CityDetails from '../CityDetails/CityDetails';
import CountryDetails from '../CountryDetails/CountryDetails';
import ImageGrid from '../ImageGrid/ImageGrid';
import CoverImageSelectorModal from '../CoverImageSelectorModal/CoverImageSelectorModal.js';
import tripTypes from '../../tripTypes.js';
import tripService from '../../services/tripService.js'
import './Trip.css';
import '../../style/Tooltip.css';

const apiUrl = process.env.REACT_APP_BACKEND_API;

function Trip() {

  const navigate = useNavigate();
  const {trips, setTrips, setToaster} = useOutletContext();
  const {tripId, city} = useParams();
  const selectedTrip = trips.find(trip => trip.id === tripId);
  const selectedCity = selectedTrip?.visitedCities?.find(c => city === c.cityName);

  const [showCoverImageSelectorModal, setShowCoverImageSelectorModal] = useState(false);

  const cityImages = [];
  selectedTrip.visitedCities?.forEach((city) => cityImages.push(...(city.images || [])));
  const allImages = [...(selectedTrip.images ? selectedTrip.images : []), ...cityImages];
  console.log(allImages)
  const coverImage = allImages.find(image => image.id === selectedTrip.coverImageId);

  async function saveCoverImage(id){
    console.log("image id", id);
    await tripService.setCoverImage(tripId, id);
    setToaster("cover image updated");
    const trips = await tripService.getTrips();
    setTrips(trips);
    setShowCoverImageSelectorModal(false);
  }


  return (
    <div className="Trip">
      <div className="Trip-img-container">
        <img src={coverImage && `${apiUrl}${coverImage.url}`} className="Trip-img" alt="" />
        <div className="Trip-edit-coverImage" onClick={()=>setShowCoverImageSelectorModal(true)}>
          <AddAPhotoIcon fontSize="small" className="Trip-edit-coverImage-icon" /> Edit cover image
        </div>
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
          cols={2}
        />
      </div>
      {showCoverImageSelectorModal && 
      <CoverImageSelectorModal 
        setShowCoverImageSelectorModal={setShowCoverImageSelectorModal} 
        images={allImages}
        saveCoverImage={saveCoverImage} //onClick property?
      />}
    </div>
  )
}

export default Trip;