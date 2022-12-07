import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ReactElement, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ColorModeContext } from './contexts/ColorModeContext';
import { ListFilterContextProvider } from './contexts/ListFilterContext';
import { Details } from './pages/Details';
import { Home } from './pages/Home';
import { Layout } from './pages/Layout';

export const App = (): ReactElement => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'details/:id',
          element: <Details />,
        },
        {
          path: '',
          element: <Home />,
        },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <QueryClientProvider client={queryClient}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ListFilterContextProvider>
              <RouterProvider router={router} />
            </ListFilterContextProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
};
