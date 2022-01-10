import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import ConferenceDetails from './pages/ConferenceDetails';
import ConferenceList from './pages/ConferenceList';
import Map from './pages/Map';
import NotFound from './pages/NotFound';

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ConferenceList />} />
            <Route path="conferences">
              <Route index element={<ConferenceList />} />
              <Route path=":conferenceId/*" element={<ConferenceDetails />} />
            </Route>
            <Route path="map" element={<Map />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
