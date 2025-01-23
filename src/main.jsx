import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 引入 icons.js
import './utils/icons.js';
import './assets/all.scss';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
