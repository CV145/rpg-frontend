// GameContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const GameContext = createContext();


export const GameProvider = ({ children }) => {
    const [playerData, setPlayerData] = useState({ stats: {}, items: [] });

    // Fetch player data from the backend
    useEffect(() => {
        axios.get('/api/player/data')
             .then(response => setPlayerData(response.data))
             .catch(error => console.error('Error fetching player data', error));
    }, []);

    // Function to update player data
    const updatePlayerData = (newData) => {
        setPlayerData(newData);
        axios.post('/api/player/update', newData)
             .catch(error => console.error('Error updating player data', error));
    };

    return (
        <GameContext.Provider value={{ playerData, updatePlayerData }}>
            {children}
        </GameContext.Provider>
    );
};
