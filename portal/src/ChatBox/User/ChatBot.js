import React, { useEffect, useState } from 'react';
import intlFormatDistance from "date-fns/intlFormatDistance";

import MessageComponent from '../MessageComponent';
import TextInputComponent from '../TextInputComponent';
import { FaPaperPlane } from 'react-icons/fa';

function ChatBot({ toggleUsebot, sender, receiver, isBlurActive }) {
    const [chatMessages, setChatMessages] = useState([]);
    const [progMessage, setProgMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [botMessage, setBotMessage] = useState('');

    const buttonQuestions = [
        "Hello!",
        "How are you?",
        "When do you open?",
        "When do you close?",
        "Can I talk to a representative?"
    ];
    
    const utterances = [
        ["how are you", "how is life", "how are things"],
        ["hello", "hi", "hey", "good morning", "good evening", "good day"],
        ["are you open", "when do you open", "when is opening time"],
        ["are you closed", "when do you close", "when is closing time"],
        ["can i talk to representative"]
    ];
    
    const answers = [
        ["I'm fine, how are you?", "Pretty well, how about you?", "Fantastic, how are you?"],
        ["Hello!", "Hi!", "Hey!", "Howdy!"],
        ["We open at "],
        ["We close at "],
        ["Connecting to business..."]
    ];
    
    const alternatives = [
        "Sorry, I don't understand.",
        "Try again",
        ""
    ];

    // If the user just clicked into a new group, delete the messages
    useEffect(() => {
        setChatMessages([]);
    }, [receiver])

    // Create a new user message and get bot response
    useEffect(() => {
        function ChatbotOutput(input) {
        
            const text = input.toLowerCase().replace(/[^\w\s\d]/gi, "").replace(/ a /g, " ")
            .replace(/whats/g, "what is")
            .replace(/please /g, "")
            .replace(/ please/g, "");
            
            const baseResponse = (compare(text) ? 
                compare(text) : 
                alternatives[Math.floor(Math.random() * alternatives.length)]);
            
            //console.log(receiver.hours[0]);
            
            switch(baseResponse)
            {
                case "Connecting to business...":
                    setBotMessage(baseResponse);
                    toggleUsebot(false);
                    break;
                case "We open at ":
                    setBotMessage(baseResponse + receiver.hours[0].startTime);
                    break;
                case "We close at ":
                    setBotMessage(baseResponse + receiver.hours[0].endTime);
                    break;
                default:
                    setBotMessage(baseResponse);
                    break;
            }
        }
        
        function compare(string) {
            for (let i = 0; i < utterances.length; i++) {
                for (let j = 0; j < utterances[j].length; j++) {
                    if (utterances[i][j] === string) {
                        return answers[i][Math.floor(Math.random() * answers[i].length)];
                    }
                }
            }
            
            return "";
        }

        if (newMessage !== "")
        {
            const newMessageData = {
                createdAt: new Date(),
                senderID: sender,
                data: newMessage,
            };

            setChatMessages([...chatMessages, newMessageData]);
            ChatbotOutput(newMessage);
            setNewMessage("");
            setProgMessage("");
        }
    }, [newMessage]);

    // Create a new bot message
    useEffect(() => {
        if (botMessage !== "")
        {
            const newMessageData = {
                createdAt: new Date(),
                senderID: "Bot",
                data: botMessage,
            };

            setChatMessages([...chatMessages, newMessageData]);
            setBotMessage("");
        }
    }, [botMessage]);

    function handleSendMessage(){
        setNewMessage(progMessage);
    };

    function handleBotClick(message) {
        setNewMessage(message);
    }
    
    const sortedChatMessages = chatMessages.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return (
        <div>
            <div className={`chatbox ${isBlurActive ? 'blur-effect' : ''}`}>
                {chatMessages.map((message) => (
                <MessageComponent
                    key={message.id}
                    message={message}
                    sender={sender}
                />
                ))}

                <div className={'chat-messages frnd_message'}>
                    <p>
                        How may I help?
                        <br/>
                        {buttonQuestions.map((question) => (
                            <button name="sendBot" onClick={() => handleBotClick(question)}> {question} </button>
                        ))}
                    </p>
                </div>
            </div>

            <div className="chatbox_input">
                <TextInputComponent
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e && e.key === 'Enter') handleSendMessage(e);
                    }}
                />

                <FaPaperPlane className="icon" name="send" id="send-button"
                    onClick={handleSendMessage} style={{ fontSize: '40px', color: '#aaa' }} />
            </div>
        </div>
    );
}

export default ChatBot;