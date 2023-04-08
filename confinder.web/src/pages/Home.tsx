import MapIcon from '@mui/icons-material/Map';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ConferenceCard } from '../components/ConferenceCard';
import { ConferenceDetails } from '../components/ConferenceDetails';
import { Filters } from '../components/Filters';
import { Pagination } from '../components/Pagination';
import { useListFilter } from '../contexts/ListFilterContext';
import { useConferenceList } from '../hooks/useConferenceList';

export const Home = (): ReactElement => {
  const navigate = useNavigate();
  const { filter } = useListFilter();
  const { isLoading, data } = useConferenceList(filter);
  const handleFabMapClick = () => navigate(`/map`);
  const [openConferenceDetails, setOpenConferenceDetails] = useState(false);
  const [selectedConference, setSelectedConference] = useState(0);
  const handleConferenceCardClick = (conferenceId: number) => {
    setSelectedConference(conferenceId);
    setOpenConferenceDetails(true);
  };

  return (
    <>
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
                  <ConferenceCard conference={c} onClick={() => handleConferenceCardClick(c.id)} />
                </Grid>
              ))}
        </Grid>
        {data?.perPage && data?.totalCount ? (
          <Pagination perPage={data.perPage} totalCount={data.totalCount} />
        ) : null}
        <ConferenceDetails
          open={openConferenceDetails}
          onClose={() => setOpenConferenceDetails(false)}
          conferenceId={selectedConference}
        />
      </Container>

      <Grid width="100%" position="fixed" justifyContent="center" display="flex" bottom="5vh">
        <Fab variant="extended" size="small" onClick={handleFabMapClick}>
          Ver mapa
          <MapIcon sx={{ ml: 1 }} />
        </Fab>
      </Grid>
    </>
  );
};
