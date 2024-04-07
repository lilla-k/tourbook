import { useState } from 'react';
import { useParams, useOutletContext } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import './FileUploadModal.css';
import tripService from '../../services/tripService.js'

function FileUploadModal({ setShowFileUploadModal }) {

  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");

  const { setTrips, setToaster } = useOutletContext();
  const { tripId } = useParams();

  console.log("fileupload")

  function changeFileHandler(e) {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  const photoData = {
    url: file,
    title: title,
    cover: false
  }

  async function postPhotoData(){
    const response = await tripService.postPhoto(tripId, photoData);
    if (response==="photo data posted"){
      setToaster("successfully uploaded");
      const trips = await tripService.getTrips();
      setTrips(trips);
      setShowFileUploadModal(false);
    }
  }

  function uploadPhoto() {
    postPhotoData();
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
        <img src={file} alt={file} className="FileUploadModal-image" />
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