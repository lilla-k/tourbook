import React from 'react';
import { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow, useMarkerRef } from '@vis.gl/react-google-maps';
import { useNavigate, useOutletContext} from "react-router-dom";
import './GoogleMaps.css';
import countries from '../../countries.js';


function GoogleMaps() {

  const navigate = useNavigate();
  const [trips] = useOutletContext();
  console.log("maps");
  console.log(countries);

  function findPosition(country){
    console.log(country)
    const countryObj=countries.find(c=> c.name===country);
    const coordinateObj={lat:countryObj.lat, lng: countryObj.lng}
    return coordinateObj;
  }

  const [selectedTour, setSelectedTour] = useState(null);
  const [markerRef, marker] = useMarkerRef();

  return (
    <APIProvider apiKey={'AIzaSyBm0QjFlzIeB_Cl_e7lCMPagSRYcNkzGZI'}>
      <Map center={{ lat: 40, lng: 10.00678 }} zoom={2.2} className="Map">
        {trips.map(trip => {
          return (
            <>
              <Marker 
                ref={selectedTour===trip.id ? markerRef : null} 
                position={findPosition(trip.country)} 
                onMouseOver={() => setSelectedTour(trip.id)} 
                onClick={()=>navigate(`/trips/${trip.id}`)}
                 
              />
              {selectedTour===trip.id &&
                <InfoWindow className="Map-InfoWindow" anchor={marker} >
                  <h2 className="Map-InfoWindow-title">{trip.country}</h2>
                </InfoWindow>}
            </>
          )
        })}
      </Map>
    </APIProvider>
  );
}

export default GoogleMaps;