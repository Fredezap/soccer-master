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

  const handleConfirmTeam = () => {
    confirmTeam(showCreateTeamModal, setShowCreateTeamModal)
  }

  const getTeams = async(values) => {
    const url = '/admin/teams/get-all'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
    if (response?.success) {
      setDbTeams(response.data.dbTeams)
    }
  }

  const deleteTeam = async(values) => {
    const successResponse = 'Team has been deleted'
    const url = '/admin/teams/delete'
    const httpMethod = 'post'
    await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    getTeams()
  }

  useEffect(() => {
    getTeams()
  }, [])

  const handleShowAddTeam = () => {
    setTeam({
      teamId: null,
      name: '',
      players: []
    })
    setShowAddTeam(!showAddTeam)
  }

  return (
    <div>
      <Hero title={adminTeams.title} content={adminTeams.content} />
      <div className="admin-teams-main">
        <p>SET THE TEAMS HERE</p>
        <div className="show-buttons">
          <Button onClick={() => setShowDbTeams(!showDbTeams)} variant="outline-info">{showDbTeams ? 'Hide teams' : 'show teams'}</Button>
          {showDbTeams && (
            dbTeams.length === 0
              ? (<p>No teams added yet</p>)
              : (
                <div className="db-teams-table">
                  <DbTeams dbTeams={dbTeams} deleteTeam={deleteTeam} setShowAddTeam={setShowAddTeam} showAddTeam={showAddTeam} />
                </div>
              )
          )}
          <Button onClick={() => handleShowAddTeam()} variant="outline-light">{showAddTeam ? 'Hide add team' : 'Add team'}</Button>
          {showAddTeam && (
            <FormsAndSetTeam handleConfirmTeam={handleConfirmTeam}/>
          )}
        </div>
        <CreateTeamModal
          showCreateTeamModal={showCreateTeamModal}
          setShowCreateTeamModal={setShowCreateTeamModal}
          dbTeams={dbTeams}
          setDbTeams={setDbTeams}
        />
      </div>
    </div>
  )
}

export default AdminTeams