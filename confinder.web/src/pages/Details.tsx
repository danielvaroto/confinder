import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { useConferenceDetails } from '../hooks/useConferenceDetails';
import { formatDetailsDate } from '../utils/formatDetailsDate';

export const Details = (): ReactElement => {
  const { data } = useConferenceDetails(7);

  return (
    <Container maxWidth="xl">
      {data && (
        <Stack spacing={0.5} sx={{ px: 2, py: 1 }}>
          <Typography variant="h4">{data.name}</Typography>
          <Typography variant="h6">
            <PlaceOutlinedIcon />
            Local: {data.location}
          </Typography>
          <Typography variant="h6">
            <TimerOutlinedIcon />
            Data de submissão: {formatDetailsDate(data.submissionDeadline)}
          </Typography>
          <Typography variant="h6">
            <DateRangeOutlinedIcon />
            Data do evento: {formatDetailsDate(data.startDate)} até{' '}
            {formatDetailsDate(data.endDate)}
          </Typography>
          <Typography variant="h6">
            <PollOutlinedIcon />
            Classificação Qualis: {data.qualisIndex}
          </Typography>
        </Stack>
      )}
    </Container>
  );
};
