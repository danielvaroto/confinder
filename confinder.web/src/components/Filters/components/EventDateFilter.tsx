import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ReactElement, useState } from 'react';

import { useListFilter } from '../../../contexts/ListFilterContext';
import { ResponsiveDrawer } from '../../ResponsiveDrawer';

export const EventDateFilter = (): ReactElement => {
  const {
    filter: { minEventDate, maxEventDate },
    setEventDate,
  } = useListFilter();
  const [open, setOpen] = useState(false);
  const handleMinDateChange = (value: Date | null) => {
    setEventDate(value ?? undefined, maxEventDate);
  };
  const handleMaxDateChange = (value: Date | null) => {
    setEventDate(minEventDate, value ?? undefined);
  };
  const handleClearFilter = () => {
    setEventDate();
  };
  const chipVariant = minEventDate || maxEventDate ? 'filled' : 'outlined';
  const handleChipDelete = minEventDate || maxEventDate ? handleClearFilter : undefined;
  return (
    <>
      <Chip
        icon={<DateRangeOutlinedIcon />}
        label="Evento"
        variant={chipVariant}
        sx={{ borderRadius: '8px', borderColor: '#616161' }}
        onClick={() => setOpen(true)}
        onDelete={handleChipDelete}
      />
      <ResponsiveDrawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
        <Grid container spacing={2} p={1}>
          <Grid item xs={12}>
            <Typography gutterBottom>Data do evento:</Typography>
            <FormControl fullWidth>
              <DatePicker
                label="De"
                maxDate={maxEventDate}
                value={minEventDate ?? null}
                onChange={handleMinDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <DatePicker
                label="Até"
                minDate={minEventDate}
                value={maxEventDate ?? null}
                onChange={handleMaxDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
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
