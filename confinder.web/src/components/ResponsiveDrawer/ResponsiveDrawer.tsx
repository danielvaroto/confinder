import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { ReactElement, ReactNode } from 'react';

import { Puller } from './components/Puller';

export type ResponsiveDrawerProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const ResponsiveDrawer = ({
  children,
  open,
  onClose,
  onOpen,
}: ResponsiveDrawerProps): ReactElement => {
  return (
    <SwipeableDrawer open={open} onClose={onClose} onOpen={onOpen}>
      <Puller />
      {children}
    </SwipeableDrawer>
  );
};