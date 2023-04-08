import DeleteIcon from '@mui/icons-material/Delete';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
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

export const SubmissionDateFilter = (): ReactElement => {
  const {
    filter: { minSubmissionDeadline, maxSubmissionDeadline },
    setSubmissionDeadline,
  } = useListFilter();
  const [open, setOpen] = useState(false);
  const handleMinDateChange = (value: Date | null) => {
    setSubmissionDeadline(value ?? undefined, maxSubmissionDeadline);
  };
  const handleMaxDateChange = (value: Date | null) => {
    setSubmissionDeadline(minSubmissionDeadline, value ?? undefined);
  };
  const handleClearFilter = () => {
    setSubmissionDeadline();
  };
  const chipVariant = minSubmissionDeadline || maxSubmissionDeadline ? 'filled' : 'outlined';
  const handleChipDelete =
    minSubmissionDeadline || maxSubmissionDeadline ? handleClearFilter : undefined;
  return (
    <>
      <Chip
        icon={<EventOutlinedIcon />}
        label="Submissão"
        variant={chipVariant}
        sx={{ borderRadius: '8px', borderColor: '#616161' }}
        onClick={() => setOpen(true)}
        onDelete={handleChipDelete}
      />
      <ResponsiveDrawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
        <Grid container spacing={2} p={1}>
          <Grid item xs={12}>
            <Typography>Data da submissão:</Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <DatePicker
                label="De"
                maxDate={maxSubmissionDeadline}
                value={minSubmissionDeadline ?? null}
                onChange={handleMinDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <DatePicker
                label="Até"
                minDate={minSubmissionDeadline}
                value={maxSubmissionDeadline ?? null}
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
