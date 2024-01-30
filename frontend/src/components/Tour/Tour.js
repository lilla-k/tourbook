import './Tour.css';

import { useParams, useOutletContext } from 'react-router-dom';


function Tour(){

    let {tourId} = useParams();
    const tours = useOutletContext();
    const selectedDestination = tours.find(tour=>tour.id===parseInt(tourId));
        

    return(
        <div className="Tour">
            <img src={selectedDestination.imgURL} className="Tour-img"/>
            <div>Destination: <span>{selectedDestination.destination}</span></div>
        </div>
    )
}

export default Tour;