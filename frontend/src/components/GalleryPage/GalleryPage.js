import './GalleryPage.css'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';


function GalleryPage() {

    const { tripId, imageId } = useParams();
    const { trips } = useOutletContext();
    const navigate = useNavigate();
    const selectedTrip = trips.find(trip => trip.id === tripId);
    const selectedImage = selectedTrip.images.find(image => image.id === imageId)
    console.log("selectedImage", selectedImage)
    const indexOfSelectedImage = selectedTrip.images.findIndex(image=>image.id===imageId)
    console.log("indexOfSelectedImage", indexOfSelectedImage)


    return (
        <div className="GalleryPage">
            <div>
                <div className="GalleryPage-country">{selectedTrip.country}</div>
                <div>{selectedTrip.startDate}</div>
                <div>{selectedImage.title}</div>
            </div>

            <img className="GalleryPage-selectedImage" alt="hello" src={`${process.env.REACT_APP_BACKEND_API}${selectedImage.url}`}></img>
            <button onClick={() =>navigate(`/trips/${selectedTrip.id}/gallery/${selectedTrip.images[indexOfSelectedImage+1].id}`)} >+</button>
        </div>
    )
}

export default GalleryPage