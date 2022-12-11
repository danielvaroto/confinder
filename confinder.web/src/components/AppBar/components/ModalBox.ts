import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const ModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  width: '100%',
  maxWidth: theme.breakpoints.values.sm,
  position: 'absolute',
  top: '30px',
  marginLeft: 'auto',
  marginRight: 'auto',
  left: 0,
  right: 0,
  [theme.breakpoints.down('sm')]: {
    top: '0px',
  },
}));
