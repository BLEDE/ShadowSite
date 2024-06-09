import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCharacter } from '../services/characterService';

const CharacterForm = () => {
    const [name, setName] = useState('');
    const [quality, setQuality] = useState('');
    const [metatype, setMetatype] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newCharacter = { name, quality, metatype };
        try {
            await addCharacter(newCharacter);
            navigate('/');
        } catch (error) {
            console.error('Error creating character', error)
        }
    };

    return (
        <div>
            <h1>Create Your Character</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Required"
                        required
                    />
                </div>
                <div>
                    <label>Quality</label>
                    <input type="text"
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                    />
                </div>
                <div>
                    <label>Metatype</label>
                    <input
                        type="text"
                        value={metatype}
                        onChange={(e) => setMetatype(e.target.value)}
                        placeholder="Required"
                        required
                    />
                </div>
                <button type="submit">Create Character</button>
            </form>
        </div>
    );
};

export default CharacterForm;
