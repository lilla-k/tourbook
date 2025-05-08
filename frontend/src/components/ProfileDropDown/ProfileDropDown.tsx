import './ProfileDropDown.css';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSignOut } from 'react-firebase-hooks/auth';
import { getAuth, User } from 'firebase/auth';
import firebaseApp from '../../services/firebase.js';

const auth = getAuth(firebaseApp);

function ProfileDropDown({
  user, open, accountElementRef, handleClose,
}: {
  user: User, open: boolean, accountElementRef: React.RefObject<null>, handleClose: () => void,
}) {
  const navigate = useNavigate();
  const [signOut] = useSignOut(auth);

  const dropDownItems = [
    { icon: <PersonIcon />, content: user.displayName || user.email, onClick: () => navigate(`/users/${user.uid}`) },
    { icon: <LanguageIcon />, content: 'HU' },
    { icon: <LogoutIcon />, content: 'Log Out', onClick: () => signOut() },
  ];

  return (
    <Menu
      anchorEl={accountElementRef.current}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {dropDownItems.map((item) => (
        <MenuItem onClick={item.onClick} className="ProfileDropDown-item" key={item.content}>
          <div>{item.icon}</div>
          <div>{item.content}</div>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default ProfileDropDown;
