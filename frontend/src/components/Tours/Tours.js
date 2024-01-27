import './Tours.css';
import Tour from '../Tour/Tour.js';
import { useOutletContext } from 'react-router-dom';

function Tours(){
    console.log(window.location.pathname);
    const tours = useOutletContext();
    console.log(tours);
    return(
        <div className="Tours">
            <div className="Tours-title">All tours</div>
            <div className="Tours-container">
                {tours.map(tour => 
                <Tour 
                name={tour.destination}
                type={tour.type}
                image={tour.imgURL}
                />)}

            </div>

        </div>

    )
}

export default Tours;