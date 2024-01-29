import './Tour.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


function Tour({name, image, type, startDate}){

    return(
        <div className="Tour">
            <div className="Tour-info">
                <img src={image}/>
                <div className="Tour-details">
                    <div className="Tour-name">{name}</div>
                    <div>{new Date(startDate).toLocaleDateString("en-EN")}</div>
                </div>
            </div>
            <MoreHorizIcon className="Tour-next"/>
        </div>
    )
}

export default Tour;