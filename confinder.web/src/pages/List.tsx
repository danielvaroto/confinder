import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { ReactElement, useState } from 'react';

import { ConferenceCard } from '../components/ConferenceCard';
import { ConferenceDetails } from '../components/ConferenceDetails';
import { Filters } from '../components/Filters';
import { Pagination } from '../components/Pagination';
import { useListFilter } from '../contexts/ListFilterContext';
import { useConferenceList } from '../hooks/useConferenceList';

export const List = (): ReactElement => {
  const { filter } = useListFilter();
  const { isLoading, data } = useConferenceList(filter);
  const [openConferenceDetails, setOpenConferenceDetails] = useState(false);
  const [selectedConference, setSelectedConference] = useState(0);

  const handleConferenceCardClick = (conferenceId: number) => {
    setSelectedConference(conferenceId);
    setOpenConferenceDetails(true);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{
          mt: 3,
          mb: 3,
        }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
            Encontre conferências acadêmicas
          </Typography>
          {isLoading ? (
            <Skeleton width={200} />
          ) : (
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              {data?.totalCount} {data?.totalCount === 1 ? 'conferência encontrada' : 'conferências encontradas'}
            </Typography>
          )}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Filters />
        </Box>

        <Grid container spacing={2.5}>
          {isLoading
            ? Array(12).fill(0).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton
                  variant="rounded"
                  height={180}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))
            : data?.records?.map((c) => (
              <Grid item xs={12} sm={6} md={4} key={c.id}>
                <ConferenceCard
                  conference={c}
                  onClick={() => handleConferenceCardClick(c.id)}
                />
              </Grid>
            ))}
        </Grid>

        {data?.perPage && data?.totalCount ? (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination perPage={data.perPage} totalCount={data.totalCount} />
          </Box>
        ) : null}

        <ConferenceDetails
          open={openConferenceDetails}
          onClose={() => setOpenConferenceDetails(false)}
          conferenceId={selectedConference}
        />
      </Container>
    </>
  );
};
