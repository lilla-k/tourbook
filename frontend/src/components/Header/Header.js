import { useNavigate, useResolvedPath } from "react-router-dom";
import ViewListIcon from '@mui/icons-material/ViewList';
import PlaceIcon from '@mui/icons-material/Place';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown.js";
import './Header.css';
import '../../style/tooltip.css';
import {useState} from 'react';

import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebaseApp from '../../services/firebase.js'

const auth = getAuth(firebaseApp);


function Header(){

    const [ user ] = useAuthState(auth);
    const navigate = useNavigate();
    const {pathname} = useResolvedPath();
    const [showProfileDropDown, setShowProfileDropDown] = useState(false)

    console.log(user)
    console.log(user.displayName)
    console.log(user.email)
    console.log(user.photoURL)


    return(
      <div className="Header">
        <div className="Header-title" onClick={()=>navigate("/trips")}>Tourbook</div>
        <div className="Header-icons">
          {pathname==='/' && <div className="Header-icon-container" onClick={()=>navigate("/trips")}>
            <ViewListIcon className="Header-icon" />
            <div className="tooltip" >List view</div>
          </div>}
          {pathname!=='/' && <div className="Header-icon-container" onClick={()=>navigate("/")}>
            <PlaceIcon className="Header-icon" />
            <div className="tooltip" >Map view</div>
          </div>}
          <div className="Header-icon-container" onClick={()=>navigate("/addTrip")}>
            <AddCircleOutlineIcon className="Header-icon"/>
            <div className="tooltip" >Add trip</div>
          </div>
          <div className="Header-icon-container">
            <img className="Header-profileImage" src={user.photoURL} alt={"profile"} onClick={()=>setShowProfileDropDown(true)}/>
            <div className="tooltip">Account</div>
            {showProfileDropDown && <ProfileDropDown user={user}/>}
          </div>
        </div>
      </div>
    )
}

export default Header