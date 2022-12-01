import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Chip from '@mui/material/Chip';
import { ReactElement } from 'react';

export const LocationFilter = (): ReactElement => {
  const handleClick = (): void => {
    console.log('hallo');
  };
  return (
    <Chip
      icon={<LocationOnOutlinedIcon />}
      label="Localização"
      variant="outlined"
      sx={{ borderRadius: '8px', borderColor: '#616161' }}
      onClick={handleClick}
    />
  );
};
