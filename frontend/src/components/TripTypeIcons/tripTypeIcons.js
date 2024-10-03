import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import FlightIcon from '@mui/icons-material/Flight';
import { cloneElement } from 'react';

const tripTypes = {
  flight: <FlightIcon />,
  bus: <DirectionsBusIcon />,
  car: <DirectionsCarIcon />,
  train: <TrainIcon/>
}
function getTripTypeIcons(type, size="large"){
  console.log(size, "size")
  const icon = tripTypes[type];
  const clonedElement = cloneElement(icon, {fontSize: size})
  console.log("clonedElement", clonedElement)
  return clonedElement
}

export function getTripTypes(){
  const tripTypeArray = Object.keys(tripTypes);
  return tripTypeArray;
}

export default getTripTypeIcons;

