import './TripCard.css';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal'
import tripService from '../../services/tripService.js'
import {  useOutletContext, Link } from 'react-router-dom';


function TripCard({tripId, countryName, coverImage, startDate}){

    const {setTrips, setToaster, user} = useOutletContext();
    const [deleteModalVisible, setDeleteModalVisible]= useState(false)

    async function deleteTrip(){
        await tripService.deleteTrip(tripId);
        setToaster("trip deleted");
        const trips = await tripService.getTrips(user.uid);
        setTrips(trips);
    }

    function cancelDelete(){
        setDeleteModalVisible(false);
      }
    
      function deleteConfirmation(){
        setDeleteModalVisible(true);
      }

    return(
        <div className="TripCard">
            <Link to={`/trips/${tripId}`} className="TripCard-info">
                {coverImage?<img src={coverImage.url} alt="Trip"/>:<div className="TripCard-img-placeholder"></div>}
                <div className="TripCard-details">
                    <div className="TripCard-name">{countryName}</div>
                    <div>{new Date(startDate).toLocaleDateString("en-EN")}</div>
                </div>
            </Link>
            <DeleteIcon className="TripCard-deleteIcon" onClick={deleteConfirmation}/>
            {deleteModalVisible && <DeleteConfirmationModal onDelete={deleteTrip} onCancel={cancelDelete} type="trip"/>}
        </div>
    )
}

export default TripCard;