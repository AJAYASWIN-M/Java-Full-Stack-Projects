import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import BlogPlatform from './pages/BlogPlatform';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element= {<LandingPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/blogplatform" element={<BlogPlatform/>} />

      </Routes>
    </Router>
  );
};

export default App;