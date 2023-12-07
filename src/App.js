import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Passwords from './Passwords';
import { Button, Container, Paper, Stack, Typography, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#160D1B",
      paper: "#251b25"
    }
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light"
  }
})

function App() {
  const [theme, setTheme] = useState(darkTheme)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="xl">
          <Stack spacing={2}>
            <Paper variant='outlined' elevation={2} sx={{ marginTop: "10px !important", flexGrow: 1, display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  marginLeft: "20px",
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  fontSize: '2rem',
                  color: '#ffbe5c',
                  textDecoration: 'none',
                }}
              >
                SMP
              </Typography>
              <Link to='/passwords'>
                <Button sx={{ my: 2, display: 'block', fontSize: '1.1rem', fontWeight: 600 }}>
                  Пароли
                </Button>
              </Link>
              <Link to='/devices'>
                <Button sx={{ my: 2, display: 'block', fontSize: '1.1rem', fontWeight: 600 }}>
                  Устройства
                </Button>
              </Link>
              <Link to='/about'>
                <Button sx={{ my: 2, display: 'block', fontSize: '1.1rem', fontWeight: 600 }}>
                  О программе
                </Button>
              </Link>
              <IconButton sx={{ ml: 1, marginLeft:"auto !important", marginRight:"10px" }} onClick={() => {theme.palette.mode === 'dark' ? setTheme(lightTheme) : setTheme(darkTheme)}} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Paper>
            <Paper elevation={2} sx={{ borderRadius: "10px", padding: "10px", minHeight: "85vh" }} >
              <Routes>
                <Route path='/' element={<Passwords />} />
                <Route path='/passwords' element={<Passwords />} />
                <Route path='/devices' />
                <Route path='/about' />
              </Routes>
            </Paper>
          </Stack>
        </Container>


      </Router>
    </ThemeProvider>

  );
}

export default App;
