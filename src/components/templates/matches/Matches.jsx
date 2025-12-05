import Hero from '../../common/hero/Hero'
import MatchesGrid from './MatchesGrid'
import useHeroDetails from '../../common/hero/useHeroDetails'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import { useEffect, useRef, useState } from 'react'
import { useUserStore } from '../../../store/slices/useUserStore'
import { useMessageStore } from '../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../store/slices/useSubmittingFormStore'
import handleSubmitFormAdmin from '../admin/handleSubmitFormAdmin'
import BracketMatches from '../../templates/home/brackets/BracketMatches'
import TableScores from '../home/table-scores/TableScores'

const Matches = () => {
  const { matches } = useHeroDetails()
  const { currentTournament } = useTournamentsDetails()
  const sectionBg = { bracketsBg: 'bg-dark' }
  const bgColor = 'bg-dark'
  const [dbKnockoutStages, setDbKnockoutStages] = useState([])
  const [dbMatches, setDbMatches] = useState([])
  const { setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()
  const { user } = useUserStore()

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
    const getData = async() => {
      await getMatches()
      await getKnockoutStages()
    }

    getData()
  }, [])

  const heroRef = useRef(null)

  useEffect(() => {
    if (heroRef.current) {
      const heroHeight = heroRef.current.offsetHeight
      window.scrollTo({ top: heroHeight, behavior: 'smooth' })
    }
  }, [currentTournament])

  return (
    <>
      <Hero title={matches.title} ref={heroRef}/>
      <MatchesGrid bgColor={bgColor}/>
      <TableScores backgroundStyle={bgColor} />
      <BracketMatches
        sectionBg={sectionBg}
        dbMatches={dbMatches}
        dbKnockoutStages={dbKnockoutStages}
      />
    </>
  )
}

export default Matches