import './ProfilePage.css';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../../services/firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useOutletContext, Link} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';


function ProfilePage(){

    const auth = getAuth(firebaseApp);
    const [ user ] = useAuthState(auth);
    const {trips} = useOutletContext();

    return(
        <div className="ProfilePage">
            <div className="ProfilePage-card">
                {user.photoURL? <img className="ProfilePage-ProfileImage" src={user.photoURL} alt={"Profile"} /> : <PersonIcon sx={{fontSize: "42px"}}/>}
                <div className="ProfilePage-details">
                    <div className="ProfilePage-title">
                        <div className="ProfilePage-name">{user.displayName}</div>
                        <button className="ProfilePage-edit-icon-container">  
                            <EditIcon fontSize="small" className="ProfilePage-edit-icon"/>
                            Edit profile
                        </button>
                    </div>
                    <div>{user.email}</div>
                    <div>Hungary</div>
                    <div>{trips.length} <Link to={`/trips`}>trips</Link></div>
                </div>
               
            </div>
            
        </div>
    )
}

export default ProfilePage;