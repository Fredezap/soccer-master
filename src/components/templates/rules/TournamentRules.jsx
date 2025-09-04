import { FaFilePdf } from 'react-icons/fa'
import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import SideMenu from '../admin/side-menu/SideMenu'

const TournamentRules = () => {
  const { rules } = useHeroDetails()

  return (
    <div>
      <SideMenu />
      <Hero title={rules.title} />
      <div className="rules-main">
        <a
          href="/tournament-rules/Weisungen_Junioren_Swiss_Futsal.pdf"
          download
        >
          <FaFilePdf className="text-xl" />
            Download rules
        </a>
      </div>
    </div>
  )
}

export default TournamentRules