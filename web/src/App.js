import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Login } from './pages/Login';
import Header from './components/Header';


export function App(){
  return(
    <>
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;