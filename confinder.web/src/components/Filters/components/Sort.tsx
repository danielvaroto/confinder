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
import { baseChipStyles } from './BaseChipStyles';

type SortOption = {
  label: string;
  field: SortField;
  order: SortOrder;
  group: 'qualis' | 'dates';
};

const menuItems: SortOption[] = [
  {
    label: 'Menor Qualis',
    field: SortField.QualisIndex,
    order: SortOrder.ASC,
    group: 'qualis',
  },
  {
    label: 'Maior Qualis',
    field: SortField.QualisIndex,
    order: SortOrder.DESC,
    group: 'qualis',
  },
  {
    label: 'Data do evento mais próxima',
    field: SortField.EventDate,
    order: SortOrder.ASC,
    group: 'dates',
  },
  {
    label: 'Data do evento mais distante',
    field: SortField.EventDate,
    order: SortOrder.DESC,
    group: 'dates',
  },
  {
    label: 'Data de submissão mais próxima',
    field: SortField.SubmissionDate,
    order: SortOrder.ASC,
    group: 'dates',
  },
  {
    label: 'Data de submissão mais distante',
    field: SortField.SubmissionDate,
    order: SortOrder.DESC,
    group: 'dates',
  },
];

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
  };

  const isActive = Boolean(sort?.field && sort?.order);
  const activeLabel = menuItems.find(
    (item) => item.field === sort?.field && item.order === sort?.order,
  )?.label;

  return (
    <>
      <Chip
        icon={<SortIcon />}
        label={isActive ? activeLabel : 'Ordenar'}
        variant={isActive ? 'filled' : 'outlined'}
        sx={baseChipStyles}
        onClick={handleClickChip}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            maxHeight: 300,
            width: '250px'
          }
        }}
      >
        <MenuList dense sx={{ p: 0 }}>
          {menuItems.map(({ label, field, order }, index) => {
            const isFirstInGroup = index === 0 ||
              menuItems[index - 1].group !== menuItems[index].group;

            return (
              <MenuItem
                key={`${field}-${order}`}
                sx={{
                  px: 1,
                  mt: isFirstInGroup && index !== 0 ? 1 : 0,
                  borderTop: isFirstInGroup && index !== 0 ? 1 : 0,
                  borderColor: 'divider'
                }}
                onClick={handleSortChange(field, order)}
              >
                <ListItemIcon sx={{ justifyContent: 'center', minWidth: 40 }}>
                  {sort?.field === field && sort?.order === order && <CheckIcon />}
                </ListItemIcon>
                <ListItemText>{label}</ListItemText>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};
