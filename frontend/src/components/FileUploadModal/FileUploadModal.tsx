import { useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import CloseIcon from '@mui/icons-material/Close';
import './FileUploadModal.css';
import '../../style/modal.css';
import tripService from '../../services/tripService.js';

import type { UserData } from '../../types/user.js';

function useTripId() {
  const { tripId } = useParams();
  if (tripId === undefined) {
    throw new Error("This trip doesn't exist");
  }
  return tripId;
}

function FileUploadModal({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [title, setTitle] = useState('');

  const { setTrips, setToaster, userData }: { setTrips: Function, setToaster: Function, userData: UserData } = useOutletContext();
  const { cityId } = useParams();
  const tripId = useTripId();

  function changeFileHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
  }

  async function uploadImage(id: string, f: File) {
    const { imageId, url } = await tripService.uploadImage(userData.uid, id, f);
    await tripService.postImageData(userData.uid, id, {
      id: imageId, url, title, cityId: cityId === undefined ? null : cityId,
    });
    setToaster('image uploaded');
    const trips = await tripService.getTrips(userData.uid);
    setTrips(trips);
    onClose();
  }

  return (
    <div className="Modal-background">
      <div className="Modal-content">
        <div className="Modal-header">
          <div>Select a photo</div>
          <button className="Modal-closeBtn" type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div
          className="FileUploadModal-selectorContainer"
          style={{
            backgroundImage: `url(${previewUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center',
          }}
        >
          <div className={`FileUploadModal-selector ${previewUrl ? 'FileUploadModal-selector-selected' : ''}`}>
            <PhotoSizeSelectActualIcon fontSize="small" />
            <div className="FileUploadModal-selector-title">Select photo</div>
            <div className="FileUploadModal-selector-size">Max file size 5mb</div>
          </div>
          <input type="file" onChange={changeFileHandler} />
        </div>
        <div className="FileUploadModal-title">
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            size="small"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="FileUploadModal-saveButton">
          <Button
            variant="outlined"
            onClick={() => file && uploadImage(tripId, file)}
            disabled={!file}
          >
            Upload image
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FileUploadModal;
