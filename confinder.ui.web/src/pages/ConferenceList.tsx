import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { MouseEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getConferences } from '../_data';
import ConferenceFilterDialog from '../components/ConferenceFilterDialog';
import ConferenceListCard from '../components/ConferenceListCard';

export default function ConferenceList(): ReactElement {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };
  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const conferences = getConferences();

  const handleShowMapOnClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    navigate('/map');
  };

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
        <Button
          variant="outlined"
          startIcon={<LocationOnIcon />}
          fullWidth
          onClick={handleShowMapOnClick}
        >
          Mostrar mapa
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="outlined"
          startIcon={<FilterAltIcon />}
          fullWidth
          onClick={handleFilterOpen}
        >
          Filtros
        </Button>
        <ConferenceFilterDialog open={filterOpen} handleClose={handleFilterClose} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          {conferences.map((conference) => (
            <Grid item xs={12} sm={6} zeroMinWidth key={conference.id}>
              <ConferenceListCard conference={conference} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
