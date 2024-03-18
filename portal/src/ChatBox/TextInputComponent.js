// TextInputComponent.js
import React from 'react';

function TextInputComponent({ value, onChange, onKeyPress }) {

  return (
    <input
      style={{ marginLeft: 75 }}
      type="text"
      placeholder="Type a message"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
}

export default TextInputComponent;
