import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Passwords from './Passwords';
import {Button, Container, Paper, Stack, Typography } from '@mui/material';

function App() {

  return (
    <Router>
      <Container maxWidth="xl">
        <Stack spacing={2}>
          <Paper variant='outlined' elevation={2} sx={{ marginTop: "10px !important", flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                marginLeft:"20px",
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
              <Button sx={{ my: 2, color: 'white', display: 'block', fontSize: '1.1rem', fontWeight: 600 }}>
                Пароли
              </Button>
            </Link>
            <Link to='/devices'>
              <Button sx={{ my: 2, color: 'white', display: 'block', fontSize: '1.1rem', fontWeight: 600 }}>
                Устройства
              </Button>
            </Link>
            <Link to='/about'>
              <Button sx={{ my: 2, color: 'white', display: 'block', fontSize: '1.1rem', fontWeight: 600 }}>
                О программе
              </Button>
            </Link>
          </Paper>
          <Paper elevation={2} sx={{borderRadius:"10px", padding: "10px", minHeight: "85vh"}} >
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
  );
}

export default App;
