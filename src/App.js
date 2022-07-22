
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import Restoran from './components/Restaurant/Restaurant';
import Dishes from './components/Dishes/Dishes';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/restorans' element={<Restoran/>} />
      <Route path='/dishes' element={<Dishes/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
