import './CoverImageSelectorModal.css';
import ImageGrid from '../ImageGrid/ImageGrid';
import CloseIcon from '@mui/icons-material/Close';

function CoverImageSelectorModal({images, setShowCoverImageSelectorModal, saveCoverImage}) {

    return (
        <div className="CoverImageSelectorModal-background">
            <div className="CoverImageSelectorModal-content">
                <div className="CoverImageSelectorModal-header">
                    <div></div>
                    <div>Select a photo</div>
                    <div className="CoverImageSelectorModal-close" onClick={()=>setShowCoverImageSelectorModal(false)}><CloseIcon/></div>
                </div>
                <hr></hr>
                <ImageGrid images={images} selection={true} onClick={saveCoverImage} cols={3} />
            </div>
        </div>
    )
}

export default CoverImageSelectorModal;