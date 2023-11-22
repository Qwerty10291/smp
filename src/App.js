import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Passwords from './Passwords';

function App() {
  
  return (
    <Router>
      <div className='app'>
        <div className='header'>
          <span className='header__logo'>SMP</span>        
          <Link to='/passwords' className='header__item'>Пароли</Link>
          <Link to='/devices' className='header__item'>Устройства</Link>
          <Link to='/about' className='header__item'>О нас</Link>
        </div>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Passwords/>} />
            <Route path='/passwords' element={<Passwords/>} />
            <Route path='/devices' />
            <Route path='/about' />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
