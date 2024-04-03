import { useState } from 'react';
import './ImageGrid.css';
import { ImageList, ImageListItem } from '@mui/material';
import FileUploadModal from '../FileUploadModal/FileUploadModal.js';

function ImageGrid({images}) {

  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  return (
    <div className="ImageGrid">
      <ImageList cols={2} rowHeight={164}>
      {images?.map((item) => (
        <ImageListItem key={item.url}>
          <img
            src={process.env.PUBLIC_URL + item.url}
            alt={item.title}
            loading="lazy"
          />
          {/* <div>{item.title}</div> */}
        </ImageListItem>
      ))}
      <div className="ImageGrid-plusBtn" onClick={()=>setShowFileUploadModal(true)}>{images===[]?"Add photos":"+"}</div>
      </ImageList >
      {showFileUploadModal && <FileUploadModal/>}
    </div>
    
  )
}

export default ImageGrid;