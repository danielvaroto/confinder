import Stack from '@mui/material/Stack';
import { ReactElement } from 'react';

import { EventDateFilter } from './components/EventDateFilter';
import { LocationFilter } from './components/LocationFilter';
import { QualisFilter } from './components/QualisFilter';
import { Sort } from './components/Sort';
import { SubmissionDateFilter } from './components/SubmissionDateFilter';

export const Filters = (): ReactElement => {
  return (
    <Stack spacing={1} direction="row" sx={{ overflowX: 'auto', px: 2, pb: 1 }}>
      <Sort />
      <QualisFilter />
      <LocationFilter />
      <SubmissionDateFilter />
      <EventDateFilter />
    </Stack>
  );
};
