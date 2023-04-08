import Stack from '@mui/material/Stack';
import { ReactElement } from 'react';

import { EventDateFilter } from './components/EventDateFilter';
import { LocationFilter } from './components/LocationFilter';
import { NameFilter } from './components/NameFilter';
import { QualisFilter } from './components/QualisFilter';
import { Sort } from './components/Sort';
import { SubmissionDateFilter } from './components/SubmissionDateFilter';

export type FiltersProps = {
  isMap?: boolean;
};

export const Filters = ({ isMap = false }: FiltersProps): ReactElement => {
  return (
    <Stack spacing={1} direction="row" sx={{ overflowX: 'auto', px: 2, pb: 1 }}>
      {!isMap && <Sort />}
      <NameFilter />
      <QualisFilter />
      {!isMap && <LocationFilter />}
      <SubmissionDateFilter />
      <EventDateFilter />
    </Stack>
  );
};
