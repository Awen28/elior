import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SmoothScroll } from './components/SmoothScroll'
import { CustomCursor } from './components/CustomCursor'
import { ScrollRestoration } from './components/ScrollRestoration'
import './i18n'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SmoothScroll>
          <CustomCursor />
          <ScrollRestoration />
          <App />
        </SmoothScroll>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
