import './TripCard.css';
import {Link} from "react-router-dom";


function TripCard({id, countryName, coverImage, startDate}){

    return(
        <div className="TripCard">
            <Link to={`/trips/${id}`} className="TripCard-info">
                {coverImage?<img src={coverImage.url} alt="Trip"/>:<div className="TripCard-img-placeholder"></div>}
                <div className="TripCard-details">
                    <div className="TripCard-name">{countryName}</div>
                    <div>{new Date(startDate).toLocaleDateString("en-EN")}</div>
                </div>
            </Link>
        </div>
    )
}

export default TripCard;