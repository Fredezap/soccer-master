import { useEffect, useRef } from 'react'
import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import RulesMainComponent from './RulesMainComponent'

const TournamentInfo = () => {
  const { info } = useHeroDetails()
  const heroRef = useRef(null)

  useEffect(() => {
    if (heroRef.current) {
      const heroHeight = heroRef.current.offsetHeight
      window.scrollTo({ top: heroHeight, behavior: 'smooth' })
    }
  }, [])

  return (
    <div>
      <Hero title={info.title} ref={heroRef}/>
      <RulesMainComponent />
    </div>
  )
}

export default TournamentInfo