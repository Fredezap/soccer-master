import Hero from '../../../common/hero/Hero'
import useHeroDetails from '../../../common/hero/useHeroDetails'
import SideMenu from '../side-menu/SideMenu'
import TournamentDetailsForm from './TournamentDetailsForm'

const AdminTournamentDetails = () => {
  const { adminTournamentDetails } = useHeroDetails()

  return (
    <div>
      <SideMenu />
      <Hero title={adminTournamentDetails.title} />
      <div>
        <div className="bg-light admin-tournament-set-conent">
          <p>SET THE TOURNAMENT DETAILS HERE</p>
          <TournamentDetailsForm />
        </div>
      </div>
    </div>
  )
}

export default AdminTournamentDetails