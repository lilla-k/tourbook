import React from 'react';
import {useState} from 'react';
import {APIProvider, Map, Marker, InfoWindow, useMarkerRef} from '@vis.gl/react-google-maps';
import './GoogleMaps.css';

function GoogleMaps() {
    const positionJordania = {lat: 31.125, lng: 36.392};

    const [showInfoWindow, setShowInfoWindow]=useState(false);
    const [markerRef, marker] = useMarkerRef();
  
    return (
      <APIProvider apiKey={'AIzaSyBm0QjFlzIeB_Cl_e7lCMPagSRYcNkzGZI'}>
        <Map center={{lat: 40, lng: 10.00678}} zoom={2.2} className="map">
          <Marker ref={markerRef} position={positionJordania} onMouseOver={()=>setShowInfoWindow(true)} onMouseOut={()=>setShowInfoWindow(false)}/>
          {showInfoWindow &&
          <InfoWindow anchor={marker} position={positionJordania}>
            <h2>Jordánia</h2>
            <img src="/images/Jordan.jpg" style={{height:150}} />
          </InfoWindow>}
        </Map>
      </APIProvider>
    );
  }
  
  export default GoogleMaps;