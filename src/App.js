import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNaviBar from './components/layout/TopNaviBar';
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <TopNaviBar/>
        <Routes>
          <Route path='/'></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
