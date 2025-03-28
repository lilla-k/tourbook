import { useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';
import mapStyleDefinition from '../../mapStyleDefinition.js';

function MapStyle() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.setOptions({ styles: mapStyleDefinition });
  }, [map]);

  return <></>;
}

export default MapStyle;
