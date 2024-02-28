import './TripCard.css';
import {Link} from "react-router-dom";


function TripCard({id, countryName, image, startDate}){

    return(
        <div className="TripCard">
            <Link to={`/trips/${id}`} className="TripCard-info">
                <img src={process.env.PUBLIC_URL + image.url} alt="Trip"/>
                <div className="TripCard-details">
                    <div className="TripCard-name">{countryName}</div>
                    <div>{new Date(startDate).toLocaleDateString("en-EN")}</div>
                </div>
            </Link>
        </div>
    )
}

export default TripCard;