import '../ChatPage.css';
import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import MessageContainer from './MessageContainer';
import ChatBot from './ChatBot';
import { API } from 'aws-amplify';
import { listChatGroups, listUsers } from '../../graphql/queries';

import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 

//importing authenticator
import { withAuthenticator } from "@aws-amplify/ui-react";

const getLocation = `
query GetLocation($id: ID!) {
  getLocation(id: $id) {
    id
    amenities {
      value
      label
      icon
      __typename
    }
    address {
      address
      unit
      city
      country
      state
      postalcode
      __typename
    }
    name
    category
    businessID
    description
    email
    hours {
      open
      startTime
      endTime
      name
      __typename
    }
    images {
      type
      key
      __typename
    }
    phoneNumber
    liveView
    status
    Reviews {
      nextToken
      __typename
    }
    LiveSnap {
      id
      video
      expirationUnixTime
      createdAt
      updatedAt
      owner
      __typename
    }
    latitude
    longitude
    keywords
    locationImage
    isPublished
    social {
      type
      address
      __typename
    }
    searchField
    avgRating
    websiteURL
    createdAt
    updatedAt
    locationLiveSnapId
    owner
    __typename
  }
}
`;

function ChatPage({ user, signOut }) {
  const [sender, setSenderID] = useState("");
  const [senderName, setSenderName] = useState("");
  const [receiver, setReceiverID] = useState("");
  const [receivers, setReceivers] = useState([]);

  const [chatGroups, setChatGroups] = useState([]);

  const [activeChat, setActiveChat] = useState(null);
  const [useBotList, setUseBotList] = useState([]);
  const [currUseBot, setCurrUseBot] = useState([true]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch User from DB
  useEffect(() => {
    async function fetchUser() {
      try {
        const result = await API.graphql({
          query: listUsers,
          variables: {
            filter: {
              cognitoUser: {eq: user.username}
            }
          }
        })
        const name = result.data.listUsers.items[0].givenName + " " + result.data.listUsers.items[0].familyName;
        setSenderName(name);
        setSenderID(result.data.listUsers.items[0].id);
      }
      catch(error) {
        console.error("Error fetching user name", error);
      }
    }
    fetchUser();
  }, [user]);

  // Fetch Chat Groups from DB
  useEffect(() => {    
    async function fetchChatGroups() {
      try {
        const result = await API.graphql({
          query: listChatGroups,
          variables: {
            filter: {
              userID: {eq: sender}
            }
          }
        });
        //console.log("Chat Groups:", result.data.listChatGroups.items);
        setChatGroups(result.data.listChatGroups.items);
      } catch (error) {
        console.error("Error fetching chat groups:", error);
      }
    }
    fetchChatGroups();
  }, [sender]);

  // Fetch Location from DB
  useEffect(() => {
    async function fetchLocation(locationID) {
      try {
        const result = await API.graphql({
          query: getLocation,
          variables: {id: locationID},
          authMode: "API_KEY"
        });
        //console.log("Get location:", result.data.getLocation);
        setReceivers(oldreceivers => [...oldreceivers, result.data.getLocation]);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }
    chatGroups.map((chatGroup) => (fetchLocation(chatGroup.locationID)));
    setUseBotList(chatGroups.map(() => (true)));
    
  }, [chatGroups]);

  // Set if chatbot should be used for current chat
  useEffect(() => {
    if (activeChat)
    {
      setCurrUseBot(useBotList[chatGroups.findIndex( i => i.id === activeChat.id)]);
    }
  }, [activeChat, chatGroups, useBotList]);

  const handleEndChat = () => {
    setShowConfirmation(true);
    setIsConfirmationOpen(true); // Open confirmation modal
  };

  const handleConfirmEndChat = () => {
    setShowConfirmation(false);
    navigate('../ThankYouPage');
  };

  const handleCancelEndChat = () => {
    setShowConfirmation(false);
    setIsConfirmationOpen(false); // Close confirmation modal
  };

  const ChatChosen = (clickedChatGroup) => {
    setActiveChat(clickedChatGroup);
  };

  const toggleUsebot = (condition) => {
    const index = chatGroups.findIndex( i => i.id === activeChat.id);
    setUseBotList(useBotList.toSpliced(index, 1, condition));
  };

  return (
    <div className="chat-container">
      <div className="leftSide">
        <div className="header">
          <div className="userimg">
            <img src="restaurant1.jpeg" className="cover" alt="" />
          </div>
          {senderName}
          <FaSignOutAlt className="end-chat" name="end-chat" onClick={handleEndChat} />
        </div>

        <div className="search_chat">
          <div>
            <input type="text" placeholder="Search chat" />
            <button name="SearchOutline">?</button>
          </div>
        </div>
        
        <ChatList
          chatGroups={chatGroups}
          receivers={receivers}
          onChatGroupClick={ChatChosen}
        />
      </div>

      <div className="rightSide">
        <div className="header">
        {activeChat && (activeChat.locationID) && (
          <div className="imgText">
            <div className="userimg">
              <img src="profile1.jpeg" className="cover" alt="User" />
            </div>
              
            <h4>
              {(chatGroups.length === receivers.length) && (receivers.filter((element) => element.id === activeChat.locationID)[0].name)}
              <br />
              <span>Online</span>
            </h4>

          </div>
        )}

          <ul className="nav_icons">
            <li>
              <ion-icon name="ellipsis-horizontal"></ion-icon>
            </li>
          </ul>
        </div>

        {activeChat && currUseBot && (
          <ChatBot
            toggleUsebot={toggleUsebot}
            sender={sender}
            receiver={receivers.filter((element) => element.id === activeChat.locationID)[0]}
          />
        )}

        {activeChat && !currUseBot && (
        <MessageContainer
          chatGroup={activeChat}
          sender={sender}
          receiver={activeChat.locationID}
          isBlurActive={isConfirmationOpen} // Pass isConfirmationOpen as isBlurActive prop
        />
        )}

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
    </div>
  );
}

export default withAuthenticator(ChatPage);