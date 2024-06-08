import React, { useState, useEffect } from 'react';
import { getCharacters } from '../services/characterService';

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCharacters();
            setCharacters(result);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Character List</h1>
            <ul>
                {characters.map((char) => (
                    <li key={char.id}>{char.name} (Quality: {char.quality}) (Metatype: {metatype.quality})</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterList;
