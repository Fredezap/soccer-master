import { Route, BrowserRouter as Router, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom'
import Home from '../src/components/templates/home/Home.jsx'
import ROUTES from '../src/store/constants/routes.js'
import Single from '../src/components/templates/Single.jsx'
import Players from '../src/components/templates/players/Players.jsx'
import Matches from '../src/components/templates/matches/Matches.jsx'
import Main from '../src/components/templates/Main.jsx'
import Contact from '../src/components/templates/contact/Contact.jsx'
import BlogPage from '../src/components/templates/blog/BlogPage.jsx'
import main from '../src/js/main/main.js'
import $ from 'jquery'
import siteSticky from '../src/js/js-refactorized/siteSticky.js'
import { useEffect } from 'react'
import { Fancybox } from '@fancyapps/ui'
import '../src/styles/fancybox.css'
import Header from '../src/components/common/Header.jsx'
import Footer from '../src/components/common/Footer.jsx'
import useCurrentRouteStore from '../src/store/slices/useCurrentRouteStore.js'
import MobileMenu from '../src/components/common/mobile-menu/MobileMenu.jsx'
import AdminMain from '../src/components/templates/admin/AdminMain.jsx'
import MessageManager from '../src/components/common/message-manager/MessageManager.jsx'
import checkPath from './checkPath.js'
import AdminTournamentDetails from '../src/components/templates/admin/tournament-details/AdminTournamentDetails.jsx'
import AdminTeams from '../src/components/templates/admin/teams/main/AdminTeams.jsx'
import AdminTeamsUpdate from '../src/components/templates/admin/teams/update/AdminTeamsUpdate.jsx'
import FixtureMain from '../src/components/templates/admin/fixture/main/FixtureMain.jsx'
window.jQuery = $
window.$ = $

function AppContent() {
  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()
  const { setCurrent } = useCurrentRouteStore()

  useEffect(() => {
    checkPath({ currentPath, setCurrent, navigate })
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
        <Route path={ROUTES.ADMIN.MAIN} element={<AdminMain />} />
        <Route path={ROUTES.ADMIN.TOURNAMENT_DETAILS} element={<AdminTournamentDetails />} />
        <Route path={ROUTES.ADMIN.TEAMS.MAIN} element={<AdminTeams />} />
        <Route path={ROUTES.ADMIN.TEAMS.UPDATE} element={<AdminTeamsUpdate />} />
        <Route path={ROUTES.ADMIN.FIXTURE.MAIN} element={<FixtureMain />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <div className="site-wrap">
      <MessageManager />
      <MobileMenu />
      <Header />
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AppContent />
      </Router>
      <Footer />
    </div>
  )
}

export default App