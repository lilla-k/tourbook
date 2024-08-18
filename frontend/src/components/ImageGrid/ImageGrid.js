import { useState } from 'react';
import './ImageGrid.css';
import { ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import FileUploadModal from '../FileUploadModal/FileUploadModal.js';

function ImageGrid({images, selection, onClick, cols}) {

  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const coverImageSelecion=selection
  console.log(onClick)

  return (
    <div className="ImageGrid">
      <ImageList cols={cols} rowHeight={250}>
      {images?.map((image) => (
        <ImageListItem key={image.url}>
          <img
            className="ImageGrid-image"
            src={`${process.env.REACT_APP_BACKEND_API}${image.url}`}
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
      {!coverImageSelecion && <div className="ImageGrid-plusBtn" onClick={()=>setShowFileUploadModal(true)}>{Object.keys(images).length===0?"Add photos":"+"}</div>}
      </ImageList >
      {showFileUploadModal && <FileUploadModal setShowFileUploadModal={setShowFileUploadModal} useAsCoverImage={false}/>}
    </div>
    
  )
}

export default ImageGrid;