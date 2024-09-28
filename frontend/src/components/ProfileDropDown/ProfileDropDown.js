import './ProfileDropDown.css';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



function ProfileDropDown({ user, open, accountElementRef, handleClose }) {

    const navigate = useNavigate();
    console.log(accountElementRef.current)

    const dropDownItems = [
        { icon: <PersonIcon />, content: user.displayName, onClick: () => navigate("/profile") },
        { icon: <LanguageIcon />, content: "HU", onClick: () => console.log("language") },
        { icon: <LogoutIcon />, content: "Log Out", onClick: () => console.log("log out") }
    ]

    return (
        <Menu
            anchorEl={accountElementRef.current}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {dropDownItems.map(item => (
                <MenuItem onClick={item.onClick} className="ProfileDropDown-item">
                    <div>{item.icon}</div><div>{item.content}</div>
                </MenuItem>
            ))}
        </Menu>
    )
}

export default ProfileDropDown