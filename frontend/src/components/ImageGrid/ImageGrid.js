import { useState } from 'react';
import './ImageGrid.css';
import { ImageList, ImageListItem } from '@mui/material';
import FileUploadModal from '../FileUploadModal/FileUploadModal.js';

function ImageGrid({images, onClick, cols}) {

  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  const selectable = !!onClick;

  console.log(images)
  return (
    <div className={`
      ImageGrid
      ${selectable ? 'ImageGrid-selectable' : ''}
      `
    }>
      <ImageList cols={cols} rowHeight={164}>
      {images?.map((image) => (
        <ImageListItem key={image.url}>
          <img
            className="ImageGrid-image"
            src={`${process.env.REACT_APP_BACKEND_API}${image.url}`}
            alt={image.title}
            loading="lazy"
            style={{ cursor: selectable ? 'pointer' : 'default'}}
            onClick={selectable ? () => onClick(image.id) : null}
          />
          {!selectable&&<div className="ImageGrid-title">{image.title}</div>}
        </ImageListItem>
      ))}
      {!selectable && <div className="ImageGrid-plusBtn" onClick={()=>setShowFileUploadModal(true)}>{images===[]?"Add photos":"+"}</div>}
      </ImageList >
      {showFileUploadModal && <FileUploadModal setShowFileUploadModal={setShowFileUploadModal}/>}
    </div>
    
  )
}

export default ImageGrid;