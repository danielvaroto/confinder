import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import LinkIcon from '@mui/icons-material/Link';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import AppBar from '@mui/material/AppBar';
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
    <Dialog fullScreen={isMobile} open={open} onClose={onClose}>
      {isMobile && (
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <ArrowBackIcon />
              Voltar
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      {data && (
        <Stack spacing={0.5} sx={{ px: 2, py: 1 }}>
          <Typography variant="h4">{data.name}</Typography>
          <Typography variant="h6">
            <PlaceOutlinedIcon />
            Local: {data.location}
          </Typography>
          <Typography variant="h6">
            <DateRangeOutlinedIcon />
            Data do evento: {formatDetailsDate(data.startDate)} até{' '}
            {formatDetailsDate(data.endDate)}
          </Typography>
          <Typography variant="h6">
            <PollOutlinedIcon />
            Classificação Qualis: {data.qualisIndex}
          </Typography>
          {data.officialConferenceUri && (
            <Button
              variant="contained"
              href={data.officialConferenceUri}
              endIcon={<LinkIcon />}
              target="_newtab"
            >
              Ir para site oficial
            </Button>
          )}
          {data.abstractRegistrationDue && (
            <Typography variant="h6">
              <TimerOutlinedIcon />
              Data de registro de resumo: {formatDetailsDate(data.abstractRegistrationDue)}
            </Typography>
          )}
          {data.submissionDeadline && (
            <Typography variant="h6">
              <TimerOutlinedIcon />
              Data de submissão: {formatDetailsDate(data.submissionDeadline)}
            </Typography>
          )}
          {data.notificationDue && (
            <Typography variant="h6">
              <TimerOutlinedIcon />
              Data da notificação: {formatDetailsDate(data.notificationDue)}
            </Typography>
          )}
          {data.finalVersionDue && (
            <Typography variant="h6">
              <TimerOutlinedIcon />
              Data da última versão: {formatDetailsDate(data.finalVersionDue)}
            </Typography>
          )}
        </Stack>
      )}
    </Dialog>
  );
};
