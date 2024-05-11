import { useNavigate, useResolvedPath } from "react-router-dom";
import ViewListIcon from '@mui/icons-material/ViewList';
import PlaceIcon from '@mui/icons-material/Place';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoginIcon from '@mui/icons-material/Login';
import './Header.css';
import '../../style/tooltip.css';


function Header(){

    const navigate = useNavigate();
    const {pathname} = useResolvedPath();

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
            <PersonOutlineIcon className="Header-icon"/>
            <div className="tooltip">Sign In</div>
          </div>
          <div className="Header-icon-container">
            <LoginIcon className="Header-icon"/>
            <div className="tooltip">Login</div>
          </div>
        </div>
      </div>
    )
}

export default Header