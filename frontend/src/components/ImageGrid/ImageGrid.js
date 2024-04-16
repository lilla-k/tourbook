import { useState } from 'react';
import './ImageGrid.css';
import { ImageList, ImageListItem } from '@mui/material';
import FileUploadModal from '../FileUploadModal/FileUploadModal.js';

function ImageGrid({images, selected}) {

  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  console.log(images)
  return (
    <div className="ImageGrid">
      <ImageList cols={2} rowHeight={164}>
      {images?.map((item) => (
        <ImageListItem key={item.url}>
          <img
            src={`http://localhost:3001/${item.url}`}
            alt={item.title}
            loading="lazy"
          />
          {/* <div>{item.title}</div> */}
        </ImageListItem>
      ))}
      {!selected && <div className="ImageGrid-plusBtn" onClick={()=>setShowFileUploadModal(true)}>{images===[]?"Add photos":"+"}</div>}
      </ImageList >
      {showFileUploadModal && <FileUploadModal setShowFileUploadModal={setShowFileUploadModal}/>}
    </div>
    
  )
}

export default ImageGrid;