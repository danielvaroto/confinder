import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import LinkIcon from '@mui/icons-material/Link';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { useConferenceDetails } from '../../hooks/useConferenceDetails';
import { useIsMobile } from '../../hooks/useIsMobile';
import { formatDetailsDate } from '../../utils/formatDetailsDate';

// const Transition = forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export type ConferenceDetailsProps = {
  open: boolean;
  onClose: () => void;
  conferenceId: number;
};

export const ConferenceDetails = ({
  open,
  onClose,
  conferenceId,
}: ConferenceDetailsProps): ReactElement => {
  const isMobile = useIsMobile();
  const { data } = useConferenceDetails(conferenceId);

  return (
    <Dialog
      fullScreen={isMobile}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      {isMobile && (
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <ArrowBackIcon />
              <Typography sx={{ ml: 1 }}>Voltar</Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      {data && (
        <>
          <Box sx={{
            p: 3,
            background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
            color: 'white',
          }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              {data.name}
            </Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '1.1rem',
                opacity: 0.9
              }}>
                <PlaceOutlinedIcon />
                {data.location}
              </Typography>
              {data.officialConferenceUri && (
                <Button
                  variant="outlined"
                  component={Link}
                  href={data.officialConferenceUri}
                  endIcon={<LinkIcon />}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Site oficial
                </Button>
              )}
            </Stack>
          </Box>

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                PERÍODO DO EVENTO
              </Typography>
              <Typography sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                fontSize: '1.1rem'
              }}>
                <DateRangeOutlinedIcon color="primary" />
                {formatDetailsDate(data.startDate)} até {formatDetailsDate(data.endDate)}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                CLASSIFICAÇÃO
              </Typography>
              <Typography sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                fontSize: '1.1rem'
              }}>
                <PollOutlinedIcon color="primary" />
                Qualis: {' '}
                <Box
                  component="span"
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  {data.qualisIndex}
                </Box>
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                DATAS IMPORTANTES
              </Typography>
              <Stack spacing={2}>
                {data.abstractRegistrationDue && (
                  <Typography sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: '1.1rem'
                  }}>
                    <TimerOutlinedIcon color="primary" />
                    <Box>
                      <strong>Registro de resumo:</strong>
                      <br />
                      {formatDetailsDate(data.abstractRegistrationDue)}
                    </Box>
                  </Typography>
                )}
                {data.submissionDeadline && (
                  <Typography sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: '1.1rem'
                  }}>
                    <TimerOutlinedIcon color="primary" />
                    <Box>
                      <strong>Submissão:</strong>
                      <br />
                      {formatDetailsDate(data.submissionDeadline)}
                    </Box>
                  </Typography>
                )}
                {data.notificationDue && (
                  <Typography sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: '1.1rem'
                  }}>
                    <TimerOutlinedIcon color="primary" />
                    <Box>
                      <strong>Notificação:</strong>
                      <br />
                      {formatDetailsDate(data.notificationDue)}
                    </Box>
                  </Typography>
                )}
                {data.finalVersionDue && (
                  <Typography sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: '1.1rem'
                  }}>
                    <TimerOutlinedIcon color="primary" />
                    <Box>
                      <strong>Versão final:</strong>
                      <br />
                      {formatDetailsDate(data.finalVersionDue)}
                    </Box>
                  </Typography>
                )}
              </Stack>
            </Box>
          </Stack>
        </>
      )}
    </Dialog>
  );
};
