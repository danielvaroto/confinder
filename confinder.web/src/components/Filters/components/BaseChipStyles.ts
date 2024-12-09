export const baseChipStyles = {
    borderRadius: 2,
    px: 1,
    height: 36,
    borderColor: 'grey.200',
    transition: 'all 0.2s ease',
    '& .MuiChip-label': {
        px: 1,
        fontSize: '0.875rem',
    },
    '& .MuiChip-icon': {
        fontSize: 20,
        color: 'text.secondary',
    },
    '& .MuiChip-deleteIcon': {
        fontSize: 18,
        color: 'text.secondary',
        '&:hover': {
            color: 'error.main',
        },
    },
    '&.MuiChip-filled': {
        bgcolor: 'primary.50',
        color: 'primary.main',
        borderColor: 'primary.100',
        '& .MuiChip-icon': {
            color: 'primary.main',
        },
        '& .MuiChip-deleteIcon': {
            color: 'primary.main',
            '&:hover': {
                color: 'primary.dark',
            },
        },
    },
    '&:hover': {
        borderColor: 'grey.300',
        bgcolor: 'grey.50',
    },
}; 