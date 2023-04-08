import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { ReactElement } from 'react';

import { ConferenceListItemResponse } from '../../types/ConferenceListItemResponse';
import { formatListCardDate } from '../../utils/formatListCardDate';
import { SubtitleTypography } from './components/SubtitleTypography';
import { TitleTypography } from './components/TitleTypography';

type ConferenceCardProps = {
  conference: ConferenceListItemResponse;
  onClick: () => void;
};

export const ConferenceCard = ({ conference, onClick }: ConferenceCardProps): ReactElement => {
  const qualisLabel = `Qualis ${conference.qualisIndex}`;
  const eventDateLabel = `${formatListCardDate(conference.startDate)} até ${formatListCardDate(
    conference.endDate,
  )}`;

  return (
    <Card raised sx={{ width: '100%' }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Box minHeight="68px">
            <TitleTypography>{conference.name}</TitleTypography>
            <SubtitleTypography>{conference.location}</SubtitleTypography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container justifyContent="space-between">
            {conference.qualisIndex[0] === 'A' ? (
              <Chip
                icon={<StarBorderIcon />}
                label={qualisLabel}
                color="primary"
                variant="outlined"
              />
            ) : (
              <Chip icon={<PollOutlinedIcon />} label={qualisLabel} variant="outlined" />
            )}
            <Chip icon={<CalendarMonthOutlinedIcon />} label={eventDateLabel} variant="outlined" />
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
