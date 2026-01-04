import { StrictMode } from 'react'
import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ContextProvider } from './context/context.jsx'

createRoot(document.getElementById('root')).render(
  <ContextProvider>

    <App />
    
  </ContextProvider>,
)
