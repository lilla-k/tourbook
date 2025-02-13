import './CoverImageSelectorModal.css';
import '../../style/modal.css';
import CloseIcon from '@mui/icons-material/Close';
import ImageGrid from '../ImageGrid/ImageGrid';

function CoverImageSelectorModal({ images, setShowCoverImageSelectorModal, saveCoverImage }) {
  return (
    <div className="Modal-background">
      <div className="Modal-content">
        <div className="Modal-header">
          <div>Select a cover image</div>
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
