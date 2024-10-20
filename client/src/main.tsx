import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MobileProvider } from "@contexts/MobileContext.tsx";
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MobileProvider>
      <App />
    </MobileProvider>
  </StrictMode>,
)