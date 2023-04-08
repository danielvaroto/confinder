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
            // 'width': 343,
            'scrollSnapType': 'x mandatory',
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
            />
          ))}
        </Box>
      ) : null}

      <GoogleMap
        center={center}
        onIdle={onIdle}
        zoom={zoom}
        style={{ flexGrow: '1', height: '100%', width: '100%' }}
      >
        {items?.map((item, i) => {
          return (
            <GoogleMapMarker
              key={i}
              position={{ lat: item.latitude, lng: item.longitude }}
              onClick={() => setShowConferencesCard(item.conferences)}
              clickable
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
