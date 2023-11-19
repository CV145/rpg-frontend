// GamePage.js
import React, {useState} from 'react';
import Modal from 'react-modal';
import { SpellsModal, ItemsModal, StatsModal } from './Modals';
import '../styles/GamePage.css'; 

Modal.setAppElement('#root'); // Set the app root element for accessibility

const GamePage = () => {
    const [messages, setMessages] = useState([
        { text: "Welcome to the game!", isUserMessage: false },
        { text: "You find yourself in a mysterious forest.", isUserMessage: false },
        { text: "You can type commands in the input box below.", isUserMessage: false }
    ]);

    //State variables to manage modals
    const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
    const [isSpellsModalOpen, setIsSpellsModalOpen] = useState(false);

    //Functions to open/close modals
    const openItemsModal = () => {
        setIsItemsModalOpen(true);
    };

    const closeItemsModal = () => {
        setIsItemsModalOpen(false);
    };

    const openStatsModal = () => {
        setIsStatsModalOpen(true);
    };

    const closeStatsModal = () => {
        setIsStatsModalOpen(false);
    };

    const openSpellsModal = () => {
        setIsSpellsModalOpen(true);
    };

    const closeSpellsModal = () => {
        setIsSpellsModalOpen(false);
    };

    //State variable stores current user message
    const [userMessage, setUserMessage] = useState("");

    //Handle user input and add it to messages
    const handleUserInput = () => {
        if (userMessage.trim() !== "") {
            // Add the user message to the messages array
            setMessages([...messages, { text: userMessage, isUserMessage: true }]);
            
            // Clear the input field
            setUserMessage("");
        }
    };

    //Event handler for Enter key press
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); //Prevent line breaks
            handleUserInput();
        }
    };

    return (
        <div className="game-container d-flex">
            <div className="nav-bar">
                {/* Grouped navbar items */}
                <div className="nav-items">
                    <button className="menu-item" onClick={openItemsModal}>Items</button>
                    <button className="menu-item" onClick={openStatsModal}>Stats</button>
                    <button className="menu-item" onClick={openSpellsModal}>Spells</button>
                </div>
                <div className="currency-display">Currency: 100</div>
            </div>

            {/* Modals */ }
            <ItemsModal isOpen={isItemsModalOpen} onRequestClose={closeItemsModal} />
            <StatsModal isOpen={isStatsModalOpen} onRequestClose={closeStatsModal} />
            <SpellsModal isOpen={isSpellsModalOpen} onRequestClose={closeSpellsModal} />

            <div className="game-content">
                <div className="text-box">
                {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.isUserMessage ? "user-message" : "game-message"}`}
                        >
                            {message.text}
                        </div>
                    ))}
                </div>
                <div className="input-group">
                    <input type="text" className="form-control" 
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="btn btn-primary" onClick={handleUserInput}>Enter</button>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
