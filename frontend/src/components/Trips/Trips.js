import './Trips.css';
import TripCard from '../TripCard/TripCard.js';
import { useOutletContext, useNavigate} from 'react-router-dom';

function Trips(){
    
    const {trips} = useOutletContext();
    const navigate = useNavigate();
    console.log(trips)

    return(
        <div className="Trips">
            <div className="Trips-title" >My trips</div>
            <div className="Trips-container">
                {trips.length===0 && <div className="Trips-addFirstTrip" onClick={()=>navigate("/addTrip")}>+ Add your first trip</div>}
                {trips.map(trip => 
                <TripCard 
                key={trip.id}
                id={trip.id}
                countryName={trip.country}
                coverImage={trip.images.find(image=> image.id===trip.coverImageId)} //tripcard coverimage!
                startDate={trip.startDate}
                />)}

            </div>

        </div>

    )
}

export default Trips;