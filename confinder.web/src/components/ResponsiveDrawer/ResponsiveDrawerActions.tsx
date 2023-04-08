import DialogActions from '@mui/material/DialogActions';
import { Fragment, ReactElement, ReactNode } from 'react';

import { useIsMobile } from '../../hooks/useIsMobile';

const DialogActionsWithPadding = ({ children }: any): ReactElement => {
  return <DialogActions sx={{ px: '24px' }}>{children}</DialogActions>;
};

export type ResponsiveDrawerActionsProps = {
  children: ReactNode;
};

export const ResponsiveDrawerActions = ({
  children,
}: ResponsiveDrawerActionsProps): ReactElement => {
  const isMobile = useIsMobile();
  const ActionsContainer = isMobile ? Fragment : DialogActionsWithPadding;

  return <ActionsContainer>{children}</ActionsContainer>;
};
