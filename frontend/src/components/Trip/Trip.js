import { useState } from 'react';
import { useParams, useOutletContext, Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import CityDetails from '../CityDetails/CityDetails';
import CountryDetails from '../CountryDetails/CountryDetails';
import ImageGrid from '../ImageGrid/ImageGrid';
import CoverImageSelectorModal from '../CoverImageSelectorModal/CoverImageSelectorModal.js';
import FileUploadModal from '../FileUploadModal/FileUploadModal';
import getTripTypeIcons from '../TripTypeIcons/tripTypeIcons.js';
import tripService from '../../services/tripService.js';
import {findCountryPosition, getDistanceFromLatLonInKm} from '../../utils/location.js';
import './Trip.css';
import '../../style/tooltip.css';


function Trip() {

  const [showCoverImageSelectorModal, setShowCoverImageSelectorModal] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  const navigate = useNavigate();
  const { trips, setTrips, setToaster, user } = useOutletContext();
  const { tripId, cityId } = useParams();
  const selectedTrip = trips.find(trip => trip.id === tripId);
  if (selectedTrip === undefined){
    throw new Error("This trip doesn't exist!");
  }
  const selectedCity = selectedTrip?.visitedCities?.find(c => cityId === c.cityId);
  if (selectedCity === undefined && cityId!==undefined){
    throw new Error("This city doesn't exist!");
  }

  const allImages=selectedTrip.images;
  const cityImages = allImages?.filter(image => image.cityId === cityId);
  const coverImage = allImages?.find(image => image.id === selectedTrip.coverImageId);

  console.log(user.location.name);
  console.log(selectedTrip.country)
  const {lat: lat1, lng: lng1} = findCountryPosition(user.location?.name);
  const {lat: lat2, lng: lng2} = findCountryPosition(selectedTrip.country);
  console.log(lat1, lng1, lat2, lng2)
  
  const distance=getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2)
  console.log(distance, "distance")

  async function saveCoverImage(id) {
    console.log("id", id)
    await tripService.editTrip(tripId, {coverImageId: id});
    setToaster("cover image updated");
    const trips = await tripService.getTrips(user.uid);
    setTrips(trips);
    setShowCoverImageSelectorModal(false);
  }

  return (
    <div className="Trip">
      <div className="Trip-img-container">
        <img src={coverImage && `${coverImage.url}`} className="Trip-img" alt="" />
        <button
          className={`Trip-edit-coverImage ${allImages.length===0 && "disabled"}`}
          onClick={() => setShowCoverImageSelectorModal(true)}
          disabled={allImages.length===0}
          >
          <AddAPhotoIcon fontSize="small" className="Trip-edit-coverImage-icon" /> Edit cover image
        </button>
        <div className="Trip-edit-icon-container" onClick={() => navigate(`/trips/${selectedTrip.id}/edit`)}>
          <EditIcon className="Trip-edit-icon" />
          <div className="tooltip" >Edit trip</div>
        </div>
        <div className={`Trip-title ${cityId !== undefined ? `Trip-title-cityDetails` : ``}`} onClick={() => navigate(`/trips/${selectedTrip.id}`)}>
          <div className="Trip-title-border">
            <div>{selectedTrip.country.toUpperCase()}</div>
            <div className="Trip-distance">{`${Math.round(distance).toLocaleString()} km from home`} </div>
            <div>{getTripTypeIcons(selectedTrip.tripType, "medium")}</div>
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
                <div className={`Trip-visitedCity ${city.cityId === selectedCity?.cityId ? `selected` : ``}`} key={city.cityId}>
                  <Link to={`/trips/${selectedTrip.id}/${city.cityId}`} className="Trip-visitedCityLink" >
                    <LocationOnIcon />
                    <div>{city.cityName}</div>
                  </Link>
                  <div className="Trip-visitedCityIconEdit">
                    <EditIcon
                      fontSize="small"
                      onClick={() => navigate(`/trips/${selectedTrip.id}/${city.cityId}/edit`)} />
                  </div>
                </div>
              )
            })}
          </div>
          <Button onClick={() => navigate(`/trips/${tripId}/addCity`)} variant="outlined">+ Add City</Button>
        </div>
        {cityId === undefined ? <CountryDetails selectedTrip={selectedTrip} /> : <CityDetails selectedCity={selectedCity} />}
        <ImageGrid
          images={selectedCity === undefined ? allImages : cityImages}
          selection={false}
          onClick={(imageId) => navigate(`/trips/${selectedTrip.id}/gallery/${imageId}`)}
          onNewClick={() => setShowFileUploadModal(true)}
          cols={2}
        />
      </div>
      {
        showCoverImageSelectorModal &&
        <CoverImageSelectorModal
          setShowCoverImageSelectorModal={setShowCoverImageSelectorModal}
          images={allImages}
          saveCoverImage={saveCoverImage}
        />
      }
      {showFileUploadModal &&
        <FileUploadModal
          onClose={() => setShowFileUploadModal(false)}
        />
      }
    </div >
  )
}

export default Trip;