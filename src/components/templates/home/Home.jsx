import HeroHome from './HeroHome'
import { useEffect } from 'react'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import TournamentInfo from '../main/TournamentInfo'
import CountDownSection from './count-down/CountDownSection'
import SponsorsSection from './sponsors/SponsorsSection'
import CategoriesSection from './caregories/CategoriesSection'
import InterviewWithStephanieSection from './interview/InterviewWithStephanieSection'

const Home = () => {
  const { currentTournament, tournaments, setCurrentTournament } = useTournamentsDetails()

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