import NextMatchAndTable from './table-scores/NextMatchAndTable'
import Videos from '../../common/Videos'
import HeroHome from './HeroHome'
import { useEffect, useState } from 'react'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import handleSubmitFormAdmin from '../admin/handleSubmitFormAdmin'
import { useSubmittingFormStore } from '../../../store/slices/useSubmittingFormStore'
import { useMessageStore } from '../../../store/slices/useMessageStore'
import BracketMatches from './brackets/BracketMatches'
import { useUserStore } from '../../../store/slices/useUserStore'
import getSectionBg from '../../common/section-styles/getSectionBg'
import TournamentInfo from '../main/TournamentInfo'
import CountDownSection from './count-down/CountDownSection'
import SponsorsSection from './sponsors/SponsorsSection'
import CategoriesSection from './caregories/CategoriesSection'
import getTournaments from '../../common/getters/GetTournaments'
import InterviewWithStephanieSection from './interview/InterviewWithStephanieSection'

const Home = () => {
  const [dbKnockoutStages, setDbKnockoutStages] = useState([])
  const [dbMatches, setDbMatches] = useState([])
  const { currentTournament, tournaments, setCurrentTournament } = useTournamentsDetails()
  const { setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()
  const { user } = useUserStore()
  const sectionBg = getSectionBg(currentTournament, dbKnockoutStages)
  const { fetchAllTournaments } = getTournaments()

  const getKnockoutStages = async() => {
    try {
      const url = '/stages/get-all-knockout-stages-by-tournament'
      const httpMethod = 'post'
      const values = { tournamentId: currentTournament.tournamentId }
      const response = await handleSubmitFormAdmin({ values, url, httpMethod, setSubmittingForm, addMessage, user })
      if (response?.success && response.data?.dbKnockoutStages) {
        setDbKnockoutStages(response.data.dbKnockoutStages)
      }
    } catch (error) {}
  }

  const getMatches = async(values) => {
    try {
      const url = '/matches/get-all'
      const httpMethod = 'post'
      const response = await handleSubmitFormAdmin({ values, url, httpMethod, setSubmittingForm, addMessage, user })
      if (response?.success) {
        setDbMatches(response.data.dbMatches)
      }
    } catch (error) {}
  }

  useEffect(() => {
    // if currentTournament is not set, and we habe all tournamentes, we set one to show timeCountDown (section 2)
    const isObjectEmpty = currentTournament && Object.keys(currentTournament).length === 0
    const tournamentsHasItems = tournaments?.length > 0

    if (isObjectEmpty && tournamentsHasItems) {
      setCurrentTournament(tournaments[0])
    }
  }, [])

  return (
    <>
      <HeroHome />
      <CountDownSection />
      <TournamentInfo />
      <SponsorsSection />
      <CategoriesSection />
      <InterviewWithStephanieSection />
    </>
  )
}

export default Home