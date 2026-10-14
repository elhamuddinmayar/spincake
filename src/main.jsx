import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './i18n'
import { LazyMotion } from 'framer-motion'

const motionFeatures = () => import('./motion-features').then((r) => r.default)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LazyMotion features={motionFeatures}>
      <LangProvider>
        <App />
      </LangProvider>
    </LazyMotion>
  </StrictMode>,
)
