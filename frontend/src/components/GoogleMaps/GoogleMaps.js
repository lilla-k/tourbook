import React from 'react';
import { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow, useMarkerRef } from '@vis.gl/react-google-maps';
import { useNavigate } from "react-router-dom";
import './GoogleMaps.css';
import trips from '../../trips.js';


function GoogleMaps() {

  const navigate = useNavigate();
  const [selectedTour, setSelectedTour] = useState(null);
  const [markerRef, marker] = useMarkerRef();

  return (
    <APIProvider apiKey={'AIzaSyBm0QjFlzIeB_Cl_e7lCMPagSRYcNkzGZI'}>
      <Map center={{ lat: 40, lng: 10.00678 }} zoom={2.2} className="Map">
        {trips.map(tour => {
          return (
            <>
              <Marker 
                ref={selectedTour===tour.id ? markerRef : null} 
                position={tour.coordinates} 
                onMouseOver={() => setSelectedTour(tour.id)} 
                onClick={()=>navigate(`/trips/${tour.id}`)} />
              {selectedTour===tour.id &&
                <InfoWindow className="Map-InfoWindow" anchor={marker} >
                  <h2 className="Map-InfoWindow-title">{tour.country}</h2>
                </InfoWindow>}
            </>
          )
        })}
      </Map>
    </APIProvider>
  );
}

export default GoogleMaps;