import { useState } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Rating from '@mui/material/Rating';

import CityDetails from '../CityDetails/CityDetails.jsx';
import CountryDetails from '../CountryDetails/CountryDetails.jsx';
import ImageGrid from '../ImageGrid/ImageGrid.jsx';
import CoverImageSelectorModal from '../CoverImageSelectorModal/CoverImageSelectorModal.jsx';
import FileUploadModal from '../FileUploadModal/FileUploadModal.jsx';
import getTripTypeIcons from '../TripTypeIcons/tripTypeIcons.jsx';
import tripService from '../../services/tripService.js';
import { findCountryPosition, getDistanceFromLatLonInKm } from '../../utils/location.js';
import VisitedCities from '../VisitedCities/VisitedCities.jsx';
import './TripPage.css';
import '../../style/tooltip.css';



function TripPage() {

  const [showCoverImageSelectorModal, setShowCoverImageSelectorModal] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  const navigate = useNavigate();
  const { trips, setTrips, setToaster, user } = useOutletContext();
  const { tripId, cityId } = useParams();
  const selectedTrip = trips.find(trip => trip.id === tripId);
  if (selectedTrip === undefined) {
    throw new Error("This trip doesn't exist!");
  }
  const selectedCity = selectedTrip?.visitedCities?.find(c => cityId === c.cityId);
  if (selectedCity === undefined && cityId !== undefined) {
    throw new Error("This city doesn't exist!");
  }

  const allImages = selectedTrip.images;
  const cityImages = allImages?.filter(image => image.cityId === cityId);
  const coverImage = allImages?.find(image => image.id === selectedTrip.coverImageId);

  let distance = 0;
  if (user.location) {
    const { lat: lat1, lng: lng1 } = findCountryPosition(user.location?.name);
    const { lat: lat2, lng: lng2 } = findCountryPosition(selectedTrip.country);
    distance = getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2);
  }



  async function saveCoverImage(id) {
    await tripService.editTrip(user.uid, tripId, { coverImageId: id });
    setToaster("cover image updated");
    const trips = await tripService.getTrips(user.uid);
    setTrips(trips);
    setShowCoverImageSelectorModal(false);
  }

  async function setRating(_, value) {
    await tripService.editTrip(user.uid, selectedTrip.id, { rating: value });
    setToaster('Successfully saved rating');
    const trips = await tripService.getTrips(user.uid);
    setTrips(trips);
  }

  return (
    <div className="TripPage">
      <div 
        className="TripPage-hero" 
        style={{backgroundImage: coverImage ? `url(${coverImage.url})` : "linear-gradient(white, var(--light-grey))", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="TripPage-edit-icon-container" onClick={() => navigate(`/trips/${selectedTrip.id}/edit`)}>
          <EditIcon className="TripPage-edit-icon" fontSize="small" />
          <div className="tooltip" >Edit trip</div>
        </div>
        <div className={`TripPage-title ${cityId !== undefined ? `TripPage-title-cityDetails` : ``}`} onClick={() => navigate(`/trips/${selectedTrip.id}`)}>
          <div className="TripPage-title-border">
            <div>{selectedTrip.country.toUpperCase()}</div>
            {distance > 0 && <div className="TripPage-distance">{`${Math.round(distance).toLocaleString()} km from home`} </div>}
            <div>{getTripTypeIcons(selectedTrip.tripType, "medium")}</div>
            <div className="TripPage-date">{selectedTrip.startDate.toLocaleString('en-us', { month: 'short', year: 'numeric' })}</div>
          </div>
        </div>
        <div className="TripPage-heroBottom" >
          <Rating value={selectedTrip.rating} onChange={setRating}className="TripPage-rating"/>
          <button
            className={`TripPage-edit-coverImage ${allImages.length === 0 && "disabled"}`}
            onClick={() => setShowCoverImageSelectorModal(true)}
            disabled={allImages.length === 0}
          >
          <AddAPhotoIcon fontSize="small" className="TripPage-edit-coverImage-icon" /> Edit cover image
        </button>
        </div>
      </div>
      <div className="TripPage-info">
        <VisitedCities selectedTrip={selectedTrip} selectedCity={selectedCity} />
        {cityId === undefined ? <CountryDetails selectedTrip={selectedTrip} /> : <CityDetails selectedTrip={selectedTrip} selectedCity={selectedCity} />}
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
  {
    showFileUploadModal &&
    <FileUploadModal
      onClose={() => setShowFileUploadModal(false)}
    />
  }
    </div >
  )
}

export default TripPage;