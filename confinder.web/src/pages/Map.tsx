import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ConferenceMap } from '../components/ConferenceMap';
import { Filters } from '../components/Filters';
import { useListFilter } from '../contexts/ListFilterContext';
import { useConferenceMap } from '../hooks/useConferenceMap';

export const Map = () => {
  const { filter } = useListFilter();
  const { isLoading, data } = useConferenceMap(filter);

  return (
    <Grid container direction="column">
      <Grid item>
        <Stack spacing={0.5} sx={{ px: 2, py: 1 }}>
          <Typography variant="h6">Conferências no mundo</Typography>
          {isLoading ? (
            <Skeleton />
          ) : (
            <Typography variant="subtitle1">
              {data?.conferencesCount} conferências encontradas em {data?.locationsCount}{' '}
              localizações.
            </Typography>
          )}
        </Stack>
        <Filters isMap />
      </Grid>
      <Grid item xs>
        <ConferenceMap items={data?.records} />
      </Grid>
    </Grid>
  );
};
