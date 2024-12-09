import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { ConferenceListItemResponse } from '../../types/ConferenceListItemResponse';
import { formatListCardDate } from '../../utils/formatListCardDate';

type ConferenceCardProps = {
  conference: ConferenceListItemResponse;
  onClick: () => void;
  sx?: SxProps<Theme> | undefined;
};

export const ConferenceCard = ({ conference, onClick, sx }: ConferenceCardProps): ReactElement => {
  const eventDateLabel = `${formatListCardDate(conference.startDate)} até ${formatListCardDate(
    conference.endDate,
  )}`;

  const isQualisA = conference.qualisIndex[0] === 'A';

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        borderRadius: 2,
        bgcolor: 'background.paper',
        transition: 'all 0.3s ease-in-out',
        border: '1px solid',
        borderColor: isQualisA ? 'primary.main' : 'divider',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px -10px rgba(0,0,0,0.15)',
          borderColor: 'primary.main',
        },
        ...(sx ?? {})
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{ p: 2.5 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography
            sx={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'text.primary',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.3,
              mb: 2,
              minHeight: '3.9em',
              '&::after': {
                content: '""',
                textAlign: 'right',
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '40%',
                height: '1.2em',
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%)'
              }
            }}
          >
            {conference.name}
          </Typography>

          <Stack spacing={1.5} sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <PlaceOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: '0.9rem' }}>
                {conference.location}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: '0.9rem' }}>
                {eventDateLabel}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                bgcolor: isQualisA ? 'primary.main' : 'grey.100',
                color: isQualisA ? 'white' : 'text.secondary',
                borderRadius: '8px',
                px: 1.5,
                py: 0.5,
                fontSize: '0.85rem',
                fontWeight: 600,
                alignSelf: 'flex-start',
              }}
            >
              {isQualisA && <StarIcon sx={{ fontSize: 16 }} />}
              Qualis {conference.qualisIndex}
            </Box>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
};