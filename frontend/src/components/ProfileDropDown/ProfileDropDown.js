import './ProfileDropDown.css';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate} from 'react-router-dom';


function ProfileDropDown({ user }) {

    const navigate = useNavigate();

    const dropDownItems = [
        { icon: <PersonIcon />, content: user.displayName, onClick: ()=>navigate("/profile") },
        { icon: <LanguageIcon />, content: "HU" , onClick: ()=>console.log("language")},
        { icon: <LogoutIcon />, content: "Log Out", onClick: ()=>console.log("log out") }
    ]

    return (
        <div className="ProfileDropDown">
            {dropDownItems.map(item => (
                <div className="ProfileDropDown-item" onClick={item.onClick}><div>{item.icon}</div><div>{item.content}</div></div>
            ))}
        </div>
    )
}

export default ProfileDropDown