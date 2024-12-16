import { useOutletContext, Link, useNavigate} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeIcon from '@mui/icons-material/Home';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

import './ProfilePage.css';


function ProfilePage(){

    const {trips, user} = useOutletContext();
    const navigate = useNavigate();


    console.log(user)

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
                        <Link to={`/users/${user.uid}/edit`} >Add location</Link>} 
                    </div>
                    <div>{user.location?.lng}</div>
                    <div><FolderCopyIcon fontSize="small" className="ProfilePage-icon"/>{trips.length} <Link to={`/trips`}>trips</Link></div>
                </div>
               
            </div>
            
        </div>
    )
}

export default ProfilePage;