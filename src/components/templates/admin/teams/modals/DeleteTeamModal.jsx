import { Modal, Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../store/slices/useSubmittingFormStore'
import handleSubmitFormAdmin from '../../handleSubmitFormAdmin'

const DeleteTeamModal = ({ showDeleteTeamModal, setShowDeleteTeamModal, teamId, getTeams }) => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  console.log('en modal delete', teamId)
  const deleteTeam = async(values) => {
    const successResponse = 'Team has been deleted'
    const url = '/admin/teams/delete'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      setShowDeleteTeamModal(false)
      getTeams()
    }
  }

  return (
    <Modal
      className="custom-modal"
      size="l"
      show={showDeleteTeamModal}
      onHide={() => setShowDeleteTeamModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          <h2>Delete Team</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <p>Are you sure that you want to delete this team?</p>
          <Button disabled={submittingForm} variant="outline-danger" onClick={() => deleteTeam(teamId)}>Delete</Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setShowDeleteTeamModal(false)} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteTeamModal