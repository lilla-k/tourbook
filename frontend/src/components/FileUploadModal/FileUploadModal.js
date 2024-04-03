import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import './FileUploadModal.css';

function FileUploadModal() {

  const [file, setFile] = useState("");
  const [title, setTitle] = useState("")

  console.log("fileupload")

  function chooseFileHandler(e) {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  function postPhotoData() {

  }


  return (
    <div className="FileUploadModal-background">
      <div className="FileUploadModal-content">
        <div className="FileUploadModal-selector">
          <PhotoSizeSelectActualIcon fontSize="large"/>
          <div className="FileUploadModal-selector-title">Select photo</div>
          <div className="FileUploadModal-selector-size">Maximum file size 5mb</div>
          <input type="file" onChange={chooseFileHandler} />
        </div>
        <img src={file} className="FileUploadModal-image" />
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
          <Button variant="outlined" onClick={() => postPhotoData()} >Upload photo</Button>
        </div>
      </div>
    </div>
  )

}

export default FileUploadModal;