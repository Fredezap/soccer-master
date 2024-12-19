import { Modal, Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../store/slices/useSubmittingFormStore'
import handleSubmitFormAdmin from '../../handleSubmitFormAdmin'
import { useTeamStore } from '../../../../../store/slices/useTeamStore'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../../store/constants/routes'
import { useTournamentsDetails } from '../../../../../store/slices/useTournamentsDetails'

const UpdateTeamModal = ({ showUpdateTeamModal, setShowUpdateTeamModal }) => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const { team } = useTeamStore()
  const navigate = useNavigate()
  const { currentTournament } = useTournamentsDetails()

  const updateTeam = async(formValues) => {
    const values = { ...formValues, tournamentId: currentTournament.tournamentId }
    const successResponse = 'Team has been updated'
    const url = '/admin/teams/update'
    const httpMethod = 'patch'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    setShowUpdateTeamModal(!showUpdateTeamModal)
    if (response.success) navigate(ROUTES.ADMIN.TEAMS.MAIN)
  }

  return (
    <Modal
      className="custom-modal"
      size="l"
      show={showUpdateTeamModal}
      onHide={() => setShowUpdateTeamModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          <h2>Update Team</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <p>Are you sure that you want to update this team?</p>
          <Button disabled={submittingForm} variant="outline-info" onClick={() => updateTeam(team)}>Update</Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setShowUpdateTeamModal(false)} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateTeamModal