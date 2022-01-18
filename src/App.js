import React from "react";
import LoginPage from './pages/auth/LoginPage';
import ForgotPage from './pages/auth/ForgotPage';
import ResetPage from './pages/auth/ResetPage';
import DashBoard from './pages/dashboard/DashBoard';
import StudentPage from './pages/dashboard/StudentPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/404/NotFoundPage';
import './App.css';
export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: localStorage.getItem("token") && localStorage.getItem("username") ? true : false,
  username: localStorage.getItem("username") ? localStorage.getItem("username").replace(/['"]+/g, '') : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token").replace(/['"]+/g, '') : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("username", JSON.stringify(action.payload.data.username));
      localStorage.setItem("token", JSON.stringify(action.payload.data.token));
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.data.username,
        token: action.payload.data.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        token: null
      };
    default:
      return state;
  }
};

function App() {

  const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
      <AuthContext.Provider
      value={{
        state,
        dispatch
      }}>
        <Router>
          <Routes>
            <Route path='' element={<Navigate replace to='/login'/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/forgot' element={<ForgotPage/>}/>
            <Route path='/recover/:id' element={<ResetPage/>}/>
            <Route path='/dashboard' element={<DashBoard/>}/>
            <Route path='/student' element={<StudentPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    );

}

export default App;