import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ReactElement } from 'react';

const theme = createTheme();

type ThemeProviderProps = {
  children: ReactElement;
};

export function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}
