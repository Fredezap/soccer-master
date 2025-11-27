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
      <hr
        style={{
          border: 'none',
          height: '1px',
          backgroundColor: '#fff',
          width: '95%', // ancho de la línea
          margin: '20px auto' // auto en los lados centra horizontalmente
        }}
      />
      <InscriptionPdf />
    </div>
  )
}

export default TournamentInfo