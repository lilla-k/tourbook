import './TripCard.css';
import {Link} from "react-router-dom";


function TripCard({id, name, image, startDate}){

    return(
        <div className="TripCard">
            <Link to={`/trips/${id}`} className="TripCard-info">
                <img src={process.env.PUBLIC_URL +image} alt="Trip"/>
                <div className="TripCard-details">
                    <div className="TripCard-name">{name}</div>
                    <div>{new Date(startDate).toLocaleDateString("en-EN")}</div>
                </div>
            </Link>
        </div>
    )
}

export default TripCard;