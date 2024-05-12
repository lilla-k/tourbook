import './DeleteConfirmationModal.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function DeleteConfirmationModal({ deleteCity, deleteTrip, cancelDelete }) {
    return (
        <div className="DeleteConfirmationModal-background">
            <div className="DeleteConfirmationModal-content">
                <div className="DeleteConfirmationModal-header">
                    <div>Confirm Delete</div>
                    <div className="DeleteConfirmationModal-close" onClick={cancelDelete}><CloseIcon /></div>
                </div>
                <p className="DeleteConfirmationModal-confirmation">Are you sure you want to delete {deleteCity?`this city`:`this trip`}?</p>
                <hr></hr>
                <div className="DeleteConfirmationModal-buttons">
                    <Button onClick={deleteCity||deleteTrip} color="error" variant="contained">Delete</Button>
                    <Button onClick={cancelDelete}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}   

export default DeleteConfirmationModal;