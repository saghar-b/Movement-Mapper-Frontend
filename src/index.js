import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // ask t/a's about the repition created by this 
  <React.StrictMode>
    <App />
   
  </React.StrictMode>
  
);
