import React, { useState } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Rating from '@mui/material/Rating';
import Fab from '@mui/material/Fab';

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

import type { Trip } from '../../types/trip';
import type City from '../../types/city';
import type { UserData } from '../../types/user';

function useSafeParams() {
  const { tripId, cityId } = useParams();
  const { trips }: { trips: Trip[] } = useOutletContext();
  const selectedTrip = trips.find((trip) => trip.id === tripId);
  const selectedCity = selectedTrip?.visitedCities?.find((c: City) => cityId === c.cityId);

  if (tripId === undefined || selectedTrip === undefined) {
    throw new Error("This trip doesn't exist!");
  }

  if (cityId && selectedCity === undefined) {
    throw new Error("This city doesn't exist!");
  }
  return {
    tripId, cityId, selectedTrip, selectedCity,
  };
}

function TripPage() {
  const [showCoverImageSelectorModal, setShowCoverImageSelectorModal] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  const navigate = useNavigate();
  const {
    tripId, cityId, selectedTrip, selectedCity,
  } = useSafeParams();

  const {
    setTrips, setToaster, userData,
  }: {
    setTrips: Function, setToaster: Function, userData: UserData
  } = useOutletContext();

  const allImages = selectedTrip.images;
  const cityImages = allImages.filter((image) => image.cityId === cityId);
  const coverImage = allImages.find((image) => image.id === selectedTrip.coverImageId);

  let distance = 0;
  if (userData.location) {
    const { lat: lat1, lng: lng1 } = findCountryPosition(userData.location?.name);
    const { lat: lat2, lng: lng2 } = findCountryPosition(selectedTrip.country);
    distance = getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2);
  }

  async function saveCoverImage(id: string) {
    // if (tripId === undefined) { return; }
    await tripService.editTrip(userData.uid, tripId, { coverImageId: id });
    setToaster('cover image updated');
    const tripsFromDB = await tripService.getTrips(userData.uid);
    setTrips(tripsFromDB);
    setShowCoverImageSelectorModal(false);
  }

  async function setRating(value: number | null) {
    if (!value) { return; }
    await tripService.editTrip(userData.uid, selectedTrip.id, { rating: value });
    setToaster('Successfully saved rating');
    const tripsFromDB = await tripService.getTrips(userData.uid);
    setTrips(tripsFromDB);
  }

  return (
    <div className="TripPage">
      <div
        className="TripPage-hero"
        style={{
          backgroundImage: coverImage ? `url(${coverImage.url})` : 'linear-gradient(white, var(--light-grey))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="TripPage-edit-icon-container">
          <Fab color="primary" aria-label="edit" onClick={() => navigate(`/trips/${selectedTrip.id}/edit`)}>
            <EditIcon color="secondary" />
          </Fab>
          <div className="tooltip">Edit trip</div>
        </div>
        <div
          className={`TripPage-title ${cityId !== undefined ? 'TripPage-title-cityDetails' : ''}`}
          onClick={() => navigate(`/trips/${selectedTrip.id}`)}
        >
          <div className="TripPage-title-border">
            <div>{selectedTrip.country.toUpperCase()}</div>
            {distance > 0 && (
              <div className="TripPage-distance">
                {`${Math.round(distance).toLocaleString()} km from home`}
                {' '}
              </div>
            )}
            <div>{getTripTypeIcons(selectedTrip.tripType, 'medium')}</div>
            <div className="TripPage-date">{selectedTrip.startDate.toLocaleString('en-us', { month: 'short', year: 'numeric' })}</div>
          </div>
        </div>
        <div className="TripPage-heroBottom">
          <Rating value={selectedTrip.rating} onChange={(_, rating) => setRating(rating)} className="TripPage-rating" />
          <button
            type="button"
            className={`TripPage-edit-coverImage ${allImages.length === 0 && 'disabled'}`}
            onClick={() => setShowCoverImageSelectorModal(true)}
            disabled={allImages.length === 0}
          >
            <AddAPhotoIcon fontSize="small" className="TripPage-edit-coverImage-icon" />
            {' '}
            Edit cover image
          </button>
        </div>
      </div>
      <div className="TripPage-info">
        <VisitedCities selectedTrip={selectedTrip} selectedCity={selectedCity} />
        {cityId === undefined ? <CountryDetails selectedTrip={selectedTrip} /> : <CityDetails selectedTrip={selectedTrip} selectedCity={selectedCity} />}
        <ImageGrid
          images={selectedCity === undefined ? allImages : cityImages}
          selection={false}
          onClick={(imageId: string) => navigate(`/trips/${selectedTrip.id}/gallery/${imageId}`)}
          onNewClick={() => setShowFileUploadModal(true)}
          cols={2}
        />
      </div>
      {
        showCoverImageSelectorModal
        && (
          <CoverImageSelectorModal
            setShowCoverImageSelectorModal={setShowCoverImageSelectorModal}
            images={allImages}
            saveCoverImage={(imageId: string) => saveCoverImage(imageId)}
          />
        )
      }
      {
        showFileUploadModal
        && (
          <FileUploadModal
            onClose={() => setShowFileUploadModal(false)}
          />
        )
      }
    </div>
  );
}

export default TripPage;
