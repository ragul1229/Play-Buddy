// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NearbyTeams from './pages/NearbyTeams';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/nearby-teams" element={<NearbyTeams />} />
      </Routes>
    </Router>
  );
}

export default App;
