import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import RulesMainComponent from './RulesMainComponent'

const TournamentInfo = () => {
  const { info } = useHeroDetails()

  return (
    <div>
      <Hero title={info.title} />
      <RulesMainComponent />
    </div>
  )
}

export default TournamentInfo