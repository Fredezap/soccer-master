import { Modal, Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../../../store/slices/useSubmittingFormStore'
import handleSubmitFormAdmin from '../../../../handleSubmitFormAdmin'

const DeleteKnockoutMatchModal = ({
  showModalDelete,
  setShowModalDelete,
  getMatches,
  getKnockoutStages,
  match
}) => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()

  const deleteMatch = async() => {
    const values = {
      matchId: match.matchId
    }
    console.log('values en delete', values)
    const successResponse = 'Team has been deleted'
    const url = '/admin/fixture/matches/delete'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      setShowModalDelete(false)
      getMatches()
      getKnockoutStages()
    }
  }

  return (
    <Modal
      className="custom-modal"
      size="l"
      show={showModalDelete}
      onHide={() => setShowModalDelete(false)}
    >
      <Modal.Header>
        <Modal.Title>
          <h2>Delete Match</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <p>Are you sure that you want to delete this match?</p>
          <div>
            <strong style={{ fontWeight: 'bold' }}>Attention Admin:</strong>
            <p>
              Please be cautious when deleting a match.
            </p>
            <p>
              <strong style={{ color: 'red', fontWeight: 'bold' }}>
              Deleting a match will permanently delete all related records
              </strong>
              . This action cannot be undone, and all associated information will be lost.
            </p>
            <p>
              Before proceeding with the deletion, ensure that you no longer need the related
              records or that they are backed up if necessary. Deleting a match may impact
              ongoing processes, historical data, and any references that other parts of the system rely on.
            </p>
          </div>
          <Button disabled={submittingForm} variant="outline-danger" onClick={deleteMatch}>Delete</Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setShowModalDelete(false)} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteKnockoutMatchModal