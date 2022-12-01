import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import Chip from '@mui/material/Chip';
import { ReactElement } from 'react';

export const SubmissionDateFilter = (): ReactElement => {
  const handleClick = (): void => {
    console.log('hallo');
  };
  return (
    <Chip
      icon={<EventOutlinedIcon />}
      label="Submissão"
      variant="outlined"
      sx={{ borderRadius: '8px', borderColor: '#616161' }}
      onClick={handleClick}
    />
  );
};
