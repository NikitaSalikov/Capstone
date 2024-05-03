// FileUploadComponent.js
import React, { useState } from 'react';
import FileSendComponent from './FileSendComponent';

function FileUploadComponent({sender, receiver, chatGroupId}) {
  const [fileData, setFileData] = useState('');
  
  return (
    <div>
      <input
        style={{marginLeft: -5, marginRight: -10, fontSize: 13, height: 20}}
        type="file"
        onChange={(e) => setFileData(e.target.files[0])} 
        />
        <FileSendComponent 
          sender={sender}
          receiver={receiver}
          chatGroupId={chatGroupId}
          fileData={fileData}
          fileName={fileData.name}
          fileType={fileData.type}
        />
    </div>
  );
}

export default FileUploadComponent;
