import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Signup from './Component/Signup'
import DashBoard from './Component/DashBoard'
import Upload from './Component/Upload';
const App = () => {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Login />} /> 
         <Route path="/signup" element={<Signup/>}/>
        <Route path="/upload" element={<Upload/>} />
      </Routes>
    </Router>
  );
};

export default App;
