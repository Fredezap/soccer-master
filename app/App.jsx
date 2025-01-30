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
import { useSubmittingFormStore } from '../src/store/slices/useSubmittingFormStore.js'
import handleSubmitFormAdmin from '../src/components/templates/admin/handleSubmitFormAdmin.js'
import orderAllMatchesByDate from '../src/components/templates/matches/orderAllMatchesByDate.jsx'
import { useOrderedMatches } from '../src/store/slices/useOrderedMatches.js'
window.jQuery = $
window.$ = $

function AppContent() {
  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()
  const { setCurrent } = useCurrentRouteStore()
  useCheckPath({ currentPath, setCurrent, navigate })
  const { currentTournament, setTournaments } = useTournamentsDetails()
  const { setMatchesByDate } = useOrderedMatches()
  const { orderMatchesByDate } = orderAllMatchesByDate()

  // TODO: DESPUES. Ver de sacar el partido seleccionado de Admin main
  // TODO: DESPUES. Ver de hacer la barra de navegacion para el admin

  const { addMessage } = useMessageStore()
  const { setSubmittingForm } = useSubmittingFormStore()

  useEffect(() => {
    getTournaments()
  }, [])

  const getTournaments = async() => {
    const url = '/tournaments/get-all'
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

  const orderMatchesAndSet = () => {
    const orderedMatches = orderMatchesByDate()
    setMatchesByDate(orderedMatches)
  }

  useEffect(() => {
    orderMatchesAndSet() // Ejecutar al cargar

    const interval = setInterval(orderMatchesAndSet, 5 * 60 * 1000) // Repetir cada 5 minutos

    return () => clearInterval(interval) // Limpiar al desmontar
  }, [currentTournament])

  // todo: Pasar a seccion home, la parte de next match. Como lo voy a manejar a eso? Si no hay partidos u horarios?
  // todo: El contador no anda. Mostrar datos del partido si los hubiera
  // todo: Luego mostar tabla, quiza grupos en vez de una sola tabla.
  // todo: Luego ver de mostrar las brackets en caso de que hayan datos.
  // todo: A todo esto, deberia hacer un fetch de los datos de db cada unos 15 min? aprox?
  // todo: Luego creo que pasar a matches y players seria la posta
  // todo: seguir con contacto? creo que deiv queria dejar algo de eso. Inclusive si quieren agregar videos deberia mandarlos ahi.
  // todo: Por ultimo las news, los videos, el blog y footer, ver que se hace con eso

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