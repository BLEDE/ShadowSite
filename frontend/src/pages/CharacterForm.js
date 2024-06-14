import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCharacter } from '../services/characterService';


// TODO: keep this as a component, and make a page to add it to
const CharacterForm = () => {
    const [name, setName] = useState('');
    const [quality, setQuality] = useState('');
    const [metatype, setMetatype] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        const newCharacter = { name, quality, metatype };
        try {
            await addCharacter(newCharacter);
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create Your Character</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
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
