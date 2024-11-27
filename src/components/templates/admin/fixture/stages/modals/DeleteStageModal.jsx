import { Modal, Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../../store/slices/useSubmittingFormStore'
import handleSubmitFormAdmin from '../../../handleSubmitFormAdmin'

const DeleteStageModal = ({ showDeleteStageModal, setShowDeleteStageModal, stageId, getStages }) => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()

  const deleteStage = async(values) => {
    const successResponse = 'Stage has been deleted'
    const url = '/admin/fixture/stages/delete'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      setShowDeleteStageModal(false)
      getStages()
    }
  }

  return (
    <Modal
      className="custom-modal"
      size="l"
      show={showDeleteStageModal}
      onHide={() => setShowDeleteStageModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          <h2>Delete Stage</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <p>Are you sure that you want to delete this stage?</p>
          <div>
            <strong style={{ fontWeight: 'bold' }}>Attention Admin:</strong>
            <p>
              Please be cautious when deleting a stage.
            </p>
            <p>
              <strong style={{ color: 'red', fontWeight: 'bold' }}>
              Deleting a stage will permanently delete all related records
              </strong>

              , including group names, matches, and any other data linked to that stage.
              This action cannot be undone, and all associated information will be lost.
            </p>
            <p>
              Before proceeding with the deletion, ensure that you no longer need the related
              records or that they are backed up if necessary. Deleting a stage may impact
              ongoing processes, historical data, and any references that other parts of the system rely on.
            </p>
          </div>
          <Button disabled={submittingForm} variant="outline-danger" onClick={() => deleteStage({ stageId })}>Delete</Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setShowDeleteStageModal(false)} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteStageModal