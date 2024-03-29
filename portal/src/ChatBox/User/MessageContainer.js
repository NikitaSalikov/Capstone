import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { chatMessagesByChatgroupID } from '../../graphql/queries';
import * as mutations from "../../graphql/mutations";
import intlFormatDistance from "date-fns/intlFormatDistance";

function MessageContainer({ chatGroup, sender, receiver }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // fetching messages
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

      // update
      setChatMessages([...chatMessages, newMessageData]);
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
  console.log("TIMESTAMP: ",chatMessages.createdAt);
  return (
    <div>
      <div className="chatbox">
        {sortedChatMessages.map((message) => (
          <div
            className={`chat-messages ${message.senderID === sender ? 'my_message' : 'frnd_message'}`}
            key={message.id}
          >
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
export default MessageContainer;

// import React from 'react';


// function MessageContainer(/*{senderId, receiverId}*/) {
//   /*const receiverId = 0;
//   if (receiverId == 0)
//   {
//     return
//     (
//       <div className="chatbox">

//       </div>
//     );
//   }*/
//   return (
//   <div className="chatbox">
//     <div className="chat-messages my_message">
//       <p>Hi<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//     <div className="chat-messages frnd_message">
//       <p>Hello<br /><span>9:25</span></p>
//     </div>
//   </div>
//   );
// }

// export default MessageContainer;
