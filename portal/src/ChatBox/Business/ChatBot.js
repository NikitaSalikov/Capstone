import React, { useEffect, useState } from 'react';
import intlFormatDistance from "date-fns/intlFormatDistance";

function ChatBot({ setUseBot, sender, receiver }) {
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        setChatMessages([]);
    }, [])

    const buttonQuestions = [
        "Hello!",
        "How are you?",
        "Are you open?",
        "Are you closed?",
        "Can I talk to a real person?"
    ];
    
    const utterances = [
        ["how are you", "how is life", "how are things"],
        ["hello", "hi", "hey", "good morning", "good evening", "good day"],
        ["are you open", "when do you open", "when is opening time"],
        ["are you closed", "when do you close", "when is closing time"],
        ["can i talk to real person"]
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

    function ChatbotOutput(input) {
        const text = input.toLowerCase().replace(/[^\w\s\d]/gi, "").replace(/ a /g, " ")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "");

        const product = compare(text) ? 
            compare(text) : 
            alternatives[Math.floor(Math.random() * alternatives.length)];

        if (product === "Connecting to business...") setUseBot(false);
        
        const newMessageData = {
            createdAt: new Date(),
            senderID: 'Bot',
            data: product,
        };

        return newMessageData;
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
    
    //createButtons(buttons);
    function handleSendMessage() {
        try {
            const newMessageData = {
                senderID: sender,
                data: newMessage,
            };

            // update
            setChatMessages([...chatMessages, newMessageData]);
            setChatMessages([...chatMessages, ChatbotOutput(newMessageData.data)]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    function handleBotClick(message) {
        setChatMessages([...chatMessages, ChatbotOutput(message)]);
        setNewMessage('');

    }
    
    const sortedChatMessages = chatMessages.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return (
        <div>
            <div className="chatbox">
                {sortedChatMessages.map((message) => (
                    <div
                    className={`chat-messages ${message.senderID === sender ? 'my_message' : 'frnd_message'}`}
                    key={message.id}>
                    <p>
                        {message.data}
                        <br />
                        <span>
                            <time
                            dateTime={message.createdAt}
                            className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                            >
                                {isValidDate(message.createdAt)
                                ? intlFormatDistance(new Date(message.createdAt), new Date())
                                : 'Invalid Date'}
                            </time>
                        </span>
                    </p>
                </div>
                ))}

                <div className={'chat-messages frnd_message'}>
                    <p>
                        {buttonQuestions.map((question) => (
                            <button name="sendBot" onClick={() => handleBotClick(question)}> {question} </button>
                        ))}
                    </p>
                </div>
            </div>

            <div className="chatbox_input">
                {/* This is a bad example */}
                <button name="happy-outline">emoji</button>
                <button name="attach-outline">file</button>
                <input
                    type="text"
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button name="send" id="send-button" onClick={handleSendMessage}>Send</button>

                <form onSubmit={handleSendMessage}>
                
                </form>
            </div>
        </div>
    );
}

//something off with time, so added a checker
function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

export default ChatBot;



/* create new div for each input
function displayMessage(message, sender = "Me") {
    const newMessage = document.createElement("div");
    newMessage.className = "message";
    newMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(newMessage);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function messageHandler() {
    const userMessage = userInput.value;
    displayMessage(userMessage, "User");
    userInput.value = "";
    destroyButtons();

    setTimeout(() => {
        botMessage = ChatbotOutput(userMessage);
        if (botMessage)
        {
            displayMessage(botMessage, "Chatbot");
            if (useChatbot) recreateButtons();
        }
    }, 200);
}

// add event listener for key input
userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && userInput.value.trim() !== "") {
        messageHandler();
    }
    else if(e.key === "Enter"){
        alert("Nothing to submit");
    }
});

// same for click
sendButton.addEventListener("click", function (e) {
    if (userInput.value.trim() !== "") {
        messageHandler();
    }
    else{
        alert("Nothing to submit");
    }
});
*/

