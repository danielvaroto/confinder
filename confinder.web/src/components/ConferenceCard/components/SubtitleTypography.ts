import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const SubtitleTypography = styled(Typography)({
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '20px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
