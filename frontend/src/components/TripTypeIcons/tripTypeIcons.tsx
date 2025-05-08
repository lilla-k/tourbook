import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import FlightIcon from '@mui/icons-material/Flight';
import { cloneElement } from 'react';
import type { TripType } from '../../types/trip.js';

const tripTypes = {
  flight: <FlightIcon />,
  bus: <DirectionsBusIcon />,
  car: <DirectionsCarIcon />,
  train: <TrainIcon />,
};

function getTripTypeIcons(type: TripType, size = 'large') {
  const icon = tripTypes[type];
  const clonedElement = cloneElement(icon, { fontSize: size });
  return clonedElement;
}

export function getTripTypes() {
  const tripTypeArray = Object.keys(tripTypes);
  return tripTypeArray;
}

export default getTripTypeIcons;
