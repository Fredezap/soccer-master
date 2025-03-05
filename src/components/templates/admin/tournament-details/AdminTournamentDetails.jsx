import Hero from '../../../common/hero/Hero'
import useHeroDetails from '../../../common/hero/useHeroDetails'
import TournamentDetailsForm from './TournamentDetailsForm'

const AdminTournamentDetails = () => {
  const { adminTournamentDetails } = useHeroDetails()

  return (
    <div>
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