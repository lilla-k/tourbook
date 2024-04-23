import './TripCard.css';
import DeleteIcon from '@mui/icons-material/Delete';
import tripService from '../../services/tripService.js'
import {  useOutletContext, Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_BACKEND_API;

function TripCard({tripId, countryName, coverImage, startDate}){

    const {setTrips, setToaster} = useOutletContext();

    async function deleteTrip(){
        await tripService.deleteTrip(tripId);
        setToaster("trip deleted");
        const trips = await tripService.getTrips();
        setTrips(trips);
    }

    return(
        <div className="TripCard">
            <Link to={`/trips/${tripId}`} className="TripCard-info">
                {coverImage?<img src={`${apiUrl}${coverImage.url}`} alt="Trip"/>:<div className="TripCard-img-placeholder"></div>}
                <div className="TripCard-details">
                    <div className="TripCard-name">{countryName}</div>
                    <div>{new Date(startDate).toLocaleDateString("en-EN")}</div>
                </div>
            </Link>
            <DeleteIcon className="TripCard-deleteIcon" onClick={deleteTrip}/>
        </div>
    )
}

export default TripCard;