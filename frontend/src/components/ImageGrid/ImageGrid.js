import { useState } from 'react';
import './ImageGrid.css';
import { ImageList, ImageListItem } from '@mui/material';
import FileUploadModal from '../FileUploadModal/FileUploadModal.js';

function ImageGrid({images}) {

  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  // process.env.PUBLIC_URL
  return (
    <div className="ImageGrid">
      <ImageList cols={2} rowHeight={164}>
      {images?.map((item) => (
        <ImageListItem key={item.url}>
          <img
            src={item.url}
            alt={item.title}
            loading="lazy"
          />
          {/* <div>{item.title}</div> */}
        </ImageListItem>
      ))}
      <div className="ImageGrid-plusBtn" onClick={()=>setShowFileUploadModal(true)}>{images===[]?"Add photos":"+"}</div>
      </ImageList >
      {showFileUploadModal && <FileUploadModal setShowFileUploadModal={setShowFileUploadModal}/>}
    </div>
    
  )
}

export default ImageGrid;