import React from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import './GoogleMaps.css';

function GoogleMaps() {
    const positionJordania = {lat: 31.125, lng: 36.392};
  
    return (
      <APIProvider apiKey={'AIzaSyBm0QjFlzIeB_Cl_e7lCMPagSRYcNkzGZI'}>
        <Map center={{lat: 40, lng: 10.00678}} zoom={2.2} className="map">
          <Marker position={positionJordania} onClick={`/tours/1`}/>
        </Map>
      </APIProvider>
    );
  }
  
  export default GoogleMaps;