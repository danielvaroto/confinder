import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { AppBar } from '../components/AppBar';

export const Layout = (): ReactElement => {
  return (
    <>
      <AppBar />
      <div style={{ height: 'calc(100% - 64px)', display: 'flex' }}>
        <Outlet />
      </div>
    </>
  );
};
