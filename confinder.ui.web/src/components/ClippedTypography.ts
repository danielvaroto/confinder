import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

export const ClippedTypography = styled(Typography)({
  flex: 1,
  whiteSpace: 'nowrap',
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
});
