import Blog from '../../common/Blog'
import Hero from '../../common/hero/Hero'
import TeamScore from '../../common/TeamScore'
import Videos from '../../common/Videos'
import MatchesGrid from './MatchesGrid'
import useHeroDetails from '../../common/hero/useHeroDetails'

const Matches = () => {
  const { matches } = useHeroDetails()

  return (
    <>
      <Hero title={matches.title} />
      <TeamScore />
      <MatchesGrid />
      <Videos />
      <Blog />
    </>
  )
}

export default Matches