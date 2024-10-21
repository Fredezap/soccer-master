import './styles/scss/index.js'
import './styles/css/index.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AOS from 'aos'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel'

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