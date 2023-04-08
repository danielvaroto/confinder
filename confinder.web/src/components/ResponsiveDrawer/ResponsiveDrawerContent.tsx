import DialogContent from '@mui/material/DialogContent';
import { Fragment, ReactElement, ReactNode } from 'react';

import { useIsMobile } from '../../hooks/useIsMobile';

export type ResponsiveDrawerContentProps = {
  children: ReactNode;
};

export const ResponsiveDrawerContent = ({
  children,
}: ResponsiveDrawerContentProps): ReactElement => {
  const isMobile = useIsMobile();
  const ContentContainer = isMobile ? Fragment : DialogContent;

  return <ContentContainer>{children}</ContentContainer>;
};
