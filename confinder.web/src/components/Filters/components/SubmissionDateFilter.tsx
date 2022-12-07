import DeleteIcon from '@mui/icons-material/Delete';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Moment } from 'moment';
import { ReactElement, useState } from 'react';

import { useListFilter } from '../../../contexts/ListFilterContext';
import { ResponsiveDrawer } from '../../ResponsiveDrawer';

export const SubmissionDateFilter = (): ReactElement => {
  const {
    filter: { minSubmissionDeadline, maxSubmissionDeadline },
    setSubmissionDeadline,
  } = useListFilter();
  const [open, setOpen] = useState(false);
  const handleMinDateChange = (value: Moment | null) => {
    setSubmissionDeadline(value?.toDate() ?? undefined, maxSubmissionDeadline);
  };
  const handleMaxDateChange = (value: Moment | null) => {
    setSubmissionDeadline(minSubmissionDeadline, value?.toDate() ?? undefined);
  };
  const handleClearFilter = () => {
    setSubmissionDeadline();
  };
  return (
    <>
      <Chip
        icon={<EventOutlinedIcon />}
        label="Submissão"
        variant="outlined"
        sx={{ borderRadius: '8px', borderColor: '#616161' }}
        onClick={() => setOpen(true)}
      />
      <ResponsiveDrawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
        <Grid container spacing={2} p={1}>
          <Grid item xs={12}>
            <Typography gutterBottom>Data da submissão:</Typography>
            <FormControl fullWidth>
              <DatePicker
                label="De"
                value={minSubmissionDeadline}
                onChange={handleMinDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <DatePicker
                label="Até"
                value={maxSubmissionDeadline}
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
