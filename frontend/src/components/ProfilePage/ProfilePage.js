import { useOutletContext, Link, useNavigate} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeIcon from '@mui/icons-material/Home';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import {getVisitedCountries, getVisitedContinents} from '../../utils/trips.js'

import './ProfilePage.css';


function ProfilePage(){

    const {trips, user} = useOutletContext();
    const navigate = useNavigate();

    const visitedCountries = getVisitedCountries(trips);
    const visitedContinents = getVisitedContinents(trips);

    return(
        <div className="ProfilePage">
            <div className="ProfilePage-card">
                {user.photoURL? <img className="ProfilePage-ProfileImage" src={user.photoURL} alt={"Profile"} /> : <PersonIcon sx={{fontSize: "42px"}}/>}
                <div className="ProfilePage-details">
                    <div className="ProfilePage-title">
                        <div className="ProfilePage-name">{user.displayName}</div>
                        <button className="ProfilePage-edit-icon-container" onClick={()=>navigate(`/users/${user.uid}/edit`)}>  
                            <EditIcon fontSize="small" className="ProfilePage-icon"/>
                            Edit profile
                        </button>
                    </div>
                    <div><MailOutlineIcon fontSize="small" className="ProfilePage-icon"/>{user.email}</div>
                    <div className="ProfilePage-location">
                        <HomeIcon fontSize="small" className="ProfilePage-icon"/>
                        {user.location? 
                        <span>Lives in {user.location.name}</span> :
                        <Link to={`/users/${user.uid}/edit`} className="ProfilePage-link" >Add location</Link>} 
                    </div>
                    <div>
                        <FolderCopyIcon fontSize="small" className="ProfilePage-icon"/>
                        {trips.length} 
                        <Link to={`/trips`} className="ProfilePage-link"> trips </Link>
                        in {visitedCountries.length} {visitedCountries.length === 1? "country " : "countries "}
                        in {visitedContinents.length} {visitedContinents.length === 1? "continent " : "continents "}
                    </div>
                </div>
               
            </div>
            
        </div>
    )
}

export default ProfilePage;