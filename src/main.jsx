// import React from 'react';
// import ReactDOM from 'react-dom/client';

// import { BrowserRouter } from 'react-router-dom';

// // import './index.css';
// import "./styles/globals.css";

// import AppRoutes from './routes';

// import { AuthProvider } from './features/auth/context/AuthContext';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//      <BrowserRouter>
//         <AuthProvider>
//           <AppRoutes/>
//         </AuthProvider>
//       </BrowserRouter>
//   </React.StrictMode>
// );

// import React from "react";

// import ReactDOM from "react-dom/client";


// // Global styles
// import "./styles/globals.css";


// // Application routes
// import AppRoutes from "./routes";


// // Authentication provider
// import {

//   AuthProvider,

// } from "./features/auth/context/AuthContext";


// // Render React application
// ReactDOM.createRoot(

//   document.getElementById("root")

// ).render(

//   <React.StrictMode>

//     {/* Global authentication wrapper */}
//     <AuthProvider>

//       <AppRoutes />

//     </AuthProvider>

//   </React.StrictMode>
// );


import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "./styles/globals.css";

import AppRoutes from "./routes";

import {

  AuthProvider,

} from "./features/auth/context/AuthContext";

ReactDOM.createRoot(

  document.getElementById("root")

).render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <AppRoutes />

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);