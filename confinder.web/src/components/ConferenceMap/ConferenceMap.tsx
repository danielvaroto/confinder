import { ReactElement, useState } from 'react';

import { ConferenceMapItemResponse } from '../../types/ConferenceMapItemResponse';
import { GoogleMap } from './components/GoogleMaps/GoogleMap';
import { GoogleMapMarker } from './components/GoogleMaps/GoogleMapMarker';

type ConferenceMapProps = {
  items?: ConferenceMapItemResponse[];
};

export const ConferenceMap = ({ items }: ConferenceMapProps): ReactElement => {
  const [zoom, setZoom] = useState(3);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const onIdle = (m: google.maps.Map) => {
    console.log('onIdle');
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <GoogleMap
      center={center}
      onIdle={onIdle}
      zoom={zoom}
      style={{ flexGrow: '1', height: '100%' }}
    >
      {items?.map((item, i) => (
        <GoogleMapMarker key={i} position={{ lat: item.latitude, lng: item.longitude }} />
      ))}
    </GoogleMap>
  );
};
