import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

// import './index.css';
import "./styles/globals.css";

import AppRoutes from './routes';

import { AuthProvider } from './features/auth/context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
        <AuthProvider>
          <AppRoutes/>
        </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);
