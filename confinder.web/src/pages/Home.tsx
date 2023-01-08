import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { ConferenceCard } from '../components/ConferenceCard';
import { Filters } from '../components/Filters';
import { Pagination } from '../components/Pagination';
import { useListFilter } from '../contexts/ListFilterContext';
import { useConferenceList } from '../hooks/useConferenceList';

export const Home = (): ReactElement => {
  const navigate = useNavigate();
  const { filter } = useListFilter();
  const { isLoading, isError, data } = useConferenceList(filter);
  const handleFabMapClick = () => navigate(`/map`);

  return (
    <Container maxWidth="xl">
      <Stack spacing={0.5} sx={{ px: 2, py: 1 }}>
        <Typography variant="h6">Conferências no mundo</Typography>
        {isLoading ? (
          <Skeleton />
        ) : (
          <Typography variant="subtitle1">{data?.totalCount} resultados encontrados</Typography>
        )}
      </Stack>
      <Filters />
      <Grid container spacing={1}>
        {isLoading
          ? Array(12).map((i) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={i}>
                <Skeleton variant="rounded" height={165} />
              </Grid>
            ))
          : data?.records?.map((c) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={c.id}>
                <ConferenceCard conference={c} />
              </Grid>
            ))}
      </Grid>
      {data?.perPage && data?.totalCount ? (
        <Pagination perPage={data.perPage} totalCount={data.totalCount} />
      ) : null}
      <Fab
        variant="extended"
        sx={{
          margin: '0 auto',
          top: 'auto',
          right: 'auto',
          bottom: 20,
          left: 'auto',
          position: 'fixed',
        }}
        onClick={handleFabMapClick}
      >
        <MapOutlinedIcon sx={{ mr: 1 }} />
        Mapa
      </Fab>
    </Container>
  );
};
