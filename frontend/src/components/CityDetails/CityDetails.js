import './CityDetails.css';

function CityDetails({selectedTrip, selectedCity}){

    console.log(selectedTrip.climate);
    return(
        <h1>{selectedCity}</h1>
    )
}

export default CityDetails;