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
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
            Encontre conferências acadêmicas
          </Typography>
          {isLoading ? (
            <Skeleton width={200} />
          ) : (
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              {data?.conferencesCount} conferências encontradas em {data?.locationsCount} localizações
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
