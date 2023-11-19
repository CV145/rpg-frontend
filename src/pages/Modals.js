import Modal from 'react-modal';
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../styles/Modals.css'

Modal.setAppElement('#root'); // Set the app root element for accessibility

const BASE_URL = 'https://localhost:7098';

// Sample items 
const sampleItems = [
    { name: 'Health Potion', description: 'Restores HP' },
    { name: 'Mana Elixir', description: 'Restores MP' },
    { name: 'Sword of Strength', description: 'Increases attack damage' },
    { name: 'Armor of Protection', description: 'Reduces incoming damage' },
    { name: 'Armor of Protection', description: 'Reduces incoming damage' },
    { name: 'Health Potion', description: 'Restores HP' },
];

// Sample player data
const samplePlayerData = [
    { stat: 'Status', value: 'Fine, with a protective ward and HP at 29/42'},
    { stat: 'HP', value: 100 },
    { stat: 'MP', value: 50 },
    { stat: 'Attack', value: 7 },
    { stat: 'Defense', value: 5 },
    { stat: 'Evasion', value: 8 },
    { stat: 'Magic', value: 6 },
];

// Sample spells
const sampleSpells = [
    { name: 'Fireball', description: 'Throws a ball of fire', cost: 5 },
    { name: 'Ward', description: 'Casts a protective ward around the user', cost: 10 },
    { name: 'Thunder', description: 'Summons an electric bolt', cost: 5 }
];

export const ItemsModal = ({ isOpen, onRequestClose }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/Inventory/1`) 
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Items Modal"
            className="modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 1000
                },
                content: {
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    maxWidth: '80vw', // Max width of the modal
                    maxHeight: '80vh', // Max height of the modal
                    margin: 'auto', // Center the modal
                    border: '1px solid #ccc',
                    background: '#fff',
                    overflow: 'auto',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }
            }}
        >
            <h2>Items</h2>
            <div className="items-grid" style={{ width: '100%', overflow: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {items.map((item, index) => (
                    <div key={index} className="item-card" style={{ margin: '10px', width: 'calc(100% / 3 - 20px)' }}> {/* Adjust the width as per requirement */}
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};



export const StatsModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Stats Modal"
            className="modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 1000
                },
                content: {
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    maxWidth: '80vw', // Max width of the modal
                    maxHeight: '80vh', // Max height of the modal
                    margin: 'auto', // Center the modal
                    border: '1px solid #ccc',
                    background: '#fff',
                    overflow: 'auto',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }
            }}
        >
            <h2>Stats</h2>
            <div className="items-grid" style={{ /* Similar grid style as ItemsModal */ }}>
                {samplePlayerData.map((stat, index) => (
                    <div key={index} className="" style={{ /* Similar card style as ItemsModal */ }}>
                        <h3>{stat.stat}</h3>
                        <p>{stat.value}</p>
                    </div>
                ))}
            </div>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export const SpellsModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Spells Modal"
            className="modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 1000
                },
                content: {
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    maxWidth: '80vw', // Max width of the modal
                    maxHeight: '80vh', // Max height of the modal
                    margin: 'auto', // Center the modal
                    border: '1px solid #ccc',
                    background: '#fff',
                    overflow: 'auto',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }
            }}
        >
            <h2>Spells</h2>
            <div className="spells-grid" style={{ /* Similar grid style as ItemsModal */ }}>
                {sampleSpells.map((spell, index) => (
                    <div key={index} className="spell-card" style={{ /* Similar card style as ItemsModal */ }}>
                        <h3>{spell.name}</h3>
                        <p>{spell.description}</p>
                    </div>
                ))}
            </div>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};
