import LoginPage from './pages/auth/LoginPage';
import DashBoard from './pages/dashboard/DashBoard';
import StudentPage from './pages/StudentPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/404/NotFoundPage';
import './App.css';

function App() {

    let loggedIn = false;

    return (
      <Router>
        <Routes>
          <Route path='' element={ loggedIn ? <Navigate replace to='/dashboard'/> : <Navigate replace to='/login'/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          {/*<Route path='/dashboard' element={ loggedIn ? <TablePage/> : <Navigate replace to='/login'/>}/>*/}
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/student' element={<StudentPage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </Router>
    );

}

export default App;
