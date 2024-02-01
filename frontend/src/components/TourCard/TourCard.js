import './TourCard.css';
import {Link} from "react-router-dom";


function TourCard({id, name, image, type, startDate}){

    return(
        <div className="TourCard">
            <Link to={`/tours/${id}`} className="TourCard-info">
                <img src={image}/>
                <div className="TourCard-details">
                    <div className="TourCard-name">{name}</div>
                    <div>{new Date(startDate).toLocaleDateString("en-EN")}</div>
                </div>
            </Link>
        </div>
    )
}

export default TourCard;