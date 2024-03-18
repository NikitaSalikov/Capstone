import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { chatMessagesByChatgroupID } from '../graphql/queries';
import * as mutations from "../graphql/mutations";
import MessageComponent from './MessageComponent';
import FileUploadComponent from './FileUploadComponent';
import TextInputComponent from './TextInputComponent';
import { FaPaperPlane } from 'react-icons/fa';

function MessageContainer({ chatGroup, sender, receiver, isBlurActive }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
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

      setChatMessages([...chatMessages, newMessageData]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

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
      </div>

      <div className="chatbox_input">
        <FileUploadComponent />

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
