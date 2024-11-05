import AddedTeamDetails from '../added-team-details/AddedTeamDetails'
import CreateTeamNameForm from '../forms/CreateTeamNameForm'
import CreateTeamPlayerForm from '../forms/CreateTeamPlayerForm'

const FormsAndSetTeam = ({ handleConfirmTeam }) => {
  return (
    <div className="admin-teams">
      <div className="admin-teams-set-conent">
        <CreateTeamNameForm />
        <CreateTeamPlayerForm />
      </div>
      <AddedTeamDetails handleConfirmTeam={handleConfirmTeam} />
    </div>
  )
}

export default FormsAndSetTeam