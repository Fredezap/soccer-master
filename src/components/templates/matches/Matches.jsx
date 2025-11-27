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
  const videoSectionExist = currentTournament?.Videos?.length > 0
  const sectionBg = { videosBg: 'bg-light' }
  const bgColor = videoSectionExist ? 'bg-dark' : 'bg-light'

  return (
    <>
      <Hero title={matches.title} />
      {/* <TeamScore /> */}
      <MatchesGrid bgColor={bgColor}/>
      {videoSectionExist && (<Videos sectionBg={sectionBg} />)}
      {/* <Blog /> */}
    </>
  )
}

export default Matches