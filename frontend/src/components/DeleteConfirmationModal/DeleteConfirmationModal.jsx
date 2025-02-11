import './DeleteConfirmationModal.css';
import '../../style/modal.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function DeleteConfirmationModal({ onDelete, onCancel, type }) {
    return (
        <div className="Modal-background">
            <div className="Modal-content">
                <div className="Modal-header">
                    <div>Confirm Delete</div>
                    <div className="Modal-closeBtn" onClick={onCancel}><CloseIcon /></div>
                </div>
                <p className="DeleteConfirmationModal-confirmation">Are you sure you want to delete this {type}?</p>
                <hr></hr>
                <div className="DeleteConfirmationModal-buttons">
                    <Button onClick={onDelete} color="error" variant="contained">Delete</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}   

export default DeleteConfirmationModal;