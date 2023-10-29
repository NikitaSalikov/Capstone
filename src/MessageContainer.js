import React from 'react';

function MessageContainer() {
  return (
    <div className="chatbox">
  <div className="chat-messages my_message">
    <p>Hi<br /><span>9:25</span></p>
  </div>
  <div className="chat-messages frnd_message">
    <p>Hello<br /><span>9:25</span></p>
  </div>
  <div className="chat-messages my_message">
    <p>How can I help you Jennifer?<br /><span>9:26</span></p>
  </div>
  <div className="chat-messages frnd_message">
    <p>Yes, I was wondering if I can order here?<br /><span>9:26</span></p>
  </div>
  <div className="chat-messages my_message">
    <p>Of course.<br /><span>9:27</span></p>
  </div>
  <div className="chat-messages my_message">
    <p>What can I get for you?<br /><span>9:27</span></p>
  </div>
  <div className="chat-messages frnd_message">
    <p>emmm..<br /><span>9:28</span></p>
  </div>
  <div className="chat-messages frnd_message">
    <p>I would like to get a Hawaii Pizza.<br /><span>9:29</span></p>
  </div>
  <div className="chat-messages my_message">
    <p>Sure, would you like to make it a meal?<br /><span>9:30</span></p>
  </div>
  <div className="chat-messages frnd_message">
    <p>No, thank you, I only want pizza.<br /><span>9:30</span></p>
  </div>
</div>

  );
}

export default MessageContainer;
