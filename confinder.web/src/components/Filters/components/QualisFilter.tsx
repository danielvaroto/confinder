import DeleteIcon from '@mui/icons-material/Delete';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { ReactElement, useState } from 'react';

import { useListFilter } from '../../../contexts/ListFilterContext';
import { QualisIndex } from '../../../types/QualisIndex';
import { ResponsiveDrawer } from '../../ResponsiveDrawer';
import { baseChipStyles } from './BaseChipStyles';

const marks: { value: number; label: QualisIndex }[] = [
  {
    value: 9,
    label: QualisIndex.A1,
  },
  {
    value: 8,
    label: QualisIndex.A2,
  },
  {
    value: 7,
    label: QualisIndex.A3,
  },
  {
    value: 6,
    label: QualisIndex.A4,
  },
  {
    value: 5,
    label: QualisIndex.B1,
  },
  {
    value: 4,
    label: QualisIndex.B2,
  },
  {
    value: 3,
    label: QualisIndex.B3,
  },
  {
    value: 2,
    label: QualisIndex.B4,
  },
  {
    value: 1,
    label: QualisIndex.C,
  },
];

const qualisByNumber: Record<number, QualisIndex> = {
  9: QualisIndex.A1,
  8: QualisIndex.A2,
  7: QualisIndex.A3,
  6: QualisIndex.A4,
  5: QualisIndex.B1,
  4: QualisIndex.B2,
  3: QualisIndex.B3,
  2: QualisIndex.B4,
  1: QualisIndex.C,
};

const numberByQualis: Record<QualisIndex, number> = {
  [QualisIndex.A1]: 9,
  [QualisIndex.A2]: 8,
  [QualisIndex.A3]: 7,
  [QualisIndex.A4]: 6,
  [QualisIndex.B1]: 5,
  [QualisIndex.B2]: 4,
  [QualisIndex.B3]: 3,
  [QualisIndex.B4]: 2,
  [QualisIndex.C]: 1,
};

export const QualisFilter = (): ReactElement => {
  const {
    filter: { minQualisIndex, maxQualisIndex },
    setQualisIndex,
  } = useListFilter();
  const [open, setOpen] = useState(false);

  const handleSliderChange = (_: Event, value: number | number[]) => {
    if (!Array.isArray(value)) {
      return;
    }
    const minQualisValue = value[0] === 1 ? undefined : qualisByNumber[value[0]];
    const maxQualisValue = value[1] === 9 ? undefined : qualisByNumber[value[1]];
    setQualisIndex(minQualisValue, maxQualisValue);
  };

  const handleClearFilter = () => {
    setQualisIndex();
  };

  const value = [
    minQualisIndex ? numberByQualis[minQualisIndex] : 1,
    maxQualisIndex ? numberByQualis[maxQualisIndex] : 9,
  ];

  const getValueLabel = (value: number) => qualisByNumber[value];
  const chipLabel = minQualisIndex || maxQualisIndex
    ? `${minQualisIndex || 'C'} - ${maxQualisIndex || 'A1'}`
    : 'Qualis';

  return (
    <>
      <Chip
        icon={<PollOutlinedIcon />}
        label={chipLabel}
        variant={minQualisIndex || maxQualisIndex ? 'filled' : 'outlined'}
        sx={baseChipStyles}
        onClick={() => setOpen(true)}
        onDelete={minQualisIndex || maxQualisIndex ? handleClearFilter : undefined}
      />
      <ResponsiveDrawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
        <Grid container spacing={2} p={3}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                mb: 0.5
              }}
            >
              Classificação Qualis
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 4
              }}
            >
              Selecione o intervalo de classificação Qualis desejado
            </Typography>

            <Box
              sx={{
                px: 2,
                py: 3,
                backgroundColor: 'grey.50',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200'
              }}
            >
              <Slider
                value={value}
                onChange={handleSliderChange}
                marks={marks}
                min={1}
                max={9}
                step={1}
                valueLabelDisplay="on"
                valueLabelFormat={getValueLabel}
                getAriaValueText={getValueLabel}
                sx={{
                  '& .MuiSlider-rail': {
                    height: 8,
                    backgroundColor: 'grey.200',
                  },
                  '& .MuiSlider-track': {
                    height: 8,
                    border: 'none',
                  },
                  '& .MuiSlider-thumb': {
                    width: 24,
                    height: 24,
                    backgroundColor: '#fff',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)',
                    },
                  },
                  '& .MuiSlider-mark': {
                    width: 2,
                    height: 8,
                    backgroundColor: 'grey.300',
                  },
                  '& .MuiSlider-markLabel': {
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'text.primary',
                    mt: 1,
                  },
                  '& .MuiSlider-valueLabel': {
                    backgroundColor: 'primary.main',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '4px 8px',
                    borderRadius: 1,
                  },
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleClearFilter}
                  startIcon={<DeleteIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    py: 1,
                    color: 'grey.700',
                    borderColor: 'grey.300',
                    '&:hover': {
                      borderColor: 'grey.400',
                      backgroundColor: 'grey.50',
                    },
                  }}
                >
                  Limpar
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setOpen(false)}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    py: 1,
                    boxShadow: 2,
                    '&:hover': {
                      boxShadow: 3,
                    },
                  }}
                >
                  Ver resultados
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ResponsiveDrawer>
    </>
  );
};
