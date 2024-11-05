import { Modal, Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../store/slices/useSubmittingFormStore'
import handleSubmitFormAdmin from '../../handleSubmitFormAdmin'
import { useTeamStore } from '../../../../../store/slices/useTeamStore'

const CreateTeamModal = ({ showCreateTeamModal, setShowCreateTeamModal, setDbTeams }) => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const { team, setTeam } = useTeamStore()

  const createTeam = async(values) => {
    const successResponse = 'Team has been created'
    const url = '/admin/teams/create'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })

    if (response.success) {
      setDbTeams(response.data.dbTeams)
      setTeam({ name: '', players: [] })
    }

    setShowCreateTeamModal(!showCreateTeamModal)
  }

  return (
    <Modal
      className="custom-modal"
      size="l"
      show={showCreateTeamModal}
      onHide={() => setShowCreateTeamModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          <h2>Create Team</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <p>Are you sure that you want to create this team?</p>
          <Button disabled={submittingForm} variant="outline-info" onClick={() => createTeam(team)}>Create</Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setShowCreateTeamModal(false)} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateTeamModal