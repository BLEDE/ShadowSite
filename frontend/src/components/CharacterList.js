import React, { useState, useEffect } from 'react';
import { getCharacters } from '../services/characterService';
import './CharacterList.css';  // Adjust the import path if necessary

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
            <ul className="no-bullets">
                {characters.map((char) => (
                    <li key={char.id}>
                        ({char.name})  
                        (Quality: {char.quality}) 
                        (Metatype: {char.metatype})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterList;
