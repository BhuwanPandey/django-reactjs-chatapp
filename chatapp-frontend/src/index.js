import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import {ChatContextProvider} from "./context/ChatContext";
import {InputContextProvider} from "./context/InputContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ChatContextProvider>
        <AuthContextProvider>
          <InputContextProvider>
            <App />
          </InputContextProvider>
        </AuthContextProvider>
      </ChatContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

