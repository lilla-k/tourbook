import './NewTripForm.css';

function NewTripForm(){
    return(
        <div>
            <div className="NewTripForm-title">About your trip</div>
            <div>Choose country</div>
            {/* Select */}
            <div>Add information about the country</div>
            <textarea>eg. location, capital, language, religion</textarea>
            <div>Your experience</div>
            <textarea>eg. weather, unforgattable experience</textarea>
        </div>
    )
}

export default NewTripForm;