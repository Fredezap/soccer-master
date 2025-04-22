import { useEffect, useState } from 'react'
import Hero from '../../../../common/hero/Hero.jsx'
import useHeroDetails from '../../../../common/hero/useHeroDetails.js'
import CreateTeamModal from '../modals/CreateTeamModal.jsx'
import { Button } from 'react-bootstrap'
import handleSubmitFormAdmin from '../../handleSubmitFormAdmin.js'
import { useSubmittingFormStore } from '../../../../../store/slices/useSubmittingFormStore.js'
import { useMessageStore } from '../../../../../store/slices/useMessageStore.js'
import DbTeams from '../db-teams/DbTeams.jsx'
import useHandleConfirmTeam from '../hooks/useHandleConfirmTeam.jsx'
import FormsAndSetTeam from '../common/FormsAndSetTeam.jsx'
import { useTeamStore } from '../../../../../store/slices/useTeamStore.js'
import { useTournamentsDetails } from '../../../../../store/slices/useTournamentsDetails.js'
import SideMenu from '../../side-menu/SideMenu.jsx'

const AdminTeams = () => {
  const { adminTeams } = useHeroDetails()
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false)
  const [showDbTeams, setShowDbTeams] = useState(false)
  const [showAddTeam, setShowAddTeam] = useState(false)
  const [dbTeams, setDbTeams] = useState([])
  const { setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()
  const { confirmTeam } = useHandleConfirmTeam()
  const { setTeam } = useTeamStore()
  const { currentTournament } = useTournamentsDetails()

  const handleConfirmTeam = () => {
    confirmTeam(showCreateTeamModal, setShowCreateTeamModal)
  }

  const getTeams = async() => {
    const values = { tournamentId: currentTournament.tournamentId }
    const url = '/admin/teams/get-by-tournament'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
    if (response?.success) {
      setDbTeams(response.data?.tournament?.Teams)
    }
  }

  useEffect(() => {
    getTeams()
  }, [])

  const handleShowAddTeam = () => {
    setTeam({
      teamId: null,
      name: '',
      players: [],
      logo: {
        reader: null,
        url: null,
        file: null
      }
    })
    setShowAddTeam(!showAddTeam)
  }

  return (
    <div>
      <SideMenu />
      <Hero title={adminTeams.title} />
      <div className="bg-light admin-teams-main">
        <p>SET THE TEAMS HERE</p>
        <div className="show-buttons">
          <Button onClick={() => setShowDbTeams(!showDbTeams)} variant="outline-info">{showDbTeams ? 'Hide teams' : 'show teams'}</Button>
          {showDbTeams && (
            dbTeams.length === 0
              ? (<p>No teams added yet</p>)
              : (
                <div className="db-teams-table">
                  <DbTeams dbTeams={dbTeams} setShowAddTeam={setShowAddTeam} getTeams={getTeams} />
                </div>
              )
          )}
          <Button onClick={() => handleShowAddTeam()} variant="outline-light">{showAddTeam ? 'Hide add team' : 'Add team'}</Button>
          {showAddTeam && (
            <FormsAndSetTeam handleConfirmTeam={handleConfirmTeam}/>
          )}
        </div>
        {showCreateTeamModal && (
          <CreateTeamModal
            showCreateTeamModal={showCreateTeamModal}
            setShowCreateTeamModal={setShowCreateTeamModal}
            dbTeams={dbTeams}
            setDbTeams={setDbTeams}
          />
        )}
      </div>
    </div>
  )
}

export default AdminTeams