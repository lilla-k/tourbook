import { useNavigate, useLocation, Link } from 'react-router-dom';
import ViewListIcon from '@mui/icons-material/ViewList';
import PlaceIcon from '@mui/icons-material/Place';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './Header.css';
import '../../style/tooltip.css';
import { useState, useRef } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';

import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import ProfileDropDown from '../ProfileDropDown/ProfileDropDown.js';
import firebaseApp from '../../services/firebase.js';

const auth = getAuth(firebaseApp);
function useUserData() {
  const [user] = useAuthState(auth);
  if (user === undefined || user === null) {
    throw new Error('not authenticated');
  }
  return user;
}

function Header() {
  const user = useUserData();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const accountElementRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="Header">
      <Link to="/trips" className="Header-title">Tourbook</Link>
      <div className="Header-icons">
        {pathname === '/' && (
          <IconButton color="secondary" className="Header-icon-container" onClick={() => navigate('/trips')}>
            <ViewListIcon className="Header-icon" />
            <div className="tooltip">List view</div>
          </IconButton>
        )}
        {pathname !== '/' && (
          <IconButton color="secondary" className="Header-icon-container" onClick={() => navigate('/')}>
            <PlaceIcon className="Header-icon" />
            <div className="tooltip">Map view</div>
          </IconButton>
        )}
        <IconButton color="secondary" className="Header-icon-container" onClick={() => navigate('/addTrip')}>
          <AddCircleOutlineIcon className="Header-icon" />
          <div className="tooltip">Add trip</div>
        </IconButton>
        <IconButton color="secondary" className="Header-icon-container" onClick={() => setOpen(true)} ref={accountElementRef}>
          {user?.photoURL ? <img className="Header-profileImage" src={user.photoURL} alt="profile" /> : <PersonIcon />}
          <div className="tooltip">Account</div>
        </IconButton>
        <ProfileDropDown user={user} open={open} accountElementRef={accountElementRef} handleClose={handleClose} />
      </div>
    </div>
  );
}

export default Header;
