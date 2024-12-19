import { Button, Modal } from 'react-bootstrap'
import { useSubmittingFormStore } from '../../../../../../store/slices/useSubmittingFormStore'
import handleSubmitFormAdmin from '../../../handleSubmitFormAdmin'
import { useMessageStore } from '../../../../../../store/slices/useMessageStore'

const DeleteTeamFromGroupWarningModal = ({
  showDeleteTeamFromGroupModal,
  setShowDeleteTeamFromGroupModal,
  groupId,
  teamId,
  getData
}) => {
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()

  const handleDeleteTeamFromGroup = async({ teamId, groupId }) => {
    const values = { teamId, groupId }
    const successResponse = 'Team has been deleted from the group'
    const url = '/admin/fixture/groups/delete-team-group'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      setShowDeleteTeamFromGroupModal(false)
      getData()
    }
  }

  return (
    <Modal
      className="custom-modal"
      size="xl"
      show={showDeleteTeamFromGroupModal}
      onHide={() => setShowDeleteTeamFromGroupModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          <h2>Delete or edit group</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <p>Are you sure that you want to delete this team from this group?</p>
          <div>
            <strong style={{ fontWeight: 'bold' }}>Attention Admin:</strong>
            <p>
          Please be cautious when deleting a team from a group.
            </p>
            <p>
              <strong style={{ color: 'red', fontWeight: 'bold' }}>
            Deleting a team already in a group will permanently delete all related records
              </strong>
            </p>
            <p>
            Before proceeding with the deletion, ensure that you no longer need the related
            records or that they are backed up if necessary. Deleting a team may impact
            ongoing processes, historical data, and any references that other parts of the system rely on.
            </p>
          </div>
          <Button disabled={submittingForm} variant="outline-danger" onClick={() => handleDeleteTeamFromGroup({ teamId, groupId })}>
          Delete
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShowDeleteTeamFromGroupModal(false)} variant="secondary">
        Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteTeamFromGroupWarningModal