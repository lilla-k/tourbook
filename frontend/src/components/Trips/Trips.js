import './Trips.css';
import TripCard from '../TripCard/TripCard.js';
import { useOutletContext } from 'react-router-dom';

function Trips(){
    
    const trips = useOutletContext();

    return(
        <div className="Trips">
            <div className="Trips-title">All tours</div>
            <div className="Trips-container">
                {trips.map(trip => 
                <TripCard 
                id={trip.id}
                name={trip.country}
                type={trip.type}
                image={trip.imgURL}
                startDate={trip.start}
                />)}

            </div>

        </div>

    )
}

export default Trips;