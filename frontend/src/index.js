import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { AuthContextProvider } from "./context/AuthContext";
import { ConversationContextProvider } from "./providers/ConversationProvider";
import { ActiveConversationContextProvider } from "./providers/ActiveConversationProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ConversationContextProvider>
        <ActiveConversationContextProvider>
          <App />
        </ActiveConversationContextProvider>
      </ConversationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
