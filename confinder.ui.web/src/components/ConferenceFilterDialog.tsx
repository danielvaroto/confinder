import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UIEvent } from 'react';

import ResponsiveDatePicker from './ResponsiveDatePicker';

const qualisIndexes = [
  {
    value: 8,
    label: 'C',
  },
  {
    value: 7,
    label: 'B4',
  },
  {
    value: 6,
    label: 'B3',
  },
  {
    value: 5,
    label: 'B2',
  },
  {
    value: 4,
    label: 'B1',
  },
  {
    value: 3,
    label: 'A4',
  },
  {
    value: 2,
    label: 'A3',
  },
  {
    value: 1,
    label: 'A2',
  },
  {
    value: 0,
    label: 'A1',
  },
];

function valuetext(value: number) {
  return qualisIndexes[value].label;
}

type ConferenceFilterDialogProps = {
  open: boolean;
  handleClose: (event: UIEvent) => void;
};

export default function ConferenceFilterDialog({ open, handleClose }: ConferenceFilterDialogProps) {
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Filtros</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <Typography gutterBottom>Qualis</Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              aria-label="Always visible"
              defaultValue={[0, 8]}
              step={1}
              min={0}
              max={8}
              getAriaValueText={valuetext}
              marks={qualisIndexes}
            />
          </Box>
          <br />
          <Typography gutterBottom>Localização:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField
              id="input-with-sx"
              size="small"
              fullWidth
              placeholder="País, estado, cidade, rua.."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <br />
          <Typography gutterBottom>Data do evento:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <ResponsiveDatePicker
              datePickerProps={{ label: 'Início' }}
              textFieldProps={{ size: 'small' }}
            />
            <Box sx={{ mx: 2 }}> até </Box>
            <ResponsiveDatePicker
              datePickerProps={{ label: 'Fim' }}
              textFieldProps={{ size: 'small' }}
            />
          </Box>
          <br />
          <Typography gutterBottom>Data da submissão:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <ResponsiveDatePicker
              datePickerProps={{ label: 'Início' }}
              textFieldProps={{ size: 'small' }}
            />
            <Box sx={{ mx: 2 }}> até </Box>
            <ResponsiveDatePicker
              datePickerProps={{ label: 'Fim' }}
              textFieldProps={{ size: 'small' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Aplicar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
