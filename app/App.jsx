import { Route, BrowserRouter as Router, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom'
import Home from '../src/components/templates/home/Home.jsx'
import ROUTES from '../src/store/constants/routes.js'
import Single from '../src/components/templates/Single.jsx'
import Players from '../src/components/templates/players/Players.jsx'
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
import formatDate from '../src/components/common/formatDate.js'
import { useMessageStore } from '../src/store/slices/useMessageStore.js'
import { useSubmittingFormStore } from '../src/store/slices/useSubmittingFormStore.js'
import handleSubmitFormAdmin from '../src/components/templates/admin/handleSubmitFormAdmin.js'
window.jQuery = $
window.$ = $

function AppContent() {
  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()
  const { setCurrent } = useCurrentRouteStore()
  useCheckPath({ currentPath, setCurrent, navigate })
  const { currentTournament, tournaments, setTournaments, setCurrentTournament } = useTournamentsDetails()

  // TODO: VER PARTE USUARIOS. Ir mostrando datos y demas
  // TODO: DESPUES. Ver de sacar el partido seleccionado de Admin main
  // TODO: DESPUES. Ver de sacar el boton admin, si no esta logueado
  // TODO: DESPUES. Ver de hacer la barra de navegacion para el admin
  // TODO: DESPUES. Ver si se pueden meter mas validaciones a los partidos de eliminacion

  const { addMessage } = useMessageStore()
  const { setSubmittingForm } = useSubmittingFormStore()

  useEffect(() => {
    getTournaments()
  }, [])

  const getTournaments = async() => {
    const url = 'admin/tournament-details/get-all'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ url, addMessage, setSubmittingForm, httpMethod })
    if (response?.success) {
      setTournaments(response.data?.allTournaments)
    }
  }

  useEffect(() => {
    if (Object.entries(currentTournament).length === 0) navigate(ROUTES.MAIN)
    main(currentTournament)
    Fancybox.bind('[data-fancybox]')
    return siteSticky()
  }, [currentTournament])

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
        <Route path={ROUTES.ADMIN.TOURNAMENT_DETAILS_MAIN} element={<TournamentDetailsMain />} />
        <Route path={ROUTES.ADMIN.TOURNAMENT_DETAILS} element={<AdminTournamentDetails />} />
        <Route path={ROUTES.ADMIN.TEAMS.MAIN} element={<AdminTeams />} />
        <Route path={ROUTES.ADMIN.TEAMS.UPDATE} element={<AdminTeamsUpdate />} />
        <Route path={ROUTES.ADMIN.FIXTURE.MAIN} element={<FixtureMain />} />
        <Route path={ROUTES.LOGIN} element={<LoginForm />} />
        <Route path={ROUTES.REGISTER} element={<RegisterForm />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
      </Routes>
    </>
  )
}

function App() {
  const { currentTournament } = useTournamentsDetails()
  return (
    <div className="site-wrap">
      <MessageManager />
      <MobileMenu />
      {Object.entries(currentTournament).length !== 0 && (<Header />)}
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