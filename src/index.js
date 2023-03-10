import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import UserState from "./context/UserState";
import { CookiesProvider } from "react-cookie";

import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CookiesProvider>
  <UserState>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserState>
  </CookiesProvider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

