import { useState } from 'react';
import './ImageGrid.css';
import { ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import FileUploadModal from '../FileUploadModal/FileUploadModal.js';

function ImageGrid({images, selection, onClick, onNewClick, cols}) {

  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const coverImageSelecion=selection


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
            style={{ cursor: 'pointer', height: '100%'}}
            onClick={()=>onClick(image.id)}
          />
          {!coverImageSelecion&&
          <ImageListItemBar
            title={image.title}
            
          />}
        </ImageListItem>
      ))}
      {!coverImageSelecion && <div className="ImageGrid-plusBtn" onClick={onNewClick}>{Object.keys(images).length===0?"Add photos":"+"}</div>}
      </ImageList >
      {showFileUploadModal && <FileUploadModal setShowFileUploadModal={setShowFileUploadModal} useAsCoverImage={false}/>}
    </div>
    
  )
}

export default ImageGrid;