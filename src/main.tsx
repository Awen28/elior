import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SmoothScroll } from './components/SmoothScroll'
import { CustomCursor } from './components/CustomCursor'
import { ScrollRestoration } from './components/ScrollRestoration'
import { PortalTransition } from './components/PortalTransition'
import './i18n'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScroll>
        <PortalTransition>
          <CustomCursor />
          <ScrollRestoration />
          <App />
        </PortalTransition>
      </SmoothScroll>
    </BrowserRouter>
  </StrictMode>,
)
