import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import InscriptionPdf from './InscriptionPdf'
import RulesPdf from './RulesPdf'

const TournamentInfo = () => {
  const { info } = useHeroDetails()

  return (
    <div>
      <Hero title={info.title} />
      <RulesPdf />
      <InscriptionPdf />
    </div>
  )
}

export default TournamentInfo