import './CoverImageSelectorModal.css';
import '../../style/modal.css';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import ImageGrid from '../ImageGrid/ImageGrid.jsx';

function CoverImageSelectorModal({ images, setShowCoverImageSelectorModal, saveCoverImage }) {
  return (
    <div className="Modal-background">
      <div className="Modal-content">
        <div className="Modal-header">
          <div>Select a cover image</div>
          <Button variant="outlined">Outlined</Button>
          <div
            className="Modal-closeBtn"
            onClick={() => setShowCoverImageSelectorModal(false)}
          >
            <CloseIcon />
          </div>
        </div>
        <hr />
        <ImageGrid images={images} selection onClick={saveCoverImage} cols={3} />
      </div>
    </div>
  );
}

export default CoverImageSelectorModal;
