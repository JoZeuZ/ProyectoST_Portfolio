import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import "./main.css"
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);