import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import FitnessChatbot from './gemini/FitnessChatbot.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FitnessChatbot />
    <BrowserRouter>
    
     <App />
    </BrowserRouter>
   
  </StrictMode>,
)
