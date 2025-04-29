import { Route, BrowserRouter as Router, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom'
import Home from '../src/components/templates/home/Home.jsx'
import ROUTES from '../src/store/constants/routes.js'
import Single from '../src/components/templates/Single.jsx'
import Teams from '../src/components/templates/teams/Teams.jsx'
import Matches from '../src/components/templates/matches/Matches.jsx'
import Main from '../src/components/templates/main/Main.jsx'
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
import { useCheckPath } from './useCheckPath.js'
import AdminTournamentDetails from '../src/components/templates/admin/tournament-details/AdminTournamentDetails.jsx'
import AdminTeams from '../src/components/templates/admin/teams/main/AdminTeams.jsx'
import AdminTeamsUpdate from '../src/components/templates/admin/teams/update/AdminTeamsUpdate.jsx'
import FixtureMain from '../src/components/templates/admin/fixture/main/FixtureMain.jsx'
import LoginForm from '../src/components/templates/users/login/LoginForm.jsx'
import RegisterForm from '../src/components/templates/users/register/RegisterForm.jsx'
import TournamentDetailsMain from '../src/components/templates/admin/tournament-details/TournamentDetailsMain.jsx'
import { useTournamentsDetails } from '../src/store/slices/useTournamentsDetails.js'
import { useMessageStore } from '../src/store/slices/useMessageStore.js'
import orderAllMatchesByDate from '../src/components/templates/matches/orderAllMatchesByDate.jsx'
import { useOrderedMatches } from '../src/store/slices/useOrderedMatches.js'
import checkPathsNoNeedTournament from './checkPathsNoNeedTournament.js'
import checkPathsNeedsMessager from '../src/components/common/message-manager/checkPathsNeedsMessager.js'
import getTournaments from '../src/components/common/getters/GetTournaments.jsx'
import AdminVideos from '../src/components/templates/admin/videos/AdminVideos.jsx'
import EmailSenderMain from '../src/components/templates/admin/contact/email-sender/EmailSenderMain.jsx'
import AdminContact from '../src/components/templates/admin/contact/main/AdminContact.jsx'
window.jQuery = $
window.$ = $

function AppContent() {
  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()
  const { setCurrent } = useCurrentRouteStore()

  const { currentTournament } = useTournamentsDetails()
  const { setAndOrderMatchesByDate } = orderAllMatchesByDate()
  const { setShowMessager } = useMessageStore()
  const { fetchAllTournaments, fetchTournamentDetails } = getTournaments()
  useCheckPath({ currentPath, setCurrent, navigate })

  useEffect(() => {
    // Check if show messages (just if path is Admin)
    const checkIfNeedsMessager = checkPathsNeedsMessager(currentPath)
    setShowMessager(checkIfNeedsMessager)

    // Scroll to top when path is Home
    if (currentPath === ROUTES.HOME) {
      const currentScroll = window.scrollY
      if (currentScroll === 0) return
      window.scrollTo({ top: currentScroll, behavior: 'instant' })
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 10)
    }
  }, [currentPath])

  useEffect(() => {
    fetchAllTournaments()
    if (currentTournament) fetchTournamentDetails({ paramTournament: currentTournament })
  }, [])

  useEffect(() => {
    if (!currentPath || currentPath === '/') return
    if (checkPathsNoNeedTournament(currentPath)) return
    if (Object.entries(currentTournament).length === 0) navigate(ROUTES.MAIN)
    main(currentTournament)
    setAndOrderMatchesByDate()
    return siteSticky()
  }, [currentPath, currentTournament])

  return (
    <>
      <Routes>
        <Route path={ROUTES.BLOG} element={<BlogPage />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.MATCHES} element={<Matches />} />
        <Route path={ROUTES.TEAMS} element={<Teams />} />
        <Route path={ROUTES.SINGLE} element={<Single />} />
        <Route path={ROUTES.ADMIN.MAIN} element={<AdminMain />} />
        <Route path={ROUTES.ADMIN.TOURNAMENT_DETAILS_MAIN} element={<TournamentDetailsMain />} />
        <Route path={ROUTES.ADMIN.TOURNAMENT_DETAILS} element={<AdminTournamentDetails />} />
        <Route path={ROUTES.ADMIN.TEAMS.MAIN} element={<AdminTeams />} />
        <Route path={ROUTES.ADMIN.TEAMS.UPDATE} element={<AdminTeamsUpdate />} />
        <Route path={ROUTES.ADMIN.FIXTURE.MAIN} element={<FixtureMain />} />
        <Route path={ROUTES.ADMIN.VIDEOS} element={<AdminVideos />} />
        <Route path={ROUTES.ADMIN.CONTACT} element={<AdminContact />} />
        <Route path={ROUTES.LOGIN} element={<LoginForm />} />
        <Route path={ROUTES.REGISTER} element={<RegisterForm />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
      </Routes>
    </>
  )
}

function App() {
  const { currentTournament } = useTournamentsDetails()
  const { showMessager } = useMessageStore()
  return (
    <div className="site-wrap">
      {showMessager && (<MessageManager />)}
      <MobileMenu />
      {currentTournament && Object.entries(currentTournament).length !== 0 && (<Header />)}
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AppContent />
        <Footer />
      </Router>
    </div>
  )
}

export default App