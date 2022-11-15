import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { ConferenceCard } from '../components/ConferenceCard';
import { Filters } from '../components/Filters';

export const Home = (): ReactElement => {
  return (
    <>
      <Stack spacing={0.5} sx={{ px: 2, py: 1 }}>
        <Typography variant="h6">Conferências no mundo</Typography>
        <Typography variant="subtitle1">865 resultados encontrados</Typography>
      </Stack>
      <Filters />
      <Stack>
        <ConferenceCard />
        <ConferenceCard />
        <ConferenceCard />
        <ConferenceCard />
      </Stack>
    </>
  );
};
