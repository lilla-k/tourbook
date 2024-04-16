import './CoverImageSelectorModal.css';
import ImageGrid from '../ImageGrid/ImageGrid';
import CloseIcon from '@mui/icons-material/Close';

function CoverImageSelectorModal({images, setShowCoverImageSelectorModal}) {

    return (
        <div className="CoverImageSelectorModal-background">
            <div className="CoverImageSelectorModal-content">
                <div className="CoverImageSelectorModal-header">
                    <div></div>
                    <div>Select a photo</div>
                    <div className="CoverImageSelectorModal-close" onClick={()=>setShowCoverImageSelectorModal(false)}><CloseIcon/></div>
                </div>
                <hr></hr>
                <ImageGrid images={images} selected={true}/>
            </div>
        </div>
    )
}

export default CoverImageSelectorModal;