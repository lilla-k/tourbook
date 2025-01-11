import './TripCard.css';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal'
import tripService from '../../services/tripService.js'
import { useOutletContext, Link } from 'react-router-dom';
import getTripTypeIcons from '../TripTypeIcons/tripTypeIcons.js';


function TripCard({ tripId, tripType, countryName, coverImage, startDate }) {

    const { setTrips, setToaster, user } = useOutletContext();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    async function deleteTrip() {
        await tripService.deleteTrip(tripId);
        setToaster("trip deleted");
        const trips = await tripService.getTrips(user.uid);
        setTrips(trips);
    }

    function cancelDelete() {
        setDeleteModalVisible(false);
    }

    function deleteConfirmation(event) {
        setDeleteModalVisible(true);
        event.preventDefault();

    }

    return (
        <div className="TripCard">
            <Link to={`/trips/${tripId}`} className="TripCard-link">
                {coverImage ?
                    <img className="TripCard-img" src={coverImage.url} alt="Trip" /> :
                    <div className="TripCard-img TripCard-img-placeholder"><div className="TripCard-img-placeholderIcon" >{getTripTypeIcons(tripType)}</div></div>
                }
                <div className="TripCard-details">
                    <div className="TripCard-name">{countryName}</div>
                    <div>{startDate.toLocaleDateString("en-EN")}</div>
                     <DeleteIcon className="TripCard-deleteIcon" onClick={deleteConfirmation} />
                </div>
            </Link>
            {deleteModalVisible && <DeleteConfirmationModal onDelete={deleteTrip} onCancel={cancelDelete} type="trip" />}
        </div>
    )
}

export default TripCard;