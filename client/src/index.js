import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import App from './App';
import './index.css';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
  </BrowserRouter>
);
