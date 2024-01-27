import './Tour.css';


function Tour({name, image, type}){
    console.log(image);

    return(
        <div className="Tour">
            <img src={image}/>
            <div>{name}</div>
            <div>{type}</div>
        </div>
    )
}

export default Tour;