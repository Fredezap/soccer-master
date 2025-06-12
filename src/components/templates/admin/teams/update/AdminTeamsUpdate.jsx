import { useState } from 'react'
import Hero from '../../../../common/hero/Hero'
import useHeroDetails from '../../../../common/hero/useHeroDetails'
import UpdateTeamModal from '../modals/UpdateTeamModal'
import useHandleConfirmTeam from '../hooks/useHandleConfirmTeam'
import { useTeamStore } from '../../../../../store/slices/useTeamStore'
import FormsAndSetTeam from '../common/FormsAndSetTeam'
import SideMenu from '../../side-menu/SideMenu'

const AdminTeamsUpdate = () => {
  const { adminTeamsUpdate } = useHeroDetails()
  const [showUpdateTeamModal, setShowUpdateTeamModal] = useState(false)
  const { confirmTeam } = useHandleConfirmTeam()
  const { team } = useTeamStore()

  const handleConfirmTeam = () => {
    confirmTeam(showUpdateTeamModal, setShowUpdateTeamModal)
  }

  return (
    <div>
      <SideMenu />
      <Hero title={adminTeamsUpdate.title} />
      {team.teamId !== null
        ? (
          <FormsAndSetTeam handleConfirmTeam={handleConfirmTeam}/>
        )
        : (
          <div className="no-team-selected">Not Team founded. Please come back and SELECT a team to edit</div>
        )}
      <UpdateTeamModal
        showUpdateTeamModal={showUpdateTeamModal}
        setShowUpdateTeamModal={setShowUpdateTeamModal}
      />
    </div>
  )
}

export default AdminTeamsUpdate