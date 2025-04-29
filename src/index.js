// entry point for React application
// mounts React application to DOM

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming your main component is in App.jsx or App.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);