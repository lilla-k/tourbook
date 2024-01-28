import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import PlaceIcon from '@mui/icons-material/Place';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoginIcon from '@mui/icons-material/Login';
import './Header.css';


function Header(){

  console.log(window.location.pathname);
    const navigate = useNavigate();
    // const [view, setView] = useState("list") 

    // function clickViewHandler(){
    //   navigate("/tours");
    //   setView("map");
    // }

    // function clickMapHandler(){
    //   navigate("/");
    //   setView("list");
    // }

    return(
      <div className="Header">
        <div className="Header-title">Tourbook</div>
        <div className="Header-icons">
          {window.location.pathname==="/" && <div className="Header-icon-container" onClick={()=>navigate("/tours")}>
            <ViewListIcon className="Header-icon" />
            <div className="Header-icon-tooltip" >List view</div>
          </div>}
          {window.location.pathname !=="/" && <div className="Header-icon-container" onClick={()=>navigate("/")}>
            <PlaceIcon className="Header-icon" />
            <div className="Header-icon-tooltip" >Map view</div>
          </div>}
          <div className="Header-icon-container">
            <AddCircleOutlineIcon className="Header-icon"/>
            <div className="Header-icon-tooltip">New tour</div>
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