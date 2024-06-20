import React, { useState, useEffect } from 'react';
import { getCharacters, removeCharacter, editCharacter } from '../services/characterService';
import './CharacterList.css';  // Adjust the import path if necessary

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [editingCharacter, setEditingCharacter] = useState(null);
    const [newName, setNewName] = useState('');
    const [newQuality, setNewQuality] = useState('');
    const [newMetatype, setNewMetatype] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        handleFetchCharacters();
    }, []);

    const handleFetchCharacters = async () => {
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

    const handleDeleteCharacter = async (id) => {
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

    const handleEditSwitch = async (char) => {
        setEditingCharacter(char);
        setNewName(char.name);
        setNewQuality(char.quality);
        setNewMetatype(char.metatype);
    }

    const handleEditCharacter = async (id) => {
        setLoading(true);
        setError(false);
        try {
            await editCharacter(id, { name: newName, quality: newQuality, metatype: newMetatype });
            setCharacters(characters.map((char) => (
                char.id === id ? {
                    ...char,
                    name: newName,
                    quality: newQuality,
                    metatype: newMetatype
                } : char
            )));
            setEditingCharacter(null); // Exit edit mode after saving
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Character List</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul className="no-bullets">
                {characters.map((char) => (
                    <li key={char.id}>
                        {editingCharacter && editingCharacter.id === char.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={newQuality}
                                    onChange={(e) => setNewQuality(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={newMetatype}
                                    onChange={(e) => setNewMetatype(e.target.value)}
                                />
                                <button onClick={() => handleEditCharacter(char.id)}>Save</button>
                                <button onClick={() => setEditingCharacter(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                (Name: {char.name})
                                {char.quality && `(Quality: ${char.quality})`}
                                (Metatype: {char.metatype})
                                <button onClick={() => handleEditSwitch(char)}>Edit</button>
                                <button onClick={() => handleDeleteCharacter(char.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterList;
