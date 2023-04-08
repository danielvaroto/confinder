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

const qualisByNumber: Record<number, QualisIndex> = {
  1: QualisIndex.A1,
  2: QualisIndex.A2,
  3: QualisIndex.A3,
  4: QualisIndex.A4,
  5: QualisIndex.B1,
  6: QualisIndex.B2,
  7: QualisIndex.B3,
  8: QualisIndex.B4,
  9: QualisIndex.C,
};

const numberByQualis: Record<QualisIndex, number> = {
  [QualisIndex.A1]: 1,
  [QualisIndex.A2]: 2,
  [QualisIndex.A3]: 3,
  [QualisIndex.A4]: 4,
  [QualisIndex.B1]: 5,
  [QualisIndex.B2]: 6,
  [QualisIndex.B3]: 7,
  [QualisIndex.B4]: 8,
  [QualisIndex.C]: 9,
};

const marks: { value: number; label: QualisIndex }[] = [
  {
    value: 1,
    label: QualisIndex.A1,
  },
  {
    value: 2,
    label: QualisIndex.A2,
  },
  {
    value: 3,
    label: QualisIndex.A3,
  },
  {
    value: 4,
    label: QualisIndex.A4,
  },
  {
    value: 5,
    label: QualisIndex.B1,
  },
  {
    value: 6,
    label: QualisIndex.B2,
  },
  {
    value: 7,
    label: QualisIndex.B3,
  },
  {
    value: 8,
    label: QualisIndex.B4,
  },
  {
    value: 9,
    label: QualisIndex.C,
  },
];

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
    const minQualisValue = value[1] === marks.length ? undefined : qualisByNumber[value[1]];
    const maxQualisValue = value[0] === 1 ? undefined : qualisByNumber[value[0]];
    setQualisIndex(minQualisValue, maxQualisValue);
  };
  const handleClearFilter = () => {
    setQualisIndex();
  };
  const chipVariant = minQualisIndex || maxQualisIndex ? 'filled' : 'outlined';
  const handleChipDelete = minQualisIndex || maxQualisIndex ? handleClearFilter : undefined;
  const value = [
    maxQualisIndex ? numberByQualis[maxQualisIndex] : 1,
    minQualisIndex ? numberByQualis[minQualisIndex] : marks.length,
  ];

  return (
    <>
      <Chip
        icon={<PollOutlinedIcon />}
        label="Qualis"
        variant={chipVariant}
        sx={{ borderRadius: '8px', borderColor: '#616161' }}
        onClick={() => setOpen(true)}
        onDelete={handleChipDelete}
      />
      <ResponsiveDrawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
        <Grid container spacing={2} p={1}>
          <Grid item xs={12}>
            <Box px={2}>
              <Typography gutterBottom>Qualis</Typography>
              <Slider
                value={value}
                onChange={handleSliderChange}
                marks={marks}
                min={1}
                max={marks.length}
                getAriaValueText={(v) => v.toString()}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClearFilter}
              startIcon={<DeleteIcon />}
            >
              Limpar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={() => setOpen(false)}>
              Ver resultados
            </Button>
          </Grid>
        </Grid>
      </ResponsiveDrawer>
    </>
  );
};
