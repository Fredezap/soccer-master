import TeamScore from '../../common/TeamScore'
import News from './News'
import NextMatchAndTable from './table-scores/NextMatchAndTable'
import Videos from '../../common/Videos'
import Blog from '../../common/Blog'
import HeroHome from './HeroHome'
import { useEffect, useState } from 'react'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import handleSubmitFormAdmin from '../admin/handleSubmitFormAdmin'
import { useSubmittingFormStore } from '../../../store/slices/useSubmittingFormStore'
import { useMessageStore } from '../../../store/slices/useMessageStore'
import BracketMatches from './brackets/BracketMatches'

const Home = () => {
  const [dbKnockoutStages, setDbKnockoutStages] = useState([])
  const [dbMatches, setDbMatches] = useState([])
  const [dbTeams, setDbTeams] = useState([])
  const { currentTournament } = useTournamentsDetails()
  const { setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()

  const getKnockoutStages = async() => {
    try {
      const url = '/admin/fixture/stages/get-all-knockout-stages-by-tournament'
      const httpMethod = 'post'
      const values = { tournamentId: currentTournament.tournamentId }
      const response = await handleSubmitFormAdmin({ values, url, httpMethod, setSubmittingForm, addMessage })
      if (response?.success) {
        setDbKnockoutStages(response.data.dbKnockoutStages)
      }
    } catch (error) {}
  }

  const getMatches = async(values) => {
    try {
      const url = '/admin/fixture/matches/get-all'
      const httpMethod = 'post'
      const response = await handleSubmitFormAdmin({ values, url, httpMethod, setSubmittingForm, addMessage })
      if (response?.success) {
        setDbMatches(response.data.dbMatches)
      }
    } catch (error) {}
  }

  const getTeams = async() => {
    try {
      const values = { tournamentId: currentTournament.tournamentId }
      const url = '/admin/teams/get-by-tournament'
      const httpMethod = 'post'
      const response = await handleSubmitFormAdmin({ values, url, httpMethod, setSubmittingForm, addMessage })
      if (response?.success) {
        setDbTeams(response.data?.tournament?.Teams)
      }
    } catch (error) { console.error('error getTeams: ', error) }
  }

  useEffect(() => {
    const fetchData = async() => {
      await getKnockoutStages()
      await getMatches()
      await getTeams()
    }

    fetchData()
  }, [currentTournament])

  return (
    <>
      <HeroHome />
      {/* <TeamScore /> */}
      {/* <News /> */}
      <NextMatchAndTable dbKnockoutStages={dbKnockoutStages}/>
      <BracketMatches
        dbTeams={dbTeams}
        dbMatches={dbMatches}
        dbKnockoutStages={dbKnockoutStages}
      />
      {/* <Videos /> */}
      {/* <Blog /> */}
    </>
  )
}

export default Home