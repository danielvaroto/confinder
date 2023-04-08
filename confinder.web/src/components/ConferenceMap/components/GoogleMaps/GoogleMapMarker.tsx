import { FC, useEffect, useState } from 'react';

type GoogleMapsMarkerProps = { onClick: () => void } & google.maps.MarkerOptions;

export const GoogleMapMarker: FC<GoogleMapsMarkerProps> = ({ onClick, ...markerOptions }) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(markerOptions);
    }
  }, [marker, markerOptions]);

  useEffect(() => {
    if (marker) {
      google.maps.event.clearListeners(marker, 'click');
      marker.addListener('click', onClick);
    }
  }, [marker, onClick]);

  return null;
};
