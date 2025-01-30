import Blog from '../../common/Blog'
import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import Videos from '../../common/Videos'

const Teams = () => {
  const { players } = useHeroDetails()

  return (
    <>
      <Hero title={players.title} />
      <div className="no-info-founded bg-dark">
        <span>No teams founded</span>
      </div>
      {/* <Videos /> */}
      {/* <Blog /> */}
    </>
  )
}

export default Teams