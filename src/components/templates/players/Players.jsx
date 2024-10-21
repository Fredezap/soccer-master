import Blog from '../../Blog'
import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import MobileMenu from '../../common/mobile-menu/MobileMenu'
import Videos from '../../Videos'

const Players = () => {
  const { players } = useHeroDetails()

  return (
    <>
      <MobileMenu />
      <Hero title={players.title} content={players.content} />
      <Videos />
      <Blog />
    </>
  )
}

export default Players