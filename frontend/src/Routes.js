import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharacterForm from './pages/CharacterForm';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CharacterForm />} />
    </Routes>
);

export default AppRoutes;
