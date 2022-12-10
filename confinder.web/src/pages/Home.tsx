import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { ConferenceCard } from '../components/ConferenceCard';
import { Filters } from '../components/Filters';
import { Pagination } from '../components/Pagination';
import { useListFilter } from '../contexts/ListFilterContext';
import { useConferenceList } from '../hooks/fetchConferenceList';

export const Home = (): ReactElement => {
  const { filter } = useListFilter();
  const { isLoading, isError, data } = useConferenceList(filter);

  return (
    <>
      <Stack spacing={0.5} sx={{ px: 2, py: 1 }}>
        <Typography variant="h6">Conferências no mundo</Typography>
        <Typography variant="subtitle1">865 resultados encontrados</Typography>
      </Stack>
      <Filters />
      <Grid container spacing={1}>
        {data?.records?.map((c) => (
          <Grid item sm={12} md={6} lg={4} xl={3} key={c.id}>
            <ConferenceCard conference={c} />
          </Grid>
        ))}
      </Grid>
      {data?.perPage && data?.totalCount ? (
        <Pagination perPage={data.perPage} totalCount={data.totalCount} />
      ) : null}
    </>
  );
};
