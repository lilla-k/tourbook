import React from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import { APIProvider, Map } from '@vis.gl/react-google-maps';

import {Polygon} from './Polygon.js';
import MapStyle from './MapStyle.js';
import {findCountryBorders} from '../../utils/location.js';
import './GoogleMapsPage.css';

function GoogleMapsPage() {

  const navigate = useNavigate();
  const { trips, mapCamera, setMapCamera } = useOutletContext();
  
  return (
    <APIProvider apiKey={'AIzaSyBm0QjFlzIeB_Cl_e7lCMPagSRYcNkzGZI'}>
      <Map
        center={mapCamera.center}
        zoom={mapCamera.zoom}
        onCenterChanged={(event)=>setMapCamera({ ...mapCamera, center: event.detail.center })}
        onZoomChanged={(event)=>setMapCamera({ ...mapCamera, zoom: event.detail.zoom })}
        fullscreenControl={false}
        mapTypeControl={false}
        streetViewControl={false}
        className="Map" 
      >
        {trips.map(trip => {
          return (
            <>
              <Polygon fillColor="#0d9cb3" strokeWeight={1.3} strokeColor="#76b4be" paths={findCountryBorders(trip.country)} onClick={() => navigate(`/trips/${trip.id}`)}/>
            </>
          )
        })}
      </Map>
      <MapStyle />
    </APIProvider>
  );
}

export default GoogleMapsPage;