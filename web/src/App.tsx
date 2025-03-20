import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { CreateAccount } from './pages/CreateAccountPage';

export default function App(){
  return(
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create-account' element={<CreateAccount />} />
      </Routes>
    </Router>    
  );
}