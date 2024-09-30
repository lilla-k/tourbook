import { useState } from 'react';
import './ImageGrid.css';
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import FileUploadModal from '../FileUploadModal/FileUploadModal.js';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import tripService from '../../services/tripService.js';

function ImageGrid({ images, selection, onClick, onNewClick, cols }) {

  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [selectedImageToDelete, setSelectedImageToDelete] = useState(null);

  const { setTrips, setToaster, user } = useOutletContext();
  const coverImageSelecion = selection;
  const navigate = useNavigate();
  const { tripId } = useParams();

  async function deleteImage() {
    console.log("delete image" + selectedImageToDelete);
    await tripService.deleteImage(tripId, selectedImageToDelete);
    setSelectedImageToDelete(null)
    setToaster("successfully deleted");
    const trips = await tripService.getTrips(user.uid);
    setTrips(trips);
    navigate(`/trips/${tripId}`);
  }

  function deleteConfirmation(imageId) {
    setSelectedImageToDelete(imageId);
  }

  function cancelDelete() {
    setSelectedImageToDelete(null);
  }

  return (
    <div className="ImageGrid">
      <ImageList cols={cols} rowHeight={250}>
        {images?.map((image) => (
          <ImageListItem key={image.url}>
            <img
              className="ImageGrid-image"
              src={`${image.url}`}
              alt={image.title}
              loading="lazy"
              style={{ cursor: 'pointer', height: '100%' }}
              onClick={() => onClick(image.id)}
            />
            {!coverImageSelecion && <DeleteIcon className="ImageGrid-deleteIcon" onClick={()=>deleteConfirmation(image)} />}
            {!coverImageSelecion &&
              <ImageListItemBar
                title={image.title}
              />}

          </ImageListItem>
        ))}
        {!coverImageSelecion && <div className="ImageGrid-plusBtn" onClick={onNewClick}>{Object.keys(images).length === 0 ? "Add photos" : "+"}</div>}
      </ImageList >
      {showFileUploadModal && <FileUploadModal setShowFileUploadModal={setShowFileUploadModal} useAsCoverImage={false} />}
      {selectedImageToDelete && <DeleteConfirmationModal onDelete={deleteImage} onCancel={cancelDelete} type="image" />}
    </div>

  )
}

export default ImageGrid;