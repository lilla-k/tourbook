import './Tour.css';


function Tour({name, image, type, startDate}){

    return(
        <div className="Tour">
            <div className="Tour-info">
                <img src={image}/>
                <div className="Tour-details">
                    <div>{name}</div>
                    <div>{new Date(startDate).toLocaleDateString("en-EN")}</div>
                </div>
            </div>
            <div>...</div>
        </div>
    )
}

export default Tour;