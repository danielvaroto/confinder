import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import * as React from 'react';

type ResponsiveDatePickerProps = {
  datePickerProps: Pick<DatePickerProps, 'label'>;
  textFieldProps: Partial<TextFieldProps>;
};

export default function ResponsiveDatePicker({
  datePickerProps,
  textFieldProps,
}: ResponsiveDatePickerProps) {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => <TextField {...params} {...textFieldProps} />}
        {...datePickerProps}
      />
    </LocalizationProvider>
  );
}
