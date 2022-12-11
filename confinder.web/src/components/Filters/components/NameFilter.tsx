import AbcIcon from '@mui/icons-material/Abc';
import Chip from '@mui/material/Chip';
import { ReactElement } from 'react';

import { useListFilter } from '../../../contexts/ListFilterContext';
export const NameFilter = (): ReactElement => {
  const {
    filter: { name },
    setName,
  } = useListFilter();
  const handleClearFilter = () => {
    setName();
  };
  return (
    <>
      {name ? (
        <Chip
          icon={<AbcIcon />}
          label={name}
          sx={{ borderRadius: '8px', borderColor: '#616161' }}
          onDelete={handleClearFilter}
        />
      ) : null}
    </>
  );
};
