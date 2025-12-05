import { useEffect, useRef } from 'react'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import TournamentInfo from '../main/TournamentInfo'
import CountDownSection from './count-down/CountDownSection'
import SponsorsSection from './sponsors/SponsorsSection'
import CategoriesSection from './caregories/CategoriesSection'
import InterviewWithStephanieSection from './interview/InterviewWithStephanieSection'
import Hero from '../../common/hero/Hero'

const Home = () => {
  const { currentTournament, tournaments, setCurrentTournament } = useTournamentsDetails()
  const heroRef = useRef(null)

  useEffect(() => {
    if (heroRef.current) {
      const heroHeight = heroRef.current.offsetHeight
      window.scrollTo({ top: heroHeight, behavior: 'smooth' })
    }
    // if currentTournament is not set, and we habe all tournamentes, we set one to show timeCountDown (section 2)
    const isObjectEmpty = currentTournament && Object.keys(currentTournament).length === 0
    const tournamentsHasItems = tournaments?.length > 0

    if (isObjectEmpty && tournamentsHasItems) {
      setCurrentTournament(tournaments[0])
    }
  }, [])

  return (
    <>
      <Hero ref={heroRef} />
      <CountDownSection />
      <TournamentInfo />
      <SponsorsSection />
      <CategoriesSection />
      <InterviewWithStephanieSection />
    </>
  )
}

export default Home