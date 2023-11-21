import './App.css';
import { BrowserRouter as Router, Routes, Route }from 'react-router-dom';

import Home from './assets/Home.tsx';
import { useState } from 'react';
import LoginPage from './assets/LoginPage.tsx';
import RegisterPage from './assets/RegisterPage.tsx';
import Words from './assets/WordComponents/WordsPage.tsx';
import UserDetail from './assets/UserUpdate/UserDetails.tsx';

export default function App(){
  const [token, setToken] = useState({
    'accessT' : null,
    'email': null,
    'password': null
  });

  function handleToken(newToken, newEmail, newPassword){
    setToken(() =>{
      return {
        'accessT': newToken,
        'email': newEmail,
        'password': newPassword
      }
    });
  }

  return(
    <Router>
      <Routes>
        <Route path ='/home' element={<Home token={token}/>}/>
        <Route path ='/reg' element={<RegisterPage token={token}/>}/>
        <Route path ='/' element={<LoginPage updateToken={handleToken}/>}/>
        <Route path ='/Words/:id' element={<Words token={token}/>}/>
        <Route path ='/user' element={<UserDetail token={token}/>}/>
      </Routes>
    </Router>
  );
}

