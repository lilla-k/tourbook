import { useState, useRef, useLayoutEffect } from 'react';
import './ImageGrid.css';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.jsx';
import tripService from '../../services/tripService.js';

import type Image from '../../types/image';
import type Context from '../../types/context.js';

function ImageGrid({
  images, selection, onClick, onNewClick, tripId,
}: {
  images: Image[], selection: boolean, onClick: (imageId: string) => void, onNewClick?: () => void, tripId: string
}) {
  const ref = useRef<null | HTMLDivElement>(null);
  const [imageGridWidth, setImageGridWidth] = useState(0);
  const [selectedImageToDelete, setSelectedImageToDelete] = useState<Image | null>(null);

  const { setTrips, setToaster, userData } = useOutletContext<Context>();
  const coverImageSelecion = selection;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      setImageGridWidth(width);
    }
  }, []);

  async function deleteImage(image: Image) {
    await tripService.deleteImage(userData.uid, tripId, image);
    setSelectedImageToDelete(null);
    setToaster('successfully deleted');
    const tripsFromDB = await tripService.getTrips(userData.uid);
    setTrips(tripsFromDB);
    navigate(`/trips/${tripId}`);
  }

  function deleteConfirmation(image: Image) {
    setSelectedImageToDelete(image);
  }

  function cancelDelete() {
    setSelectedImageToDelete(null);
  }

  return (
    <div className="ImageGrid" ref={ref}>
      <ImageList cols={images.length === 0 || imageGridWidth > 480 ? 2 : 1} rowHeight={250}>
        {images?.map((image) => (
          <ImageListItem key={image.url} onClick={() => onClick(image.id)}>
            <img
              className="ImageGrid-image"
              src={`${image.url}`}
              alt={image.title}
              loading="lazy"
              style={{ cursor: 'pointer', height: '100%', objectFit: 'cover' }}
            />
            {!coverImageSelecion && <DeleteIcon className="ImageGrid-deleteIcon" onClick={() => deleteConfirmation(image)} />}
            {!coverImageSelecion
              && (
                <ImageListItemBar
                  title={image.title}
                />
              )}

          </ImageListItem>
        ))}
        {!coverImageSelecion
          && <button type="button" className="ImageGrid-plusBtn" onClick={onNewClick}>{Object.keys(images).length === 0 ? 'Add photos' : '+'}</button>}
      </ImageList>
      {selectedImageToDelete && <DeleteConfirmationModal onDelete={() => deleteImage(selectedImageToDelete)} onCancel={() => cancelDelete()} type="image" />}
    </div>

  );
}

export default ImageGrid;
