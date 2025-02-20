import { useNavigate, useResolvedPath } from 'react-router-dom';
import ViewListIcon from '@mui/icons-material/ViewList';
import PlaceIcon from '@mui/icons-material/Place';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './Header.css';
import '../../style/tooltip.css';
import { useState, useRef } from 'react';
import PersonIcon from '@mui/icons-material/Person';

import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import ProfileDropDown from '../ProfileDropDown/ProfileDropDown.jsx';
import firebaseApp from '../../services/firebase.js';

const auth = getAuth(firebaseApp);

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();
  const accountElementRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="Header">
      <div className="Header-title" onClick={() => navigate('/trips')}>Tourbook</div>
      <div className="Header-icons">
        {pathname === '/' && (
          <div className="Header-icon-container" onClick={() => navigate('/trips')}>
            <ViewListIcon className="Header-icon" />
            <div className="tooltip">List view</div>
          </div>
        )}
        {pathname !== '/' && (
          <div className="Header-icon-container" onClick={() => navigate('/')}>
            <PlaceIcon className="Header-icon" />
            <div className="tooltip">Map view</div>
          </div>
        )}
        <div className="Header-icon-container" onClick={() => navigate('/addTrip')}>
          <AddCircleOutlineIcon className="Header-icon" />
          <div className="tooltip">Add trip</div>
        </div>
        <div className="Header-icon-container" onClick={() => setOpen(true)} ref={accountElementRef}>
          {user.photoURL ? <img className="Header-profileImage" src={user.photoURL} alt="profile" /> : <PersonIcon />}
          <div className="tooltip">Account</div>
        </div>
        <ProfileDropDown user={user} open={open} accountElementRef={accountElementRef} handleClose={handleClose} />
      </div>
    </div>
  );
}

export default Header;
