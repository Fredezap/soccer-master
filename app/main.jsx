import '../src/styles/scss/index.js'
import '../src/styles/css/index.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AOS from 'aos'

AOS.init({
  duration: 800,
  easing: 'slide',
  once: true
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)