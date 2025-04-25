import { useState, useRef, useLayoutEffect } from 'react';
import './ImageGrid.css';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.jsx';

import type Image from '../../types/image';

function ImageGrid({
  images, onClick, onNewClick, onDelete, showTitle,
}: {
  images: Image[], onClick: (imageId: string) => void, onNewClick?: () => void, onDelete?: (selectedImageToDelete: Image) => void, showTitle: boolean
}) {
  const ref = useRef<null | HTMLDivElement>(null);
  const [imageGridWidth, setImageGridWidth] = useState(0);
  const [selectedImageToDelete, setSelectedImageToDelete] = useState<Image | null>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      setImageGridWidth(width);
    }
  }, []);

  function deleteConfirmation(image: Image) {
    setSelectedImageToDelete(image);
  }

  function cancelDelete() {
    setSelectedImageToDelete(null);
  }

  return (
    <div className="ImageGrid" ref={ref}>
      <ImageList cols={images.length === 0 || imageGridWidth > 480 ? 2 : 1} rowHeight={250}>
        {images?.map((image) => (
          <ImageListItem
            key={image.url}
            onClick={() => onClick(image.id)}
          >
            <img
              className="ImageGrid-image"
              src={`${image.url}`}
              alt={image.title}
              loading="lazy"
              style={{ cursor: 'pointer', height: '100%', objectFit: 'cover' }}
            />
            {onDelete
              && (
                <DeleteIcon
                  className="ImageGrid-deleteIcon"
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteConfirmation(image);
                  }}
                />
              )}
            {showTitle
              && (
                <ImageListItemBar
                  title={image.title}
                />
              )}

          </ImageListItem>
        ))}
        {onNewClick
          && <button type="button" className="ImageGrid-plusBtn" onClick={onNewClick}>{Object.keys(images).length === 0 ? 'Add photos' : '+'}</button>}
      </ImageList>
      {selectedImageToDelete && onDelete
        && (
          <DeleteConfirmationModal
            onDelete={() => {
              onDelete(selectedImageToDelete);
              setSelectedImageToDelete(null);
            }}
            onCancel={() => cancelDelete()}
            type="image"
          />
        )}
    </div>

  );
}

export default ImageGrid;
