import './ProfilePage.css';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../../services/firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useOutletContext, Link} from 'react-router-dom';


function ProfilePage(){

    const auth = getAuth(firebaseApp);
    const [ user ] = useAuthState(auth);
    const {trips} = useOutletContext();
    console.log(user)

    return(
        <div className="ProfilePage">
            <div className="ProfilePage-card">
                <img className="ProfilePage-ProfileImage" src={user.photoURL} alt={"Profile"} />
                <div className="ProfilePage-info">
                    <div className="ProfilePage-name">{user.displayName}</div>
                    <div>{user.email}</div>
                    <div>{trips.length-1} <Link to={`/trips`}>trips</Link></div>
                </div>
            </div>
            
        </div>
    )
}

export default ProfilePage;