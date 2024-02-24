import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listChatMessages, getUser, listChatGroups } from "../../graphql/queries";

function ChatList({ chatGroups, onChatGroupClick }) {
    return (
        <div className="chatlist">
          {chatGroups.map((group) => (
            <div key={group.id} className="block" onClick={() => onChatGroupClick(group)}>
              <div className="imgbx">
                {/* You can replace the static image with the image related to the chat group */}
                <img src="profile1.jpeg" className="cover" alt="Profile" />
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

// import React from 'react';

// import { API } from "aws-amplify";
// import { getUser, getLocation ,listChatGroups } from "../graphql/queries";

// //importing authenticator
// import { withAuthenticator } from "@aws-amplify/ui-react";

// //import intlFormatDistance from "date-fns/intlFormatDistance";
// //import { queries } from '@testing-library/react';

// function ChatList({userId, setReceiverID}) {
//     const [isLocation, setIsLocation] = React.useState(0);
//     // 0 - Not Set
//     // 1 - User
//     // 2 - Location

//     const [chatGroups, setChatGroups] = React.useState([]);
//     const [groupNames, setGroupNames] = React.useState([]);

//     React.useEffect(() => {
//         if(userId !== "") {
//             async function IsLocation() {
//                 const user = await API.graphql({
//                     query: getUser,
//                     variables: {id: userId}
//                 });
//                 if (user.data.getUser !== null) setIsLocation(1);
//                 else setIsLocation(2)
//             }
//             IsLocation();
            
//         }
//     }, [userId]);

//     React.useEffect(() => {
//         function variableSetter() {
//             if (isLocation === 2) {
//                 return {filter: {locationID: {contains: userId}}};
//             }
//             else if (isLocation === 1){
//                 return {filter: {userID: {contains: userId}}};
//             }
//         }
//         const variables = variableSetter();

//         async function fetchGroups() {
//             const groups = await API.graphql( {
//                 query: listChatGroups,
//                 variables: variables
//             })
//             setChatGroups(groups.data.listChatGroups.items);
//         }
//         if (isLocation !== 0) fetchGroups();
//     }, [isLocation]);

//     React.useEffect(() => {
//         /*
//         async function fetchUserName(Id) {
//             const user = await API.graphql( {
//                 query: getUser,
//                 variables: {id: Id}
//             });
//             const name = user.givenName + user.familyName;
//             return name;
//         }

//         async function fetchLocationName(Id) {
//             const location = await API.graphql( {
//                 query: getLocation,
//                 variables: {id: Id}
//             });
//             return location.name;
//         }
//         */
//         if (chatGroups !== undefined)
//         {
//             if (isLocation === 2)
//             {
//                 chatGroups.forEach((group) => {
//                     setGroupNames((groupNames) => ([...groupNames, group.userID]));
//                 });
//             }
//             else if (isLocation === 1){
//                 chatGroups.forEach( (group) => {
//                     setGroupNames((groupNames) => ([...groupNames, group.locationID]));
//                 });
//             }
//         }
//     }, [chatGroups]);

//     if (groupNames.length > 0) {
//         //console.log(groupNames);
//         const chatList = groupNames.map((name, index) =>
//         <div className="block">
//             {/*<div className="imgbx">
//                 <img src="profile1.jpeg" className="cover" />
//             </div>*/}
//             <div className="details">
//                 <div className="listHead">
//                     <h4>
//                         <button name="group-name"
//                         id="name-button"
//                         onClick={() => {
//                             if (isLocation === 2) {
//                                 setReceiverID(chatGroups.at(index).userID);
//                             }
//                             else if (isLocation === 1) {
//                                 setReceiverID(chatGroups.at(index).locationID);
//                             }}}>
//                             {name}
//                         </button>
//                     </h4>
//                 </div>
//             </div>
//         </div>);
    
//         return (
//         <div className="chatlist">
//             {chatList}
//         </div>
//         );
//     }
    
//     else {
//         return (
//         <div className="chatlist">
//             No Chats
//         </div>);
//     }
    
//     /*
//     return (
//     <div className="chatlist">
//         <div className="block">
//             <div className="imgbx">
//                  <img src="profile1.jpeg" className="cover" />
//             </div>
//             <div className="details">
//                  <div className="listHead">
//                      <h4>Jennifer Yan</h4>
//                       <p className="time">9:30</p>
//                  </div>
//                 <div className="message_p">
//                      <p>No, thank you, I only want pizza.</p>
//                 </div>
//             </div>
//         </div>

//         <div className="block">
//              <div className="imgbx">
//                  <img src="profile2.jpeg" className="cover" />
//             </div>
//              <div className="details">
//                  <div className="listHead">
//                      <h4>Ghaida Almalki</h4>
//                         <p className="time">09:25</p>
//                  </div>
//                  <div className="message_p">
//                         <p>Hi there! How can I help you today</p>
//                          <b>1</b>
//                 </div>
//             </div>
//         </div>

//         <div className="block">
//             <div className="imgbx">
//                  <img src="profile1.jpeg" className="cover" />
//             </div>
//             <div className="details">
//                  <div className="listHead">
//                      <h4>Jennifer Yan</h4>
//                       <p className="time">9:30</p>
//                  </div>
//                  <div className="message_p">
//                      <p>No, thank you, I only want pizza.</p>
//                 </div>
//             </div>
//         </div>

//         <div className="block">
//              <div className="imgbx">
//                  <img src="profile2.jpeg" className="cover" />
//             </div>
//              <div className="details">
//                  <div className="listHead">
//                      <h4>Ghaida Almalki</h4>
//                         <p className="time">09:25</p>
//                  </div>
//                  <div className="message_p">
//                         <p>Hi there! How can I help you today</p>
//                          <b>1</b>
//                 </div>
//             </div>
//         </div>

//         <div className="block">
//             <div className="imgbx">
//                  <img src="profile1.jpeg" className="cover" />
//             </div>
//             <div className="details">
//                  <div className="listHead">
//                      <h4>Jennifer Yan</h4>
//                       <p className="time">9:30</p>
//                  </div>
//                  <div className="message_p">
//                      <p>No, thank you, I only want pizza.</p>
//                 </div>
//             </div>
//         </div>

//         <div className="block">
//              <div className="imgbx">
//                  <img src="profile2.jpeg" className="cover" />
//             </div>
//              <div className="details">
//                  <div className="listHead">
//                      <h4>Ghaida Almalki</h4>
//                         <p className="time">09:25</p>
//                  </div>
//                  <div className="message_p">
//                         <p>Hi there! How can I help you today</p>
//                          <b>1</b>
//                 </div>
//             </div>
//         </div>

//         <div className="block">
//             <div className="imgbx">
//                  <img src="profile1.jpeg" className="cover" />
//             </div>
//             <div className="details">
//                  <div className="listHead">
//                      <h4>Jennifer Yan</h4>
//                       <p className="time">9:30</p>
//                  </div>
//                  <div className="message_p">
//                      <p>No, thank you, I only want pizza.</p>
//                 </div>
//             </div>
//         </div>

//         <div className="block">
//              <div className="imgbx">
//                  <img src="profile2.jpeg" className="cover" />
//             </div>
//              <div className="details">
//                  <div className="listHead">
//                      <h4>Ghaida Almalki</h4>
//                         <p className="time">09:25</p>
//                  </div>
//                  <div className="message_p">
//                         <p>Hi there! How can I help you today</p>
//                          <b>1</b>
//                 </div>
//             </div>
//         </div>
//     </div>

//   );
//   */
// }

// export default ChatList;