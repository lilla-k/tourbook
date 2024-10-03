import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import FlightIcon from '@mui/icons-material/Flight';


const tripTypes = {
    flight: <FlightIcon fontSize="large"/>,
    bus: <DirectionsBusIcon />,
    car: <DirectionsCarIcon />,
    train: <TrainIcon/>
  }

  export default tripTypes;

