import './CoverImageSelectorModal.css';
import '../../style/modal.css';
import CloseIcon from '@mui/icons-material/Close';
import ImageGrid from '../ImageGrid/ImageGrid.jsx';
import type Image from '../../types/image';

function CoverImageSelectorModal(
  { images, setShowCoverImageSelectorModal, saveCoverImage }:
  { images: Image[], setShowCoverImageSelectorModal: (isVisible: boolean) => void, saveCoverImage: (imageId: string) => Promise<void> },
) {
  return (
    <div className="Modal-background">
      <div className="Modal-content">
        <div className="Modal-header">
          <div>Select a cover image</div>
          <button
            className="Modal-closeBtn"
            type="button"
            onClick={() => setShowCoverImageSelectorModal(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <hr />
        <ImageGrid images={images} selection onClick={saveCoverImage} />
      </div>
    </div>
  );
}

export default CoverImageSelectorModal;
