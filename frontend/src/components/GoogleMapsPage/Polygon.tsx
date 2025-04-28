/* eslint-disable react/no-unused-prop-types */
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import { GoogleMapsContext } from '@vis.gl/react-google-maps';

type EventName = 'click' | 'drag' | 'dragstart' | 'dragend' | 'mouseover' | 'mouseout';
type EventHandlerName = 'onClick' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onMouseOver' | 'onMouseOut';
type PolygonProps = google.maps.PolygonOptions & {
  onClick?: Function,
  onDrag?: Function,
  onDragStart?: Function,
  onDragEnd?: Function,
  onMouseOver?: Function,
  onMouseOut?: Function,
};

function usePolygon(props: PolygonProps) {
  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
    ...polygonOptions
  } = props;

  const polygon = useRef(new window.google.maps.Polygon()).current;
  // update PolygonOptions (note the dependencies aren't properly checked
  // here, we just assume that setOptions is smart enough to not waste a
  // lot of time updating values that didn't change)
  useMemo(() => {
    polygon.setOptions(polygonOptions);
  }, [polygon, polygonOptions]);

  const map = useContext(GoogleMapsContext)?.map;

  // update the path with the encodedPath

  // create polygon instance and add to the map once the map is available
  useEffect(() => {
    if (!map) {
      if (map === undefined) throw new Error('<Polygon> has to be inside a Map component.');

      return () => {};
    }

    polygon.setMap(map);

    return () => polygon.setMap(null);
  }, [map, polygon]);

  // attach and re-attach event-handlers when any of the properties change
  useEffect(() => {
    if (!polygon) return () => {};

    // Add event listeners
    const gme = window.google.maps.event;
    const mapping: [EventName, EventHandlerName][] = [
      ['click', 'onClick'],
      ['drag', 'onDrag'],
      ['dragstart', 'onDragStart'],
      ['dragend', 'onDragEnd'],
      ['mouseover', 'onMouseOver'],
      ['mouseout', 'onMouseOut'],
    ];
    const callbacks = {
      current: {
        onClick,
        onDrag,
        onDragStart,
        onDragEnd,
        onMouseOver,
        onMouseOut,
      },
    };
    mapping.forEach(([eventName, eventCallback]) => {
      gme.addListener(polygon, eventName, (e: Event) => {
        const callback = callbacks.current[eventCallback];
        if (callback) callback(e);
      });
    });

    return () => {
      gme.clearInstanceListeners(polygon);
    };
  }, [polygon, onClick, onDrag, onDragStart, onDragEnd, onMouseOver, onMouseOut]);

  return polygon;
}

/**
   * Component to render a polygon on a map
   */
const Polygon = forwardRef<google.maps.Polygon, PolygonProps>((props, ref) => {
  const polygon = usePolygon(props);

  useImperativeHandle(ref, () => polygon, [polygon]);

  return null;
});

export default Polygon;
