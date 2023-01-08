import { Status, Wrapper } from '@googlemaps/react-wrapper';
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useDeepCompareEffectForMaps } from './hooks/useDeepCompareEffectForMaps';

type GoogleMapProps = {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: ReactNode;
} & google.maps.MapOptions;

export const GoogleMap = (props: GoogleMapProps) => {
  return (
    <Wrapper
      apiKey={process.env.REACT_APP_MAPS_KEY as string}
      render={(status: Status) => {
        return <h1>{status}</h1>;
      }}
    >
      <Map {...props} />
    </Wrapper>
  );
};

const Map = ({ onClick, onIdle, children, style, ...options }: GoogleMapProps): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) => google.maps.event.clearListeners(map, eventName));

      if (onClick) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};
