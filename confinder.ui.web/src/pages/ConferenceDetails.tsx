import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { getConference } from '../_data';

export default function ConferenceDetails(): ReactElement {
  const params = useParams();
  const conference = getConference(parseInt(params.conferenceId as string, 10));

  return (
    <>
      This is the conference details page:
      <br />
      {JSON.stringify(conference)}
      <br />
      <iframe
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_PUBLIC_API_KEY}&q=${conference?.location}`}
      ></iframe>
    </>
  );
}
