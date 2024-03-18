import './ChatPage.css';
import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import MessageContainer from './MessageContainer';
import { API } from 'aws-amplify';
import { listChatGroups } from './../graphql/queries';
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ThankYouPage from './ThankYouPage';
 

// Importing authenticator
import { withAuthenticator } from "@aws-amplify/ui-react";

function ChatPage({ user, signOut }) {
  const [sender, setSenderID] = useState("");
  const [chatGroup, setChatGroup] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setSenderID("3451f67c-c692-4a06-aff3-140c79434145"); // hardcoded for now
  }, []);

  useEffect(() => {
    // Fetching ChatGroups
    async function fetchChatGroups() {
      try {
        const result = await API.graphql({
          query: listChatGroups,
          variables: {
            filter: {
              userID: {
                eq: "3451f67c-c692-4a06-aff3-140c79434145" // the current cognito user id
              }
            }
          }
        });
        setChatGroup(result.data.listChatGroups.items);
      } catch (error) {
        console.error("Error fetching chat groups:", error);
      }
    }

    fetchChatGroups();
  }, [sender]);

  const handleEndChat = () => {
    setShowConfirmation(true);
    setIsConfirmationOpen(true); // Open confirmation modal
  };

  const handleConfirmEndChat = () => {
    setShowConfirmation(false);
    navigate('/ThankYouPage');
  };

  const handleCancelEndChat = () => {
    setShowConfirmation(false);
    setIsConfirmationOpen(false); // Close confirmation modal
  };

  const ChatChosen = (clickedChatGroup) => {
    setActiveChat(clickedChatGroup);
  };

  
  return (
    
      <div className="chat-container">
        <div className="leftSide">
          <div className="header">
            <div className="userimg">
              <img src="restaurant1.jpeg" className="cover" alt={sender} />
            </div>
            <FaSignOutAlt className="end-chat" name="end-chat" onClick={handleEndChat} />
          </div>
          <ChatList
            chatGroups={chatGroup}
            onChatGroupClick={ChatChosen}
          />
        </div>
    
        <div className="rightSide">
          <div className="header">
            <div className="imgText">
              <div className="userimg">
                <img src="Avatar.png" className="cover" alt="User" />
              </div>
              <h4>
                {activeChat && (activeChat.locationID)}
                <br />
                <span>Online</span>
              </h4>
            </div>
          </div>
    
          {activeChat && (
            <MessageContainer
              chatGroup={activeChat}
              sender={sender}
              receiver={activeChat.locationID}
              isBlurActive={isConfirmationOpen} // Pass isConfirmationOpen as isBlurActive prop
            />
          )}
        </div>
    
        {showConfirmation && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <p>Are you sure you want to end the chat?</p>
              <div className="confirmation-buttons">
                <button className="confirm-button" onClick={handleConfirmEndChat}>Confirm</button>
                <button className="cancel-button" onClick={handleCancelEndChat}>Cancel</button>
              </div>
            </div>
          </div>
        )}
    
        {/* Overlay for backdrop blur */}
        <div className={`overlay ${showConfirmation ? 'active' : ''}`}></div>
    
        {/* Transparent div to capture clicks */}
        {showConfirmation && (
          <div className="click-blocker"></div>
        )}
      </div>
    
  );
}

export default withAuthenticator(ChatPage);
