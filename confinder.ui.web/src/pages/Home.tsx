import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { ReactElement } from 'react';

import { getConferences } from '../_data';
import ConferenceListCard from '../components/ConferenceListCard';

export default function Home(): ReactElement {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          label="Buscar conferências..."
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" startIcon={<LocationOnIcon />} fullWidth>
          Mostrar mapa
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" startIcon={<FilterAltIcon />} fullWidth>
          Filtros
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          {getConferences().map((conference) => (
            <Grid item xs={12} sm={6} zeroMinWidth>
              <ConferenceListCard conference={conference} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
