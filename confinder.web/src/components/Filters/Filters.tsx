import Box from '@mui/material/Box';
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
    <Box sx={{
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: '24px',
        background: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))',
        pointerEvents: 'none',
      }
    }}>
      <Stack
        spacing={1}
        direction="row"
        sx={{
          overflowX: 'auto',
          pb: 1,
          px: 2,
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {!isMap && <Sort />}
        <NameFilter />
        <QualisFilter />
        {!isMap && <LocationFilter />}
        <SubmissionDateFilter />
        <EventDateFilter />
      </Stack>
    </Box>
  );
};
