import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const TitleTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '24px',
  mb: 1,
});
