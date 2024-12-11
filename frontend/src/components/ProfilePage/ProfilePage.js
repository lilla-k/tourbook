import './ProfilePage.css';
import { useOutletContext, Link} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';



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
                            <EditIcon fontSize="small" className="ProfilePage-edit-icon"/>
                            Edit profile
                        </button>
                    </div>
                    <div>{user.email}</div>
                    <div>{user.location.name}</div>
                    <div>{user.location.lng}</div>
                    <div>{trips.length} <Link to={`/trips`}>trips</Link></div>
                </div>
               
            </div>
            
        </div>
    )
}

export default ProfilePage;