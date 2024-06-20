/*
Service to interact with backend API
*/

import axios from 'axios';

// Base url for local backend server
const API_URL = 'http://127.0.0.1:5000';

export const getCharacters = async () => {
    try {
        const response = await axios.get(`${API_URL}/characters`);
        return response.data;
    } catch (error) {
        throw new Error('Error getting all characters info');
    }
};

export const getCharacter = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/character/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error getting character info');
    }
};

export const addCharacter = async (character) => {
    try {
        const response = await axios.post(`${API_URL}/character`, character);
        return response.data;
    } catch (error) {
        throw new Error('Error adding character');
    }
};

export const removeCharacter = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/character/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error removing character');
    }
};

export const editCharacter = async (id, editData) => {
    try {
        const response = await axios.put(`${API_URL}/character/${id}`, editData);
        return response.data;
    } catch (error) {
        throw new Error('Error editing character');
    }
};

