import { useState } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import CityDetails from '../CityDetails/CityDetails.js';
import CountryDetails from '../CountryDetails/CountryDetails.js';
import ImageGrid from '../ImageGrid/ImageGrid.js';
import CoverImageSelectorModal from '../CoverImageSelectorModal/CoverImageSelectorModal.js';
import FileUploadModal from '../FileUploadModal/FileUploadModal.js';
import getTripTypeIcons from '../TripTypeIcons/tripTypeIcons.js';
import tripService from '../../services/tripService.js';
import {findCountryPosition, getDistanceFromLatLonInKm} from '../../utils/location.js';
import VisitedCities from '../VisitedCities/VisitedCities.js';
import './TripPage.css';
import '../../style/tooltip.css';



function TripPage() {

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

  let distance = 0;
  if (user.location){
    const {lat: lat1, lng: lng1} = findCountryPosition(user.location?.name);
    const {lat: lat2, lng: lng2} = findCountryPosition(selectedTrip.country);
    distance = getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2);
  }

  

  async function saveCoverImage(id) {
    console.log("id", id)
    await tripService.editTrip(tripId, {coverImageId: id});
    setToaster("cover image updated");
    const trips = await tripService.getTrips(user.uid);
    setTrips(trips);
    setShowCoverImageSelectorModal(false);
  }

  return (
    <div className="TripPage">
      <div className="TripPage-img-container">
        <img src={coverImage && `${coverImage.url}`} className="TripPage-img" alt="" />
        <button
          className={`TripPage-edit-coverImage ${allImages.length===0 && "disabled"}`}
          onClick={() => setShowCoverImageSelectorModal(true)}
          disabled={allImages.length===0}
          >
          <AddAPhotoIcon fontSize="small" className="TripPage-edit-coverImage-icon" /> Edit cover image
        </button>
        <div className="TripPage-edit-icon-container" onClick={() => navigate(`/trips/${selectedTrip.id}/edit`)}>
          <EditIcon className="TripPage-edit-icon" />
          <div className="tooltip" >Edit trip</div>
        </div>
        <div className={`TripPage-title ${cityId !== undefined ? `TripPage-title-cityDetails` : ``}`} onClick={() => navigate(`/trips/${selectedTrip.id}`)}>
          <div className="TripPage-title-border">
            <div>{selectedTrip.country.toUpperCase()}</div>
            {distance>0 && <div className="TripPage-distance">{`${Math.round(distance).toLocaleString()} km from home`} </div>}
            <div>{getTripTypeIcons(selectedTrip.tripType, "medium")}</div>
            <div className="TripPage-date">{new Date(selectedTrip.startDate).toLocaleString('en-us', { month: 'short', year: 'numeric' })}</div>
          </div>
        </div>
      </div>
      <div className="TripPage-info">
        <VisitedCities selectedTrip={selectedTrip} selectedCity={selectedCity}/>
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

export default TripPage;