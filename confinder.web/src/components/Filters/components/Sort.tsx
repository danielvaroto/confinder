import CheckIcon from '@mui/icons-material/Check';
import SortIcon from '@mui/icons-material/Sort';
import Chip from '@mui/material/Chip';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { MouseEvent, ReactElement, useState } from 'react';

import { useListFilter } from '../../../contexts/ListFilterContext';
import { SortField, SortOrder } from '../../../types/SortField';

export const Sort = (): ReactElement => {
  const { filter, setSort } = useListFilter();
  const { sort } = filter;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickChip = (event: MouseEvent<HTMLDivElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (): void => {
    setAnchorEl(null);
  };
  const handleSortChange = (field: SortField, order: SortOrder) => () => {
    setSort(field, order);
    handleCloseMenu();
    console.log(filter);
  };
  const menuItens = [
    { label: 'Menor Quais', field: SortField.QualisIndex, order: SortOrder.ASC },
    { label: 'Maior Quais', field: SortField.QualisIndex, order: SortOrder.DESC },
    { label: 'Data do evento mais próxima', field: SortField.EventDate, order: SortOrder.ASC },
    {
      label: 'Data de subimissão mais próxima',
      field: SortField.SubmissionDate,
      order: SortOrder.ASC,
    },
  ];
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
          {menuItens.map(({ label, field, order }) => (
            <MenuItem
              key={`${field}-${order}`}
              sx={{ px: 1 }}
              onClick={handleSortChange(field, order)}
            >
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                {sort?.field === field && sort?.order === order && <CheckIcon />}
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
