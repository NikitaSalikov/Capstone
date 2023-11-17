import './ChatPage.css';
import React, { useState } from 'react';
import ChatList from './ChatList';
import MessageContainer from './MessageContainer';

//importing authenticator
import { withAuthenticator } from "@aws-amplify/ui-react";

function ChatPage({user, signOut})
{
    //console.log(user);

    const [message, setMessage] = useState(""); // State to store the message
    const [chatMessages, setChatMessages] = useState([]); // State to store chat messages
    
    const [sender, setSenderID] = useState("902ecd81-37c1-498d-ae23-e964d70d0f91");
    const [receiver, setReceiverID] = useState("902ecd81-37c1-498d-ae23-e964d70d0f91");
    
    // send click event function
    const handleSendClick = () => {
      const newMessage = { text: message, sender: 'my_message' };
      setChatMessages([...chatMessages, newMessage]); // Add the message to chatMessages
      setMessage(''); 
    };
    /*
    React.useEffect(() => {
        // Hard coded for now...
        setSenderID('902ecd81-37c1-498d-ae23-e964d70d0f91');
        setReceiverID('902ecd81-37c1-498d-ae23-e964d70d0f91');
    }, []);
    */
    return(
    <div className="chat-container">
        <div className="leftSide">
            <div className="header">
                <div className="userimg">
                    <img src="restaurant1.jpeg" className="cover" alt={sender} />
                </div>
                <ul className="nav_icons">
                    <li>
                        {/*<a href="settings.html">*/}
                            <button name="settings-outline" onClick={() => signOut()}>Setting</button>
                        {/*</a>*/}
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
                    <input type="text" placeholder="Search chat" />
                    <button name="SearchOutline">?</button>
                </div>
            </div>

            <ChatList
                userId={sender}
                setReceiverID={setReceiverID}
            />

        </div>
        
        <div className="rightSide">
            <div className="header">
                <div className="imgText">
                    <div className="userimg">
                        <img src="profile1.jpeg" className="cover" alt="User" />
                    </div>
                    <h4>
                        {receiver}
                        <br />
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

export default withAuthenticator(ChatPage);