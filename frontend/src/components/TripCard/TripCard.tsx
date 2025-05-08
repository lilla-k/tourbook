import './TripCard.css';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useOutletContext, Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.jsx';
import tripService from '../../services/tripService.js';
import getTripTypeIcons from '../TripTypeIcons/tripTypeIcons.jsx';

import type Context from '../../types/context.js';
import type { Trip } from '../../types/trip';

function TripCard({ trip }: { trip: Trip }) {
  const { setTrips, setToaster, userData } = useOutletContext<Context>();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const coverImage = trip.images.find((image) => image.id === trip.coverImageId);

  async function deleteTrip() {
    await tripService.deleteTrip(userData.uid, trip.id);
    setToaster('trip deleted');
    const trips = await tripService.getTrips(userData.uid);
    setTrips(trips);
  }

  function cancelDelete() {
    setDeleteModalVisible(false);
  }

  function deleteConfirmation(event: React.MouseEvent) {
    setDeleteModalVisible(true);
    event.preventDefault();
  }

  return (
    <div className="TripCard">
      <Link to={`/trips/${trip.id}`} className="TripCard-link">
        {coverImage
          ? <img className="TripCard-img" src={coverImage.url} alt="Trip" />
          : <div className="TripCard-img TripCard-img-placeholder"><div className="TripCard-img-placeholderIcon">{getTripTypeIcons(trip.tripType)}</div></div>}
        {trip.rating === 5 && <div className="TripCard-favorite">Favorite</div>}
        <div className="TripCard-details">
          <div className="TripCard-name">{trip.country}</div>
          <div>{trip.startDate.toLocaleDateString('en-EN')}</div>
          <Rating value={trip.rating} readOnly size="small" />
          <DeleteIcon className="TripCard-deleteIcon" onClick={(event) => deleteConfirmation(event)} />
        </div>
      </Link>
      {deleteModalVisible && <DeleteConfirmationModal onDelete={() => deleteTrip()} onCancel={() => cancelDelete()} type="trip" />}
    </div>
  );
}

export default TripCard;
