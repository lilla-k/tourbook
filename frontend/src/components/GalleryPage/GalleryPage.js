import './GalleryPage.css'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';


function GalleryPage() {

    const { tripId, imageId } = useParams();
    const { trips } = useOutletContext();
    const navigate = useNavigate();
    const selectedTrip = trips.find(trip => trip.id === tripId);
    const selectedImage = selectedTrip.images.find(image => image.id === imageId)
    console.log("selectedImage", selectedImage)
    const indexOfSelectedImage = selectedTrip.images.findIndex(image => image.id === imageId)
    console.log("indexOfSelectedImage", indexOfSelectedImage)



    return (
        <div className="GalleryPage">
            <img className="GalleryPage-selectedImage" alt="hello" src={`${process.env.REACT_APP_BACKEND_API}${selectedImage.url}`}></img>
            <div className="GalleryPage-fixedLayout">
                <div className="GalleryPage-header">
                    <div className="GalleryPage-details">
                        <div className="GalleryPage-country">{selectedTrip.country}</div>
                        <div className="GalleryPage-year">{new Date(selectedTrip.startDate).getFullYear()}</div>
                        <div>{selectedImage.title}</div>
                    </div>
                    <div>
                        <CloseIcon />
                    </div>
                </div>
                <div className="GalleryPage-buttons">
                    <Button
                        variant="contained"
                        onClick={() => navigate(`/trips/${selectedTrip.id}/gallery/${selectedTrip.images[indexOfSelectedImage - 1].id}`)}
                    >
                        <ArrowBackIosIcon />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate(`/trips/${selectedTrip.id}/gallery/${selectedTrip.images[indexOfSelectedImage + 1].id}`)}
                    >
                        <ArrowForwardIosIcon />
                    </Button>
                </div>
                <div>Pager</div>
            </div>
        </div>

    )
}

export default GalleryPage