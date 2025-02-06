import { useOutletContext, useNavigate} from 'react-router-dom';
import TripCard from '../TripCard/TripCard.js';
import './TripsPage.css';

function TripsPage(){
    
    const {trips} = useOutletContext();
    const navigate = useNavigate();

    return(
        <div className="TripsPage">
            <div className="TripsPage-title" >My trips</div>
            <div className="TripsPage-container">
                {trips.length===0 && <div className="TripsPage-addFirstTrip" onClick={()=>navigate("/addTrip")}>+ Add your first trip</div>}
                {trips.map(trip => 
                <TripCard 
                key={trip.id}
                tripId={trip.id}
                tripType={trip.tripType}
                countryName={trip.country}
                rating={trip.rating}
                coverImage={trip.images.find(image=> image.id===trip.coverImageId)} 
                startDate={trip.startDate}
                />)}

            </div>

        </div>

    )
}

export default TripsPage;