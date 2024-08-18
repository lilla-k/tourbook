import { useState } from 'react';
import './ImageGrid.css';
import { ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import FileUploadModal from '../FileUploadModal/FileUploadModal.js';

function ImageGrid({images, onClick, cols}) {

  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  const selectable = !!onClick;

  return (
    <div className={`
      ImageGrid
      ${selectable ? 'ImageGrid-selectable' : ''}
      `
    }>
      <ImageList cols={cols} rowHeight={250}>
      {images?.map((image) => (
        <ImageListItem key={image.url}>
          <img
            className="ImageGrid-image"
            src={`${process.env.REACT_APP_BACKEND_API}${image.url}`}
            alt={image.title}
            loading="lazy"
            style={{ cursor: 'pointer', height: '100%'}}
            onClick={selectable ? () => onClick(image.id) : null}
          />
          {!selectable&&
          <ImageListItemBar
            title={image.title}
            
          />}
        </ImageListItem>
      ))}
      {!selectable && <div className="ImageGrid-plusBtn" onClick={()=>setShowFileUploadModal(true)}>{Object.keys(images).length===0?"Add photos":"+"}</div>}
      </ImageList >
      {showFileUploadModal && <FileUploadModal setShowFileUploadModal={setShowFileUploadModal} useAsCoverImage={false}/>}
    </div>
    
  )
}

export default ImageGrid;