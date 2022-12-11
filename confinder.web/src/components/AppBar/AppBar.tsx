import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import MUIAppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { Search } from './components/Search';
import { ThemeModeSwitch } from './components/ThemeModeSwitch';

export const AppBar = (): ReactElement => {
  return (
    <MUIAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TravelExploreIcon sx={{ display: 'flex', mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: 'flex',
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Confinder
          </Typography>
          <ThemeModeSwitch />
          <Search />
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
};
