import { BrowserRouter } from 'react-router';
import RoutingComponent from '@components/RoutingComponent/RoutingComponent';
import { createCustomTheme } from '@agile-software/shared-components';
import { THEME_ID as MATERIAL_THEME_ID, ThemeProvider } from '@mui/material';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy';
import './i18n';
import { Provider } from 'react-redux';
import store from '@stores/index.ts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import LanguageSelectorComponent from './components/LanguageSelectorComponent/LanguageSelectorComponent';

const theme = createCustomTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          500: '#your-primary-color',
        },
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

type AppProps = {
  basename?: string;
};

function App({ basename }: AppProps) {
  // Simuliere Authentifizierung: Setze Dummy-Token beim App-Start
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', 'mocked-entraid-token');
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <Provider store={store}>
        <ThemeProvider theme={{ [MATERIAL_THEME_ID]: theme }}>
          <JoyCssVarsProvider>
            <LanguageSelectorComponent />
            <BrowserRouter basename={basename}>
              <RoutingComponent />
            </BrowserRouter>
          </JoyCssVarsProvider>
        </ThemeProvider>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
