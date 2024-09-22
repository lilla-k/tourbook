import './ProfileDropDown.css';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';


function ProfileDropDown({ user }) {

    const dropDownItems = [
        { icon: <PersonIcon />, content: user.displayName },
        { icon: <LanguageIcon />, content: "HU" },
        { icon: <LogoutIcon />, content: "Log Out" }
    ]

    return (
        <div className="ProfileDropDown">
            {dropDownItems.map(item => (
                <div className="ProfileDropDown-item"><div>{item.icon}</div><div>{item.content}</div></div>
            ))}
        </div>
    )
}

export default ProfileDropDown