import { Route, BrowserRouter as Router, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom'
import Home from './components/templates/home/Home.jsx'
import ROUTES from './store/constants/routes.js'
import Single from './components/templates/Single.jsx'
import Players from './components/templates/players/Players.jsx'
import Matches from './components/templates/matches/Matches.jsx'
import Main from './components/templates/Main.jsx'
import Contact from './components/templates/contact/Contact.jsx'
import BlogPage from './components/templates/blog/BlogPage.jsx'
import main from './js/main/main.js'
import $ from 'jquery'
import siteSticky from './js/js-refactorized/siteSticky.js'
import { useEffect } from 'react'
import { Fancybox } from '@fancyapps/ui'
import './styles/fancybox.css'
import Header from './components/common/Header.jsx'
import Footer from './components/common/Footer.jsx'
import useCurrentRouteStore from './store/slices/useCurrentRouteStore.js'
import MobileMenu from './components/common/mobile-menu/MobileMenu.jsx'
window.jQuery = $
window.$ = $

function AppContent() {
  const location = useLocation()
  const navigate = useNavigate()
  const { setCurrent } = useCurrentRouteStore()

  useEffect(() => {
    if (!Object.values(ROUTES).includes(location.pathname)) {
      setCurrent(ROUTES.HOME)
      navigate(ROUTES.HOME)
      return
    }
    setCurrent(location.pathname)
    main()
    Fancybox.bind('[data-fancybox]')
    return siteSticky()
  }, [])

  return (
    <>
      <Routes>
        <Route path={ROUTES.BLOG} element={<BlogPage />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.MATCHES} element={<Matches />} />
        <Route path={ROUTES.PLAYERS} element={<Players />} />
        <Route path={ROUTES.SINGLE} element={<Single />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <div className="site-wrap">
      <MobileMenu />
      <Header />
      <Router>
        <AppContent />
      </Router>
      <Footer />
    </div>
  )
}

export default App