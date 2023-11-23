import './App.css';
import { BrowserRouter as Router, Routes, Route }from 'react-router-dom';
import Home from './assets/HomeComponents/Home.tsx';
import { useState } from 'react';
import LoginPage from './assets/LoginComponents/LoginPage.tsx';
import RegisterPage from './assets/RegisterComponent/RegisterPage.tsx';
import Words from './assets/WordComponents/WordsPage.tsx';
import UserDetail from './assets/UserUpdate/UserDetails.tsx';
import { ACCESS_TOKEN } from './Data.tsx';
import Tags from './assets/TagComponents/Tags.tsx';
import AddTag from './assets/TagComponents/AddTag.tsx';
import DeleteWord from './assets/TagComponents/DeleteWord.tsx';


export default function App(){
  const [token, setToken] = useState({
    'accessT' : null
  });
  
  function handleToken(newToken){
    ACCESS_TOKEN.token = newToken;
    localStorage.setItem("accesT", newToken);
    setToken(() =>{
      return {
        'accessT': newToken
      }
    });
  }
  
  return(
    <Router>
      <Routes>
        <Route path ='/home' element={<Home />}/>
        <Route path ='/reg' element={<RegisterPage />}/>
        <Route path ='/' element={<LoginPage updateToken={handleToken}/>}/>
        <Route path ='/Words/:id' element={<Words/>}/>
        <Route path ='/user' element={<UserDetail/>}/>
        <Route path ='/tags' element={<Tags/>}/>
        <Route path ='/tags/creating' element={<AddTag/>}/>
        <Route path ='/tags/deleting/:id' element={<DeleteWord />}/>
      </Routes>
    </Router>
  );
}

