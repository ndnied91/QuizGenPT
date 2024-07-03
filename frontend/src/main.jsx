import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';

const VITE_CLERK_PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Archives from './Components/Archives.jsx';
import { AppProvider } from './Components/context.jsx';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: (
//       <div>
//         <App />
//       </div>
//     ),
//   },
//   {
//     path: 'archives',
//     element: <Archives />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
      <AppProvider>
        {/* <RouterProvider router={router} /> */}
        <App />
      </AppProvider>
    </ClerkProvider>
  </React.StrictMode>
);
