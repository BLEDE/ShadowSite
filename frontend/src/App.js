import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharacterForm from './pages/CharacterForm';

const App = () => {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CharacterForm />} />
      </Routes>
    </Router>
  );
};

export default App;
