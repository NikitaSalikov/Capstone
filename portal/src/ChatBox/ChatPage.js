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
    
    const [sender, setSenderID] = useState("");
    const [receiver, setReceiverID] = useState("");
    
    // send click event function
    const handleSendClick = () => {
      const newMessage = { text: message, sender: 'my_message' };
      setChatMessages([...chatMessages, newMessage]); // Add the message to chatMessages
      setMessage(''); 
    };

    React.useEffect(() => {
        // Hard coded for now...
        setSenderID("3451f67c-c692-4a06-aff3-140c79434145");
        setReceiverID("2790ac85-4a50-4a01-b9e7-821fc1824fcc");
    }, []);

    return(
    <div className="chat-container">
        <div className="leftSide">
            <div className="header">
                <div className="userimg">
                    <img src="restaurant1.jpeg" className="cover" alt="User" />
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
                receiverId={receiver}
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
                        {sender}
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