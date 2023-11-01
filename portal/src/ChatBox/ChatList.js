import React from 'react';

import { API } from "aws-amplify";
import { listChatMessages, getUser } from "../graphql/queries";

//import intlFormatDistance from "date-fns/intlFormatDistance";
//import { queries } from '@testing-library/react';

function ChatList({userId, receiverId, setReceiverID}) {
    //console.log("Sender: " + userId);
    console.log("Receiver: " + receiverId);

    const [receiverIds, setReceivers] = React.useState([]);
    const [receiverNames, setNames] = React.useState([]);

    React.useEffect(() => {
        // Get ids of receivers
        async function GetReceiversFromMessages() {
            const receivers = await API.graphql({
                query: listChatMessages,
                filter : { senderId : {userId}, },
            });
            console.log("receivers" + receivers.data.items.receiverId);
            //setReceivers(receivers.data.items.receiverId);
        }

        // Get name from id
        async function getName(Id) {
            console.log(Id);
            if (Id !== "") {
                const name = await API.graphql({
                    query: getUser,
                    variables: { id : Id }
                });
                
                setNames([
                    ...receiverNames,
                    { firstName: name.data.givenName, lastName: name.data.familyName }
                ]);
                console.log(name);
            }
        }

        //GetReceiversFromMessages();
        //console.log(chatMessages)
    
        if (receiverId !== "" && receiverIds.indexOf(receiverId) === -1) {
            setReceivers([
                ...receiverIds,
                receiverId
            ]);
            //console.log(receiverId);
            //getName(receiverId);
        }
        /*
        if (chatMessages.length > 0) {
            chatMessages.map(message => {
            if (receivers.indexOf(message.receiverID) === -1){
                receivers.concat(message.receiverID);
            }
            });
        }
        */

        //setReceivers(uniqueReceivers);
        
    }, [userId, receiverId]);
    //console.log(receiverNames)

    if (receiverIds.length > 0) {
        const chatList = receiverIds.map((receiver) =>
        <div className="block">
            <div className="imgbx">
                <img src="profile1.jpeg" className="cover" />
            </div>
            <div className="details">
                <div className="listHead">
                    <h4>
                        {receiver}
                    </h4>
                </div>
            </div>
        </div>);
    
        return (
        <div className="chatlist">
            {chatList}
        </div>
        );
    }

    else {
        return (
        <div className="chatlist">
            No Chats
        </div>);
    }

    
    /*
    return (
    <div className="chatlist">
        <div className="block">
            <div className="imgbx">
                 <img src="profile1.jpeg" className="cover" />
            </div>
            <div className="details">
                 <div className="listHead">
                     <h4>Jennifer Yan</h4>
                      <p className="time">9:30</p>
                 </div>
                <div className="message_p">
                     <p>No, thank you, I only want pizza.</p>
                </div>
            </div>
        </div>

        <div className="block">
             <div className="imgbx">
                 <img src="profile2.jpeg" className="cover" />
            </div>
             <div className="details">
                 <div className="listHead">
                     <h4>Ghaida Almalki</h4>
                        <p className="time">09:25</p>
                 </div>
                 <div className="message_p">
                        <p>Hi there! How can I help you today</p>
                         <b>1</b>
                </div>
            </div>
        </div>

        <div className="block">
            <div className="imgbx">
                 <img src="profile1.jpeg" className="cover" />
            </div>
            <div className="details">
                 <div className="listHead">
                     <h4>Jennifer Yan</h4>
                      <p className="time">9:30</p>
                 </div>
                 <div className="message_p">
                     <p>No, thank you, I only want pizza.</p>
                </div>
            </div>
        </div>

        <div className="block">
             <div className="imgbx">
                 <img src="profile2.jpeg" className="cover" />
            </div>
             <div className="details">
                 <div className="listHead">
                     <h4>Ghaida Almalki</h4>
                        <p className="time">09:25</p>
                 </div>
                 <div className="message_p">
                        <p>Hi there! How can I help you today</p>
                         <b>1</b>
                </div>
            </div>
        </div>

        <div className="block">
            <div className="imgbx">
                 <img src="profile1.jpeg" className="cover" />
            </div>
            <div className="details">
                 <div className="listHead">
                     <h4>Jennifer Yan</h4>
                      <p className="time">9:30</p>
                 </div>
                 <div className="message_p">
                     <p>No, thank you, I only want pizza.</p>
                </div>
            </div>
        </div>

        <div className="block">
             <div className="imgbx">
                 <img src="profile2.jpeg" className="cover" />
            </div>
             <div className="details">
                 <div className="listHead">
                     <h4>Ghaida Almalki</h4>
                        <p className="time">09:25</p>
                 </div>
                 <div className="message_p">
                        <p>Hi there! How can I help you today</p>
                         <b>1</b>
                </div>
            </div>
        </div>

        <div className="block">
            <div className="imgbx">
                 <img src="profile1.jpeg" className="cover" />
            </div>
            <div className="details">
                 <div className="listHead">
                     <h4>Jennifer Yan</h4>
                      <p className="time">9:30</p>
                 </div>
                 <div className="message_p">
                     <p>No, thank you, I only want pizza.</p>
                </div>
            </div>
        </div>

        <div className="block">
             <div className="imgbx">
                 <img src="profile2.jpeg" className="cover" />
            </div>
             <div className="details">
                 <div className="listHead">
                     <h4>Ghaida Almalki</h4>
                        <p className="time">09:25</p>
                 </div>
                 <div className="message_p">
                        <p>Hi there! How can I help you today</p>
                         <b>1</b>
                </div>
            </div>
        </div>
    </div>

  );
  */
}

export default ChatList;
