import TeamScore from '../../TeamScore'
import News from '../../News'
import NextMatchAndTable from '../../NextMatchAndTable'
import Videos from '../../Videos'
import Blog from '../../Blog'
import MobileMenu from '../../common/mobile-menu/MobileMenu'
import HeroHome from './HeroHome'

const Home = () => {
  return (
    <>
      <MobileMenu />
      <HeroHome />
      <TeamScore />
      <News />
      <NextMatchAndTable />
      <Videos />
      <Blog />
    </>
  )
}

export default Home