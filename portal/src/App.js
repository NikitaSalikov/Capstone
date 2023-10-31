
import './App.css';
import ChatList from './ChatList';
import MessageContainer from './MessageContainer';
import React, { useState } from 'react';

//need to use react icon lib to replace those ugly buttons

function App() {

  const [message, setMessage] = useState(''); // State to store the message
  const [chatMessages, setChatMessages] = useState([]); // State to store chat messages

  // send click event function
  const handleSendClick = () => {
    const newMessage = { text: message, sender: 'my_message' };
    setChatMessages([...chatMessages, newMessage]); // Add the message to chatMessages
    setMessage(''); 
  };

  return (

    <div className="chat-container">
      <div className="leftSide">
        <div className="header">
          <div className="userimg">
            <img src="restaurant1.jpeg" className="cover" alt="User" />
          </div>
          <ul className="nav_icons">
            <li>
              <a href="settings.html">
                <button name="settings-outline">Setting</button>
              </a>
            </li>
            <li>
              <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
            </li>
            <li>
              <ion-icon name="ellipsis-vertical"></ion-icon>
            </li>
          </ul>
        </div>
        <div className="search_chat">
          <div>
            <input type="text" placeholder="Search or start new chat" />
            <button name="SearchOutline">?</button>
          </div>
        </div>

        <ChatList/>

      </div>
      <div className="rightSide">
        <div className="header">
          <div className="imgText">
            <div className="userimg">
              <img src="profile1.jpeg" className="cover" alt="User" />
            </div>
            <h4>
              Jennifer Yan<br />
              <span>Online</span>
            </h4>
          </div>
          <ul className="nav_icons">
            <li>
              <ion-icon name="ellipsis-horizontal"></ion-icon>
            </li>
          </ul>
        </div>
        <MessageContainer />
        <div className="chatbox_input">
          <button name="happy-outline">emoji</button>
          <button name="attach-outline">file</button>
          <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          />
          <button name="send" id="send-button" onClick={handleSendClick}>Send</button>
        </div>

        </div>
        </div>
  );
}

export default App;