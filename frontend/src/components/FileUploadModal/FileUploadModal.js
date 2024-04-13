import { useState } from 'react';
import { useParams, useOutletContext } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import './FileUploadModal.css';
import tripService from '../../services/tripService.js'

function FileUploadModal({ setShowFileUploadModal }) {

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("");

  const { setTrips, setToaster } = useOutletContext();
  const { tripId } = useParams();


  function changeFileHandler(e) {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function postPhotoData(imagePath){
    const photoData = {
      url: imagePath,
      title: title,
      cover: false
    }
    const response = await tripService.postPhoto(tripId, photoData);
    if (response==="photo data posted"){
      setToaster("successfully uploaded");
      const trips = await tripService.getTrips();
      setTrips(trips);
      setShowFileUploadModal(false);
    }
  }

  async function uploadPhoto(){
    console.log(1)
    const formData = new FormData();
    formData.append('file', file);
    const path = await tripService.uploadPhoto(tripId, formData);
    postPhotoData(path);
  }



  return (
    <div className="FileUploadModal-background">
      <div className="FileUploadModal-content">
        <div className="FileUploadModal-selector">
          <PhotoSizeSelectActualIcon fontSize="large" />
          <div className="FileUploadModal-selector-title">Select photo</div>
          <div className="FileUploadModal-selector-size">Maximum file size 5mb</div>
          <input type="file" onChange={changeFileHandler} />
        </div>
        {previewUrl && <img src={previewUrl} alt="Preview" className="FileUploadModal-preview" />}
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
          <Button variant="outlined" onClick={() => uploadPhoto()} >Upload photo</Button>
        </div>
      </div>
    </div>
  )

}

export default FileUploadModal;