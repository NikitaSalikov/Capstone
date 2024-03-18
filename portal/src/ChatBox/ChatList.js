import React, { useEffect, useState } from 'react';
import { listChatMessages, getUser } from "../graphql/queries";

import { API, graphqlOperation } from 'aws-amplify';
import { listChatGroups } from '../graphql/queries';

function ChatList({ chatGroups, onChatGroupClick }) {
    return (
        <div className="chatlist">
          {chatGroups.map((group) => (
            <div key={group.id} className="block" onClick={() => onChatGroupClick(group)}>
              <div className="imgbx">
                {/* You can replace the static image with the image related to the chat group */}
                <img src="Avatar.png" className="cover" alt="Profile" />
              </div>
              <div className="details">
                <div className="listHead">
                  <h4>{group.locationID}</h4>
                  <p className="time">9:30</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  
  export default ChatList;
