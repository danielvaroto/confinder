import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { ConferenceListItemResponse } from '../../types/ConferenceListItemResponse';
import { formatListCardDate } from '../../utils/formatListCardDate';

type ConferenceCardProps = {
  conference: ConferenceListItemResponse;
};

export const ConferenceCard = ({ conference }: ConferenceCardProps): ReactElement => {
  const navigate = useNavigate();

  const qualisLabel = `Qualis ${conference.qualisIndex}`;
  const eventDateLabel = `${formatListCardDate(conference.startDate)} até ${formatListCardDate(
    conference.endDate,
  )}`;

  const handleCardClick = () => navigate(`/details/${conference.id}`);

  return (
    <Card raised sx={{ m: 1 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          <Typography sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '24px', mb: 1 }}>
            {conference.name}
          </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px' }}>
            {conference.location}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container justifyContent="space-between">
            <Chip
              icon={<StarBorderIcon />}
              label={qualisLabel}
              color="primary"
              variant="outlined"
            />
            <Chip icon={<PollOutlinedIcon />} label={eventDateLabel} variant="outlined" />
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
