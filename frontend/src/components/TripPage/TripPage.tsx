import React, { useState } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Rating from '@mui/material/Rating';
import Fab from '@mui/material/Fab';

import CityDetails from '../CityDetails/CityDetails.js';
import CountryDetails from '../CountryDetails/CountryDetails.js';
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
import type Image from '../../types/image';

function useTripAndCity() {
  const { tripId, cityId } = useParams();
  const { trips }: { trips: Trip[] } = useOutletContext();
  const trip = trips.find((t) => t.id === tripId);
  const city = trip?.visitedCities?.find((c: City) => cityId === c.cityId);

  if (tripId === undefined || trip === undefined) {
    throw new Error("This trip doesn't exist!");
  }

  if (cityId && city === undefined) {
    throw new Error("This city doesn't exist!");
  }
  return {
    trip, city,
  };
}

function TripPage() {
  const [showCoverImageSelectorModal, setShowCoverImageSelectorModal] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  const navigate = useNavigate();
  const {
    trip, city,
  } = useTripAndCity();

  const {
    setTrips, setToaster, userData,
  }: {
    setTrips: Function, setToaster: Function, userData: UserData
  } = useOutletContext();

  const allImages = trip.images;
  const cityImages = allImages.filter((image) => image.cityId === city?.cityId);
  const coverImage = allImages.find((image) => image.id === trip.coverImageId);

  let distance = 0;
  if (userData.location) {
    const { lat: lat1, lng: lng1 } = findCountryPosition(userData.location?.name);
    const { lat: lat2, lng: lng2 } = findCountryPosition(trip.country);
    distance = getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2);
  }

  async function saveCoverImage(id: string) {
    await tripService.editTrip(userData.uid, trip.id, { coverImageId: id });
    setToaster('cover image updated');
    const tripsFromDB = await tripService.getTrips(userData.uid);
    setTrips(tripsFromDB);
    setShowCoverImageSelectorModal(false);
  }

  async function setRating(value: number | null) {
    if (!value) { return; }
    await tripService.editTrip(userData.uid, trip.id, { rating: value });
    setToaster('Successfully saved rating');
    const tripsFromDB = await tripService.getTrips(userData.uid);
    setTrips(tripsFromDB);
  }

  async function deleteImage(image: Image) {
    await tripService.deleteImage(userData.uid, trip.id, image);
    setToaster('successfully deleted');
    const tripsFromDB = await tripService.getTrips(userData.uid);
    setTrips(tripsFromDB);
    navigate(`/trips/${trip.id}`);
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
          <Fab color="primary" aria-label="edit" onClick={() => navigate(`/trips/${trip.id}/edit`)}>
            <EditIcon color="secondary" />
          </Fab>
          <div className="tooltip">Edit trip</div>
        </div>
        <div
          className="TripPage-title"
        >
          <div className="TripPage-title-border">
            <div>{trip.country.toUpperCase()}</div>
            {distance > 0 && (
              <div className="TripPage-distance">
                {`${Math.round(distance).toLocaleString()} km from home`}
                {' '}
              </div>
            )}
            <div>{getTripTypeIcons(trip.tripType, 'medium')}</div>
            <div className="TripPage-date">{trip.startDate.toLocaleString('en-us', { month: 'short', year: 'numeric' })}</div>
          </div>
        </div>
        <div className="TripPage-heroBottom">
          <Rating value={trip.rating} onChange={(_, rating) => setRating(rating)} className="TripPage-rating" />
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
        <VisitedCities trip={trip} city={city} />
        {city === undefined ? <CountryDetails trip={trip} /> : <CityDetails trip={trip} city={city} />}
        <div className="TripPage-ImageGrid">
          <ImageGrid
            images={city === undefined ? allImages : cityImages}
            onClick={(imageId: string) => navigate(`/trips/${trip.id}/gallery/${imageId}`)}
            onNewClick={() => setShowFileUploadModal(true)}
            onDelete={(image) => deleteImage(image)}
            showTitle
          />
        </div>
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
