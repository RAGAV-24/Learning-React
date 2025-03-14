import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Signup from './Component/Signup'
import DashBoard from './Component/DashBoard'
import Upload from './Component/Upload';
import ProfileMaintenance from './Component/ProfileMaintenance';
const App = () => {
  return (
    <Router >
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/signup" element={<Signup/>}/>
        <Route path="/upload" element={<Upload/>} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/profile" element={<ProfileMaintenance/>} />
      </Routes>
    </Router>
  );
};

export default App;
