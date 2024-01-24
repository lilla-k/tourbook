// import Autocomplete from '@mui/material/Autocomplete';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoginIcon from '@mui/icons-material/Login';
import './Header.css';


function Header(){


    return(
      <div className="Header">
        <div className="Header-title">Tourbook</div>
        <div className="Header-icons">
          <div className="Header-icon-container">
            <ViewListIcon className="Header-icon" />
            <div className="Header-icon-tooltip" >List view</div>
          </div>
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