import MuiPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChangeEvent, ReactElement } from 'react';

import { useListFilter } from '../../contexts/ListFilterContext';

type PaginationProps = {
  perPage: number;
  totalCount: number;
};

export const Pagination = ({ perPage, totalCount }: PaginationProps): ReactElement => {
  const {
    filter: { page },
    setPage,
  } = useListFilter();

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Stack alignItems="center" m={1} mb={2}>
      <MuiPagination
        count={Math.ceil(totalCount / perPage)}
        page={page}
        onChange={handleChange}
        size="large"
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1}
        sx={{
          '.MuiPaginationItem-root': {
            borderRadius: 2,
            margin: '0 4px',
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            },
            '&:hover': {
              bgcolor: 'primary.50',
            },
          },
          '.MuiPaginationItem-firstLast': {
            bgcolor: 'grey.100',
          },
        }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 1.5,
          fontSize: '0.875rem',
          opacity: 0.8
        }}
      >
        Página {page} de {Math.ceil(totalCount / perPage)}
      </Typography>
    </Stack>
  );
};
