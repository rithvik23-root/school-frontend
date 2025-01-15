import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import './App.css';
import HomePage from './components/homePage';
import First from './components/first';


function App() {

  
  return(
    <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/first" element={<First/>}></Route>
  </Routes>
  )
     
  
      
    
}

export default App;
