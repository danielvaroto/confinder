import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { ChangeEvent, ReactElement, useState } from 'react';
import { KeyboardEvent } from 'react';

import { useListFilter } from '../../../contexts/ListFilterContext';

export const Search = (): ReactElement => {
  const {
    filter: { name },
    setName,
  } = useListFilter();
  const [open, setOpen] = useState(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setOpen(false);
    }
  };
  return (
    <>
      <IconButton size="large" aria-label="search" color="inherit" onClick={() => setOpen(true)}>
        <SearchIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="Search modal"
        aria-describedby="Search conference name"
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            width: '100%',
            maxWidth: '500px',
            position: 'absolute',
            top: '30px',
            mx: 'auto',
            left: 0,
            right: 0,
          }}
        >
          <TextField
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            value={name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            placeholder="Buscar..."
          />
        </Box>
      </Modal>
    </>
  );
};
