import Blog from '../../common/Blog'
import Hero from '../../common/hero/Hero'
import TeamScore from '../../common/TeamScore'
import Videos from '../../common/Videos'
import MatchesGrid from './MatchesGrid'
import useHeroDetails from '../../common/hero/useHeroDetails'
import getSectionBg from '../../common/section-styles/getSectionBg'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'

const Matches = () => {
  const { matches } = useHeroDetails()
  const { currentTournament } = useTournamentsDetails()
  const dbKnockoutStages = null

  const sectionBg = getSectionBg(currentTournament, dbKnockoutStages)
  return (
    <>
      <Hero title={matches.title} />
      {/* <TeamScore /> */}
      <MatchesGrid />
      <Videos sectionBg={sectionBg} />
      {/* <Blog /> */}
    </>
  )
}

export default Matches