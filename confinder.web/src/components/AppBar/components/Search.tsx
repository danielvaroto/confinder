import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { KeyboardEvent } from 'react';

import { useListFilter } from '../../../contexts/ListFilterContext';
import { ModalBox } from './ModalBox';

export const Search = (): ReactElement => {
  const {
    filter: { name },
    setName,
  } = useListFilter();
  const inputRef = useRef<HTMLInputElement>();
  const [open, setOpen] = useState(false);
  const handleSearchClick = () => {
    setOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };
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
      <IconButton size="large" aria-label="search" color="inherit" onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="Search modal"
        aria-describedby="Search conference name"
      >
        <ModalBox>
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
            inputRef={inputRef}
            fullWidth
            placeholder="Buscar..."
          />
        </ModalBox>
      </Modal>
    </>
  );
};
