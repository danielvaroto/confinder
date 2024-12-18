import Box from '@mui/material/Box';
import { ReactElement, useState } from 'react';

import { ConferenceListItemResponse } from '../../types/ConferenceListItemResponse';
import { ConferenceMapItemResponse } from '../../types/ConferenceMapItemResponse';
import { ConferenceCard } from '../ConferenceCard';
import { ConferenceDetails } from '../ConferenceDetails';
import { GoogleMap } from './components/GoogleMaps/GoogleMap';
import { GoogleMapMarker } from './components/GoogleMaps/GoogleMapMarker';

type ConferenceMapProps = {
  items?: ConferenceMapItemResponse[];
};

export const ConferenceMap = ({ items }: ConferenceMapProps): ReactElement => {
  const [showConferencesCard, setShowConferencesCard] = useState<
    ConferenceListItemResponse[] | undefined
  >();
  const [zoom, setZoom] = useState<number | undefined>(3);
  const [center, setCenter] = useState<google.maps.LatLngLiteral | undefined>({
    lat: 0,
    lng: 0,
  });
  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter()?.toJSON());
  };
  const [openConferenceDetails, setOpenConferenceDetails] = useState(false);
  const [selectedConference, setSelectedConference] = useState(0);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const handleConferenceCardClick = (conferenceId: number) => {
    setSelectedConference(conferenceId);
    setOpenConferenceDetails(true);
  };

  return (
    <>
      {showConferencesCard ? (
        <Box
          sx={{
            'position': 'absolute',
            'bottom': 16,
            'zIndex': 1,
            'display': 'flex',
            'gap': 1,
            'py': 1,
            'overflow': 'auto',
            'scrollSnapType': 'x mandatory',
            'width': '100%',
            '& > *': {
              scrollSnapAlign: 'center',
            },
            '::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {showConferencesCard.map((c) => (
            <ConferenceCard
              key={c.id}
              conference={c}
              onClick={() => handleConferenceCardClick(c.id)}
              sx={{ minWidth: '350px', maxWidth: '350px' }}
            />
          ))}
        </Box>
      ) : null}

      <GoogleMap
        center={center}
        onIdle={onIdle}
        zoom={zoom}
        style={{ flexGrow: '1', height: '100%', width: '100%' }}
        onClick={() => {
          setShowConferencesCard(undefined);
          setSelectedMarkerId(null);
        }}
      >
        {items?.map((item, i) => {
          return (
            <GoogleMapMarker
              key={i}
              position={{ lat: item.latitude, lng: item.longitude }}
              onClick={(e) => {
                e.domEvent.preventDefault();
                setShowConferencesCard(item.conferences);
                setCenter({ lat: item.latitude, lng: item.longitude });
                setSelectedMarkerId(i);
              }}
              clickable
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: selectedMarkerId === i ? 10 : 8,
                fillColor: selectedMarkerId === i ? '#1976d2' : '#f44336',
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#fff',
              }}
            />
          );
        })}
      </GoogleMap>
      <ConferenceDetails
        open={openConferenceDetails}
        onClose={() => setOpenConferenceDetails(false)}
        conferenceId={selectedConference}
      />
    </>
  );
};
