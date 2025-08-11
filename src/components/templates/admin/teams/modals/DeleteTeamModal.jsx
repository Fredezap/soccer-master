import { Modal, Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../store/slices/useSubmittingFormStore'
import handleSubmitFormAdmin from '../../handleSubmitFormAdmin'
import { useUserStore } from '../../../../../store/slices/useUserStore'

const DeleteTeamModal = ({ showDeleteTeamModal, setShowDeleteTeamModal, teamId, getTeams }) => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const { user } = useUserStore()

  const deleteTeam = async(values) => {
    const successResponse = 'Team has been deleted'
    const url = '/admin/teams/delete'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod, user })
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
          <div>
            <strong style={{ fontWeight: 'bold' }}>Attention Admin:</strong>
            <p>
              Please be cautious when deleting a team.
            </p>
            <p>
              <strong style={{ color: 'red', fontWeight: 'bold' }}>
              Deleting a team will permanently delete all related records
              </strong>
              , including players, related matches, and any other data linked to that team.
              This action cannot be undone, and all associated information will be lost.
            </p>
            <p>
              Before proceeding with the deletion, ensure that you no longer need the related
              records or that they are backed up if necessary. Deleting a stage may impact
              ongoing processes, historical data, and any references that other parts of the system rely on.
            </p>
          </div>
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