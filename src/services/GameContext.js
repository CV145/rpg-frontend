// GameContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const GameContext = createContext();
const BASE_URL = 'http://localhost:7098/Stats';

export const getPlayerStats = async (playerId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${playerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching player stats:', error);
        // Handle error appropriately
    }
};

export const postPlayerStats = async (playerStats) => {
    try {
        await axios.post(BASE_URL, playerStats);
        // Handle success (e.g., show a message or update state)
    } catch (error) {
        console.error('Error updating player stats:', error);
        // Handle error appropriately
    }
};


export const GameProvider = ({ children }) => {

    //Stats object and items array
    const [playerData, setPlayerData] = useState({ stats: {} });
    const [items, setItems] = useState([]);
    const [spells, setSpells] = useState([]);

    // Fetch data from the backend
    useEffect(() => {
        const fetchStats = async () => {
            const stats = await getPlayerStats(1);
            postPlayerStats(stats);
        };

        fetchStats();
    }, [1]);


    // Function to update player data
    const updateStats = async (updatedStats) => {
        await postPlayerStats(updatedStats);
    };

    return (
        <GameContext.Provider value={{ playerData, postPlayerStats }}>
            {children}
        </GameContext.Provider>
    );
};
