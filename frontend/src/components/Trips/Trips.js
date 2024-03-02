import './Trips.css';
import TripCard from '../TripCard/TripCard.js';
import { useOutletContext } from 'react-router-dom';

function Trips(){
    
    const [trips] = useOutletContext();

    return(
        <div className="Trips">
            <div className="Trips-title">My trips</div>
            <div className="Trips-container">
                {trips.map(trip => 
                <TripCard 
                key={trip.id}
                id={trip.id}
                countryName={trip.country}
                image={trip.images[0]}            //ha nem töltött fel képet?
                startDate={trip.startDate}
                />)}

            </div>

        </div>

    )
}

export default Trips;