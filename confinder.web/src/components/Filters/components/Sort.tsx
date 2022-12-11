import CheckIcon from '@mui/icons-material/Check';
import SortIcon from '@mui/icons-material/Sort';
import Chip from '@mui/material/Chip';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { MouseEvent, ReactElement, useState } from 'react';

export const Sort = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickChip = (event: MouseEvent<HTMLDivElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (): void => {
    setAnchorEl(null);
  };
  return (
    <>
      <Chip
        icon={<SortIcon />}
        label="Ordenar"
        variant="outlined"
        sx={{ borderRadius: '8px', borderColor: '#616161' }}
        onClick={handleClickChip}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuList dense sx={{ p: 0 }}>
          <MenuItem sx={{ px: 1 }} onClick={handleCloseMenu}>
            <ListItemIcon></ListItemIcon>
            <ListItemText>Data evento</ListItemText>
          </MenuItem>
          <MenuItem sx={{ px: 1 }} onClick={handleCloseMenu}>
            <ListItemIcon></ListItemIcon>
            <ListItemText>Data submissão</ListItemText>
          </MenuItem>
          <MenuItem sx={{ px: 1 }} onClick={handleCloseMenu}>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText>Qualis</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
