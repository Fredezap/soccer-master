import Blog from '../../common/Blog'
import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import Videos from '../../common/Videos'

const Players = () => {
  const { players } = useHeroDetails()

  return (
    <>
      <Hero title={players.title} content={players.content} />
      <Videos />
      <Blog />
    </>
  )
}

export default Players