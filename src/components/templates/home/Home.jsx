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
  const { currentTournament } = useTournamentsDetails()
  const { setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()

  const getKnockoutStages = async() => {
    try {
      const url = '/stages/get-all-knockout-stages-by-tournament'
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
      const url = '/matches/get-all'
      const httpMethod = 'post'
      const response = await handleSubmitFormAdmin({ values, url, httpMethod, setSubmittingForm, addMessage })
      if (response?.success) {
        setDbMatches(response.data.dbMatches)
      }
    } catch (error) {}
  }

  useEffect(() => {
    const fetchData = async() => {
      await getKnockoutStages()
      await getMatches()
    }

    fetchData()
  }, [currentTournament])

  const getSectionBg = () => {
    let numberOfExistingSections = 1 // Section matches will always exist

    const videosSectionExist = currentTournament?.Videos > 0
    const bracketsSectionsExist = Object.entries(dbKnockoutStages).length > 0

    if (videosSectionExist || bracketsSectionsExist) numberOfExistingSections = 2
    if (videosSectionExist && bracketsSectionsExist) numberOfExistingSections = 3

    const lightBg = 'bg-light'
    const darkBg = 'bg-dark'

    const sectionsBg = {
      matchesBg: lightBg,
      videosBg: darkBg,
      bracketsBg: lightBg
    }

    if (numberOfExistingSections === 2) {
      sectionsBg.matchesBg = darkBg
      sectionsBg.videosBg = lightBg
      sectionsBg.bracketsBg = lightBg
    }

    return sectionsBg
  }

  const sectionBg = getSectionBg()

  return (
    <>
      <HeroHome />
      {/* <TeamScore /> */}
      {/* <News /> */}
      <NextMatchAndTable sectionBg={sectionBg} dbKnockoutStages={dbKnockoutStages}/>
      <BracketMatches
        sectionBg={sectionBg}
        dbMatches={dbMatches}
        dbKnockoutStages={dbKnockoutStages}
      />
      <Videos sectionBg={sectionBg}/>
      {/* <Blog /> */}
    </>
  )
}

export default Home