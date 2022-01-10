import Container from '@mui/material/Container';
import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import MiniDrawer from './components/MiniDrawer';

export default function Layout(): ReactElement {
  return (
    <>
      <MiniDrawer>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </MiniDrawer>
    </>
  );
}
