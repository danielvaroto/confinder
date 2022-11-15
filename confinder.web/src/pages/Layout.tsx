import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { AppBar } from '../components/AppBar';

export const Layout = (): ReactElement => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};
