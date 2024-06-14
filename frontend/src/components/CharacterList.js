import React, { useState, useEffect } from 'react';
import { getCharacters, removeCharacter } from '../services/characterService';
import './CharacterList.css';  // Adjust the import path if necessary

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getCharacters();
            setCharacters(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteCharacter = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await removeCharacter(id);
            setCharacters(characters.filter(characters => characters.id !== id));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Character List</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul className="no-bullets">
                {characters.map((char) => (
                    <li key={char.id}>
                        (Name: {char.name})
                        {char.quality && `(Quality: ${char.quality})`}
                        (Metatype: {char.metatype})
                        <button onClick={() => deleteCharacter(char.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterList;
