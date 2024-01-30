import './Tours.css';
import TourCard from '../TourCard/TourCard.js';
import { useOutletContext } from 'react-router-dom';

function Tours(){
    
    const tours = useOutletContext();

    return(
        <div className="Tours">
            <div className="Tours-title">All tours</div>
            <div className="Tours-container">
                {tours.map(tour => 
                <TourCard 
                id={tour.id}
                name={tour.destination}
                type={tour.type}
                image={tour.imgURL}
                startDate={tour.start}
                />)}

            </div>

        </div>

    )
}

export default Tours;