// FileUploadComponent.js
import React, { useState } from 'react';
import { Storage } from 'aws-amplify';
import { FaRegFile } from "react-icons/fa";

function FileUploadComponent() {
  const [fileData, setFileData] = useState();

  const uploadFile = async () => {
    const result = await Storage.put(fileData.name, fileData, {
      contentType: fileData.type,
    });
    console.log(21, result);
  };

  return (
    <div>
      <input
        style={{ marginLeft: -10, marginBottom: -10, width: 100, fontSize: 15 }}
        type="file"
        onChange={(e) => setFileData(e.target.files[0])} />
      <button
        style={{ marginLeft: -10, width: 95, fontSize: 15 }}
        name="attach-outline"
        onClick={async function (event) {
          uploadFile();
        }}>
        Upload File
      </button>
    </div>
  );
}

export default FileUploadComponent;
