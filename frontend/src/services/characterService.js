/*
Service to interact with backend API
*/

import axios from 'axios';

// Base url for local backend server
const API_URL = 'http://127.0.0.1:5000';

export const getCharacters = async () => {
    const response = await axios.get(`${API_URL}/characters`);
    return response.data;
};

export const addCharacter = async (character) => {
    const response = await axios.post(`${API_URL}/character`, character);
    return response.data;
};
