import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Conference } from '../_data';

type ConferenceListCardProps = {
  conference: Conference;
};

function getChipColor(qualis: string): 'success' | 'info' | 'default' {
  if (qualis.startsWith('A')) {
    return 'success';
  } else if (qualis.startsWith('B')) {
    return 'info';
  }
  return 'default';
}

export default function ConferenceListCard({ conference }: ConferenceListCardProps) {
  const navigate = useNavigate();

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const id = encodeURIComponent(conference.id);
    const name = encodeURIComponent(conference.name);
    navigate(`/conferences/${id}/${name}`);
  };

  return (
    <Card raised={false}>
      <CardActionArea onClick={handleOnClick}>
        <CardHeader
          avatar={
            <Chip label={conference.qualisIndex} color={getChipColor(conference.qualisIndex)} />
          }
          title={conference.name}
          subheader={
            <>
              {conference.startDate.substring(0, 10)} até {conference.endDate.substring(0, 10)} -{' '}
              <b>{conference.location}</b>
            </>
          }
        />
      </CardActionArea>
    </Card>
  );
}
