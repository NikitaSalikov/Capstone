// MessageComponent.js
import React from 'react';
import intlFormatDistance from "date-fns/intlFormatDistance";
import styled from 'styled-components';

const Button = styled.button`
  color: blue;
  border: none;
  background-color: transparent;
  &:disabled {
    color: black;
    border: none;
  }
`;

function MessageComponent({ message, sender }) {
  //const link = "https://google.com/";
  const link = 'https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/' + message.data;
  return (
    <div className={`chat-messages ${message.senderID === sender ? 'my_message' : 'frnd_message'}`}>
      <p>
        <a href={link}>
          <Button disabled={message.isFile ? false : true}>
            {message.data}
          </Button>
        </a>
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
