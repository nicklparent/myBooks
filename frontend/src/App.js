import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import Header from './assets/sections/Header';


export function App(){
  return(
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;