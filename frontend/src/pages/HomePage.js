// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import CharacterList from '../components/CharacterList';

const HomePage = () => {
    return (
        <div>
            <h1>Character Sheets</h1>
            <CharacterList />
            <Link to="/create">Create new character sheet</Link>
        </div>
    );
};

export default HomePage;
