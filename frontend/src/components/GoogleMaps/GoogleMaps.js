import React from 'react';
import ReactDOM from 'react-dom/client';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import './GoogleMaps.css';

function GoogleMaps() {
    const position = {lat: 53.54992, lng: 10.00678};
  
    return (
      <APIProvider apiKey={'AIzaSyBm0QjFlzIeB_Cl_e7lCMPagSRYcNkzGZI'}>
        <Map center={{lat: 40, lng: 10.00678}} zoom={2.2} className="map">
          <Marker position={position} />
        </Map>
      </APIProvider>
    );
  }
  
  export default GoogleMaps;