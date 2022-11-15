import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import Chip from '@mui/material/Chip';
import { ReactElement } from 'react';

export const QualisFilter = (): ReactElement => {
  const handleClick = (): void => {};
  return (
    <Chip
      icon={<PollOutlinedIcon />}
      label="Qualis"
      variant="outlined"
      sx={{ borderRadius: '8px', borderColor: '#616161' }}
      onClick={handleClick}
    />
  );
};
