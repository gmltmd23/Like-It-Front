import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import TopNaviBar from './components/layout/TopNaviBar';
import SignUp from './components/user/SignUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <TopNaviBar/>
        <Routes>
          <Route path='/'></Route>
          <Route path='/login'></Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
