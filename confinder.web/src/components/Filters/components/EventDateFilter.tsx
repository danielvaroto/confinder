import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import Chip from '@mui/material/Chip';
import { ReactElement } from 'react';

export const EventDateFilter = (): ReactElement => {
  const handleClick = (): void => {
    console.log('hallo');
  };
  return (
    <Chip
      icon={<DateRangeOutlinedIcon />}
      label="Evento"
      variant="outlined"
      sx={{ borderRadius: '8px', borderColor: '#616161' }}
      onClick={handleClick}
    />
  );
};
