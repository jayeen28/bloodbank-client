import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { useState } from 'react';
import { Routings } from './Components/Routings';

function App() {
  const [mode, setMode] = useState('dark');
  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins", sans-serif',
      mode,
      ...(mode === 'light' ? {
        h2: {
          color: 'Black'
        },
        h4: {
          color: 'Black'
        },
        body1: {
          color: 'Black'
        },
        body2: {
          color: 'Black'
        }
      } : {
        h2: {
          color: '#E2E2E2'
        },
        h4: {
          color: '#E2E2E2'
        },
        body1: {
          color: '#919191'
        },
        body2: {
          color: '#919191'
        }
      })
    },
    palette: {
      mode,
      ...(mode === 'light' ?
        {
          primary: {
            main: '#FFFFFF',
          },
          secondary: {
            main: '#F1B80C',
          }
        } :
        {
          background: {
            default: '#000000'
          },
          primary: {
            main: '#FFFFFF'
          },
          secondary: {
            main: '#F1B80C',
          }
        }
      )
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Routings />
      </div>
    </ThemeProvider>
  );
}

export default App;
