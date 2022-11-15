import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

export const ConferenceCard = (): ReactElement => {
  return (
    <Card raised sx={{ m: 1 }}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '24px', mb: 1 }}>
            IEEE/CVF Conference on Compute Vision and Pattern Recognition
          </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px' }}>
            Online
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container justifyContent="space-between">
            <Chip icon={<StarBorderIcon />} label="Qualis A1" color="primary" variant="outlined" />
            <Chip icon={<PollOutlinedIcon />} label="20/02/22 até 20/03/23" variant="outlined" />
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
