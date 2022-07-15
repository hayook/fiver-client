import './css/normalize.css'
import './css/global.css'

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ApiContextProvider from './context/api';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <ApiContextProvider>
        <App />
      </ApiContextProvider>
    </Router>
  </React.StrictMode>
);
