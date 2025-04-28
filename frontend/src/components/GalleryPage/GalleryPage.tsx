import './GalleryPage.css';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading.jsx';
import type Context from '../../types/context.js';

function useTrip() {
  const { tripId } = useParams();
  const { trips } = useOutletContext<Context>();
  const trip = trips.find((t) => t.id === tripId);
  if (trip === undefined) {
    throw new Error("This trip doesn't exist!");
  }
  return trip;
}

function GalleryPage() {
  const { imageId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const trip = useTrip();
  const numberOfImages = trip.images.length;
  const selectedImage = trip.images.find((image) => image.id === imageId);
  if (selectedImage === undefined) {
    throw new Error("This image doesn't exist!");
  }
  const indexOfSelectedImage = trip.images.findIndex((image) => image.id === imageId);

  useEffect(() => {
    setLoading(true);
  }, [imageId]);

  function showPreviousImage() {
    if (indexOfSelectedImage > 0) {
      navigate(`/trips/${trip.id}/gallery/${trip.images[indexOfSelectedImage - 1].id}`);
    } else {
      navigate(`/trips/${trip.id}/gallery/${trip.images[numberOfImages - 1].id}`);
    }
  }

  function showNextImage() {
    if (indexOfSelectedImage + 1 < numberOfImages) {
      navigate(`/trips/${trip.id}/gallery/${trip.images[indexOfSelectedImage + 1].id}`);
    } else {
      navigate(`/trips/${trip.id}/gallery/${trip.images[0].id}`);
    }
  }

  return (
    <div className="GalleryPage">
      <img className="GalleryPage-selectedImage" alt="hello" src={selectedImage.url} onLoad={() => setLoading(false)} />
      <Loading hidden={!loading} />
      <div className="GalleryPage-fixedLayout">
        <div className="GalleryPage-header">
          <div className="GalleryPage-details">
            <div className="GalleryPage-country">
              {trip.startDate.getFullYear()}
              {' '}
              -
              {' '}
              {trip.country}
            </div>
            <div>{selectedImage.title}</div>
          </div>
          <div className="GalleryPage-closeBtn">
            <CloseIcon onClick={() => navigate(`/trips/${trip.id}`)} />
          </div>
        </div>
        <div className="GalleryPage-buttons">
          <Button
            variant="text"
            onClick={() => showPreviousImage()}
          >
            <ArrowBackIosIcon />
          </Button>
          <Button
            variant="text"
            onClick={() => showNextImage()}
          >
            <ArrowForwardIosIcon />
          </Button>
        </div>
        <div className="GalleryPage-pager">{`${indexOfSelectedImage + 1}/${numberOfImages}`}</div>
      </div>
    </div>

  );
}

export default GalleryPage;
