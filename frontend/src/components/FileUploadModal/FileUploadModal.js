import { useState } from 'react';
import { useParams, useOutletContext } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import CloseIcon from '@mui/icons-material/Close';
import './FileUploadModal.css';
import tripService from '../../services/tripService.js'

function FileUploadModal({ setShowFileUploadModal }) {

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("");

  const { setTrips, setToaster } = useOutletContext();
  const { tripId, cityId } = useParams();


  function changeFileHandler(e) {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  }


  async function uploadImage() {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('cityId', cityId);
    const { id } = await tripService.uploadImage(tripId, formData);
    console.log("image id", id);
    setToaster("image uploaded");
    const trips = await tripService.getTrips();
    setTrips(trips);
    setShowFileUploadModal(false);
  }



  return (
    <div className="FileUploadModal-background">
      <div className="FileUploadModal-content">
        <div className="FileUploadModal-close" onClick={() => setShowFileUploadModal(false)}>
          <CloseIcon fontSize="small" className="FileUploadModal-closeIcon" />
        </div>
        <div
          className="FileUploadModal-selectorContainer"
          style={{ backgroundImage: `url(${previewUrl})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }}
        >
          <div className={`FileUploadModal-selector ${previewUrl ? `FileUploadModal-selector-selected` : ``}`}>
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
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="FileUploadModal-saveButton">
          <Button variant="outlined" onClick={() => uploadImage()} >Upload image</Button>
        </div>
      </div>
    </div>
  )

}

export default FileUploadModal;