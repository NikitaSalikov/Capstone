import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { chatMessagesByChatgroupID } from '../../graphql/queries';
import { onCreateChatMessage } from '../../graphql/subscriptions';
import * as mutations from "../../graphql/mutations";
import intlFormatDistance from "date-fns/intlFormatDistance";

import MessageComponent from '../MessageComponent';
import TextInputComponent from '../TextInputComponent';
import { FaPaperPlane } from 'react-icons/fa';

function MessageContainer({ chatGroup, sender, receiver, isBlurActive }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  //const [subscription, setSubscription] = useState();

  useEffect(() => {
    // Fetch all the current messages
    async function fetchMessages() {
      try {
        if (chatGroup && chatGroup.id) {
          const result = await API.graphql({
            query: chatMessagesByChatgroupID,
            variables: {
              chatgroupID: chatGroup.id,
            },
          });
          setChatMessages(result.data.chatMessagesByChatgroupID.items);
        }
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    }
    fetchMessages();

    // Gets future chat messages
    const sub =
      API.graphql({
        query: onCreateChatMessage,
        variables: {
          filter: {
            chatgroupID: {eq: chatGroup.id}
          }
        }
      }).subscribe({
        next: ({provider, value}) => {
          //console.log(value.data.onCreateChatMessage);
          setChatMessages((prev) => [...prev, value.data.onCreateChatMessage]);
        }
      })
    
    return () => sub.unsubscribe()
  }, [chatGroup]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const newMessageData = {
        chatgroupID: chatGroup.id,
        senderID: sender,
        receiverID: receiver,
        data: newMessage,
      };

      await API.graphql({
        query: mutations.createChatMessage,
        variables: {
          input: newMessageData,
        },
      });

      // update
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const sortedChatMessages = chatMessages.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // add waiting
  if (!chatGroup || !chatGroup.id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={`chatbox ${isBlurActive ? 'blur-effect' : ''}`}>
        {sortedChatMessages.map((message) => (
          <MessageComponent
            key={message.id}
            message={message}
            sender={sender}
          />
        ))}
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

export default MessageContainer;