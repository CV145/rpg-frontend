// GamePage.js
import React, {useState} from 'react';
import Modal from 'react-modal';
import { SpellsModal, ItemsModal, StatsModal } from './Modals';
import '../styles/GamePage.css'; 
import axios from 'axios';

const BASE_URL = 'https://localhost:7098';


const GamePage = () => {
    const [messages, setMessages] = useState([
        { text: "Welcome to the game!", isUserMessage: false },
        { text: "You are fighting a security robot", isUserMessage: false },
        { text: "You can type commands in the input box below.", isUserMessage: false },
    ]);
    const [isProcessing, setIsProcessing] = useState(false);

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
            if (isProcessing)
            {
                return;
            }


            // Create a new message object for the user's input
            const userMessageObject = { text: userMessage, isUserMessage: true };

            // Add the user message to the messages array
            setMessages(prevMessages => [...prevMessages, userMessageObject]);

            // Clear the input field
            setUserMessage("");
            setIsProcessing(true);

            // Send the action to the API and update the response in messages
            sendActionToApi(userMessageObject);
        }
    };

    const sendActionToApi = (userMessageObject) => {
        if (userMessage.trim() === "") {
            return;
        }

        const requestBody = {
            enemyID: "SecurityBot", // Replace with actual enemyID
            playerID: "1", // Replace with actual playerID
            action: userMessageObject.text
        };
    
        axios.post(`${BASE_URL}/Game/sendactionprompt`, requestBody)
            .then(response => {

                //Extract the "content"
                const content = response.data.choices[0].message.content;

                // Create a new message object with the extracted content
                const responseMessageObject = { text: content, isUserMessage: false };

                //Do another API call (in a separate method) that does the prompt filtering, then parse it, then uses the updated data to update the database


                // Update the messages state with the response message
                setMessages(prevMessages => [...prevMessages, responseMessageObject]);
                setIsProcessing(false);
            })
            .catch(error => {
                console.error('Error sending action:', error)
                setIsProcessing(false);
            });
    
        // Clear the input field
        setUserMessage("");
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
                    {isProcessing && <div className="typing-indicator">Typing...</div>}
                </div>
                <div className="input-group">
                    <input type="text" className="form-control" 
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isProcessing}
                    />
                    <button className="btn btn-primary" onClick={handleUserInput}>Enter</button>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
