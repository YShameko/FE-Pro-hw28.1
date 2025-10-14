import './style.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';

const rootEl = document.getElementById('main');
const root = ReactDOM.createRoot(rootEl);

root.render(<HashRouter>
        <App />
</HashRouter>
);

// ============================================================================================================
