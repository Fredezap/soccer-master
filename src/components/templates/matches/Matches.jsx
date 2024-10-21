import Blog from '../../Blog'
import MobileMenu from '../../common/mobile-menu/MobileMenu'
import Hero from '../../common/hero/Hero'
import TeamScore from '../../TeamScore'
import Videos from '../../Videos'
import MatchesGrid from './MatchesGrid'
import useHeroDetails from '../../common/hero/useHeroDetails'

const Matches = () => {
  const { matches } = useHeroDetails()

  return (
    <>
      <Hero title={matches.title} content={matches.content} />
      <TeamScore />
      <MatchesGrid />
      <Videos />
      <Blog />
    </>
  )
}

export default Matches