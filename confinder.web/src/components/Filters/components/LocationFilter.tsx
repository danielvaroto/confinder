import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { ReactElement, useState } from 'react';

import { useListFilter } from '../../../contexts/ListFilterContext';
import { useLocationList } from '../../../hooks/useLocationList';
import { ResponsiveDrawer } from '../../ResponsiveDrawer';

export const LocationFilter = (): ReactElement => {
  const {
    filter: { location },
    setLocation,
  } = useListFilter();
  const [open, setOpen] = useState(false);
  const { isLoading, isError, data } = useLocationList();
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setLocation(event.target.value);
  };
  const handleClearFilter = () => {
    setLocation();
  };
  const chipVariant = location ? 'filled' : 'outlined';
  const handleChipDelete = location ? handleClearFilter : undefined;
  return (
    <>
      <Chip
        icon={<LocationOnOutlinedIcon />}
        label="Localização"
        variant={chipVariant}
        sx={{ borderRadius: '8px', borderColor: '#616161' }}
        onClick={() => setOpen(true)}
        onDelete={handleChipDelete}
      />
      <ResponsiveDrawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
        <Grid container spacing={2} p={1}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography gutterBottom>Localização:</Typography>
              <Select value={location ?? ''} onChange={handleSelectChange}>
                {data?.records.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClearFilter}
              startIcon={<DeleteIcon />}
            >
              Limpar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={() => setOpen(false)}>
              Ver resultados
            </Button>
          </Grid>
        </Grid>
      </ResponsiveDrawer>
    </>
  );
};
