import './GalleryPage.css'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

function GalleryPage() {

    const { tripId, imageId } = useParams();
    console.log(imageId, "imageId")
    const { trips } = useOutletContext();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(true);
    const selectedTrip = trips.find(trip => trip.id === tripId);
    console.log(selectedTrip, "selectedTrip")
    const numberOfImages=selectedTrip.images.length;
    const selectedImage = selectedTrip.images.find(image => image.id === imageId)
    console.log(selectedImage, "selectedImage")
    const indexOfSelectedImage = selectedTrip.images.findIndex(image => image.id === imageId)

    useEffect(() => {
        setLoading(true);
    }, [imageId])


    function showPreviousImage(){
        if(indexOfSelectedImage>0){
            navigate(`/trips/${selectedTrip.id}/gallery/${selectedTrip.images[indexOfSelectedImage - 1].id}`)
        } else {
            navigate(`/trips/${selectedTrip.id}/gallery/${selectedTrip.images[numberOfImages - 1].id}`)
        }  
    }

    function showNextImage(){
        if(indexOfSelectedImage+1<numberOfImages){
            navigate(`/trips/${selectedTrip.id}/gallery/${selectedTrip.images[indexOfSelectedImage + 1].id}`)
        } else {
            navigate(`/trips/${selectedTrip.id}/gallery/${selectedTrip.images[0].id}`)
        }

    }


    return (
        <div className="GalleryPage">
            <img className="GalleryPage-selectedImage" alt="hello" src={selectedImage.url} onLoad={() => setLoading(false)} />
            <Loading hidden={!loading}/>
            <div className="GalleryPage-fixedLayout">
                <div className="GalleryPage-header">
                    <div className="GalleryPage-details">
                        <div className="GalleryPage-country">{selectedTrip.startDate.getFullYear()} - {selectedTrip.country}</div>
                        <div>{selectedImage.title}</div>
                    </div>
                    <div className="GalleryPage-closeBtn">
                        <CloseIcon onClick={()=>navigate(`/trips/${selectedTrip.id}`)}/>
                    </div>
                </div>
                <div className="GalleryPage-buttons">
                    <Button
                        variant="text"
                        onClick={showPreviousImage}
                    >
                        <ArrowBackIosIcon />
                    </Button>
                    <Button
                        variant="text"
                        onClick={showNextImage}
                    >
                        <ArrowForwardIosIcon />
                    </Button>
                </div>
                <div className="GalleryPage-pager">{`${indexOfSelectedImage+1}/${numberOfImages}`}</div>
            </div>
        </div>

    )
}

export default GalleryPage