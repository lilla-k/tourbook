import React from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import { APIProvider, Map } from '@vis.gl/react-google-maps';

import {Polygon} from './Polygon.js';
import MapStyle from './MapStyle.js';
import {findCountryBorders} from '../../utils/location.js';
import './GoogleMapsPage.css';

function GoogleMapsPage() {

  const navigate = useNavigate();
  const { trips } = useOutletContext();

  return (
    <APIProvider apiKey={'AIzaSyBm0QjFlzIeB_Cl_e7lCMPagSRYcNkzGZI'}>
      <Map
        center={{ lat: 40, lng: 10.00678 }}
        zoom={2.2}
        fullscreenControl={false}
        mapTypeControl={false}
        streetViewControl={false}
        className="Map" 
      >
        {trips.map(trip => {
          return (
            <>
              <Polygon strokeWeight={1.5} fillColor="green" strokeColor="red" paths={findCountryBorders(trip.country)} onClick={() => navigate(`/trips/${trip.id}`)}/>
            </>
          )
        })}
      </Map>
      <MapStyle />
    </APIProvider>
  );
}

export default GoogleMapsPage;