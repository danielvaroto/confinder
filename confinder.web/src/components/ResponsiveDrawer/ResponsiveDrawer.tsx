import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { ReactElement, ReactNode } from 'react';

import { useIsMobile } from '../../hooks/useIsMobile';
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
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={onClose}
          onOpen={onOpen}
          disableDiscovery
          disableSwipeToOpen
        >
          <Puller />
          <Box sx={{ mt: '32px' }}>{children}</Box>
        </SwipeableDrawer>
      ) : (
        <Dialog fullScreen={isMobile} open={open} onClose={onClose}>
          {children}
        </Dialog>
      )}
    </>
  );
};
