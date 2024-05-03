import React from 'react';

function ChatList({ chatGroups, receivers, onChatGroupClick }) {
    return (
        <div className="chatlist">
          {chatGroups.map((group) => (
            <div key={group.id} className="block" onClick={() => onChatGroupClick(group)}>
              <div className="imgbx">
                {/* You can replace the static image with the image related to the chat group */}
                <img src="Avatar.jpeg" className="cover" alt="Profile" />
              </div>
              <div className="details">
                <div className="listHead">
                  <h4>
                  {(chatGroups.length === receivers.length) && 
                    (receivers.filter((element) => element.id === group.userID)[0].givenName)}
                  </h4>
                  {/*<p className="time">9:30</p>*/}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  
  export default ChatList;