import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Userpage from './ChatBox/User/ChatPage';
import Businesspage from './ChatBox/Business/ChatPage';
import reportWebVitals from './reportWebVitals';

import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { BrowserRouter } from 'react-router-dom';
Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      {<Userpage />}

      {/*<Businesspage
        location={"902ecd81-37c1-498d-ae23-e964d70d0f91"}
      />*/}
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();