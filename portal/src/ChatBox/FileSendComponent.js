import React, { useState } from 'react';
import { Storage } from 'aws-amplify';
import * as mutations from "../graphql/mutations";
import { API } from 'aws-amplify';

function FileSendComponent({sender, receiver, chatGroupId, fileData}) {

  const uploadFile = async () => {
    const result = await Storage.put(fileData.name, fileData, {
      contentType: fileData.type,
    });
  };

  return (
    <div>
      <button
        style={{marginLeft: -4, width: 83, fontSize: 13 }}
        name="attach-outline"
        onClick={async function (event) {
            uploadFile();

            try {
                const newMessageData = {
                    chatgroupID: chatGroupId,
                    senderID: sender,
                    receiverID: receiver,
                    data: fileData.name,
                    isFile: true,
                };
          
                await API.graphql({
                  query: mutations.createChatMessage,
                  variables: {
                    input: newMessageData,
                  },
                });
              } catch (error) {
                console.error('Error sending message:', error);
              }
        }}>
        Upload File
      </button>
    </div>
  );
}

export default FileSendComponent;
