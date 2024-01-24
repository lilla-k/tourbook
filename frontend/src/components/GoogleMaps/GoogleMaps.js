import React from 'react';
import {useState} from 'react';
import {APIProvider, Map, Marker, InfoWindow} from '@vis.gl/react-google-maps';
import './GoogleMaps.css';

function GoogleMaps() {
    const positionJordania = {lat: 31.125, lng: 36.392};

    const [showInfoWindow, setShowInfoWindow]=useState(false);
  
    return (
      <APIProvider apiKey={'AIzaSyBm0QjFlzIeB_Cl_e7lCMPagSRYcNkzGZI'}>
        <Map center={{lat: 40, lng: 10.00678}} zoom={2.2} className="map">
          <Marker position={positionJordania} onMouseOver={()=>setShowInfoWindow(true)} onMouseLeave={()=>setShowInfoWindow(false)}/>
          {showInfoWindow &&<InfoWindow position={positionJordania}>
            <img src="/images/Jordan.jpg" style={{height:100}} />
          </InfoWindow>}
        </Map>
      </APIProvider>
    );
  }
  
  export default GoogleMaps;