import { useNavigate, useResolvedPath } from "react-router-dom";
import ViewListIcon from '@mui/icons-material/ViewList';
import PlaceIcon from '@mui/icons-material/Place';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoginIcon from '@mui/icons-material/Login';
import './Header.css';


function Header(){

    const navigate = useNavigate();
    const {pathname} = useResolvedPath();

    return(
      <div className="Header">
        <div className="Header-title" onClick={()=>navigate("/")}>Tourbook</div>
        <div className="Header-icons">
          {pathname==='/' && <div className="Header-icon-container" onClick={()=>navigate("/trips")}>
            <ViewListIcon className="Header-icon" />
            <div className="Header-icon-tooltip" >List view</div>
          </div>}
          {pathname!=='/' && <div className="Header-icon-container" onClick={()=>navigate("/")}>
            <PlaceIcon className="Header-icon" />
            <div className="Header-icon-tooltip" >Map view</div>
          </div>}
          <div className="Header-icon-container" onClick={()=>navigate("/addcountry")}>
            <AddCircleOutlineIcon className="Header-icon"/>
            <div className="Header-icon-tooltip" >New tour</div>
          </div>
          <div className="Header-icon-container">
            <PersonOutlineIcon className="Header-icon"/>
            <div className="Header-icon-tooltip">Sign In</div>
          </div>
          <div className="Header-icon-container">
            <LoginIcon className="Header-icon"/>
            <div className="Header-icon-tooltip">Login</div>
          </div>
        </div>
      </div>
    )
}

export default Header