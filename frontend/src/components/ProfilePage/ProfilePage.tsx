import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeIcon from '@mui/icons-material/Home';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import Button from '@mui/material/Button';
import { getVisitedCountries, getVisitedContinents } from '../../utils/trips.js';

import './ProfilePage.css';
import type Context from '../../types/context.js';

function ProfilePage() {
  const { trips, userData } = useOutletContext<Context>();
  const navigate = useNavigate();

  const visitedCountries = getVisitedCountries(trips);
  const visitedContinents = getVisitedContinents(trips);

  return (
    <div className="ProfilePage">
      <div className="ProfilePage-card">
        {userData.photoURL ? <img className="ProfilePage-ProfileImage" src={userData.photoURL} alt="Profile" /> : <PersonIcon sx={{ fontSize: '42px' }} />}
        <div className="ProfilePage-details">
          <div className="ProfilePage-title">
            <div className="ProfilePage-name">{userData.displayName}</div>
            <Button className="ProfilePage-edit-icon-container" onClick={() => navigate(`/users/${userData.uid}/edit`)}>
              <EditIcon fontSize="small" className="ProfilePage-icon" />
              Edit profile
            </Button>
          </div>
          <div>
            <MailOutlineIcon fontSize="small" className="ProfilePage-icon" />
            {userData.email}
          </div>
          <div className="ProfilePage-location">
            <HomeIcon fontSize="small" className="ProfilePage-icon" />
            {userData.location
              ? (
                <span>
                  Lives in&thinsp;
                  {userData.location.name}
                </span>
              )
              : <Link to={`/users/${userData.uid}/edit`} className="ProfilePage-link">Add location</Link>}
          </div>
          <div>
            <FolderCopyIcon fontSize="small" className="ProfilePage-icon" />
            {trips.length}
            <Link to="/trips" className="ProfilePage-link"> trips </Link>
            in&thinsp;
            {visitedCountries.length}
            {visitedCountries.length === 1 ? ' country ' : ' countries '}
            in&thinsp;
            {visitedContinents.length}
            {visitedContinents.length === 1 ? ' continent ' : ' continents'}
          </div>
        </div>

      </div>

    </div>
  );
}

export default ProfilePage;
