import './EditProfilePage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useOutletContext } from "react-router-dom";

function EditProfilePage(){

    const navigate = useNavigate();
    const { user } = useOutletContext();

    console.log(user.uid)

    return(
        <div className="EditProfilePage">
            <div className="EditProfilePage-header">
            <div className="EditProfilePage-arrowBackIcon">
                        <ArrowBackIcon onClick={ ()=>navigate(`/users/${user.uid}`)} />
                    </div>
                    <div className="EditProfilePage-title">Edit your profile</div>
            </div>
        </div>
    )
}

export default EditProfilePage;