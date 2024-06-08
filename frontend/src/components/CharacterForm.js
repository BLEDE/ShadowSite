import React, { useState } from 'react';
import { addCharacter } from '../services/characterService';

const CharacterForm = () => {
    const [name, setName] = useState('');
    const [quality, setQuality] = useState('');
    const [metatype, setMetatype] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newCharacter = { name, quality, metatype };
        await addCharacter(newCharacter);
        setName('');
        setQuality('');
        setMetatype('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Quality</label>
                <input type="text" value={quality} onChange={(e) => setQuality(e.target.value)} />
            </div>
            <div>
                <label>Metatype</label>
                <input type="text" value={metatype} onChange={(e) => setMetatype(e.target.value)} />
            </div>
            <button type="submit">Add Character</button>
        </form>
    );
};

export default CharacterForm;
