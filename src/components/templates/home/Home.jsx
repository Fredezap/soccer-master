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
import InterviewWithStephanie from './interview/InterviewWithStephanie'

const Home = () => {
  const [dbKnockoutStages, setDbKnockoutStages] = useState([])
  const [dbMatches, setDbMatches] = useState([])
  const { currentTournament } = useTournamentsDetails()
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
    const fetchData = async() => {
      console.log('EN FETCH ALL TOURNAMENTS')
      await fetchAllTournaments()
    }

    fetchData()
  }, [])

  return (
    <>
      <HeroHome />
      <CountDownSection />
      <TournamentInfo />
      <SponsorsSection />
      <CategoriesSection />
      <InterviewWithStephanie />
      {/* <TeamScore /> */}
      {/* <News /> */}
      {/* <NextMatchAndTable sectionBg={sectionBg} dbKnockoutStages={dbKnockoutStages}/> */}
      {/* <BracketMatches
        sectionBg={sectionBg}
        dbMatches={dbMatches}
        dbKnockoutStages={dbKnockoutStages}
      /> */}
      <Videos sectionBg={sectionBg}/>
      {/* <Blog /> */}
    </>
  )
}

export default Home