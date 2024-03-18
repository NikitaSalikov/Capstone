// MessageComponent.js
import React from 'react';
import intlFormatDistance from "date-fns/intlFormatDistance";

function MessageComponent({ message, sender }) {
  return (
    <div className={`chat-messages ${message.senderID === sender ? 'my_message' : 'frnd_message'}`}>
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
  );
}

function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export default MessageComponent;
