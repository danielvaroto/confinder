import MuiPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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
  };
  return (
    <Stack alignItems="center" m={1} mb={2}>
      <MuiPagination
        count={Math.ceil(totalCount / perPage)}
        color="primary"
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
};
