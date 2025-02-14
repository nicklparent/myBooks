import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import Header from './components/Header';


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