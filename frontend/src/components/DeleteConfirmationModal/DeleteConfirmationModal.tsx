import './DeleteConfirmationModal.css';
import '../../style/modal.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function DeleteConfirmationModal({ onDelete, onCancel, type }: { onDelete: Function, onCancel: Function, type: string }) {
  return (
    <div className="Modal-background">
      <div className="Modal-content">
        <div className="Modal-header">
          <div>Confirm Delete</div>
          <button className="Modal-closeBtn" type="button" onClick={() => onCancel()}><CloseIcon /></button>
        </div>
        <p className="DeleteConfirmationModal-confirmation">
          Are you sure you want to delete this
          {type}
          ?
        </p>
        <hr />
        <div className="DeleteConfirmationModal-buttons">
          <Button onClick={() => onDelete()} color="error" variant="contained">Delete</Button>
          <Button onClick={() => onCancel()}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
