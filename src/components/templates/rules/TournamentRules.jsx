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
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <FaFilePdf className="text-xl" />
            Download rules
        </a>
      </div>
    </div>
  )
}

export default TournamentRules