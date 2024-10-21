import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
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
window.jQuery = $
window.$ = $

function App() {
  useEffect(() => {
    main()
    Fancybox.bind('[data-fancybox]')
    return siteSticky()
  }, [])

  return (
    <div className="site-wrap">
      <Header />
      <Router>
        <Routes>
          <Route path={ROUTES.BLOG} element={<BlogPage />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.MATCHES} element={<Matches />} />
          <Route path={ROUTES.PLAYERS} element={<Players />} />
          <Route path={ROUTES.SINGLE} element={<Single />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App