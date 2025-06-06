import { Modal, Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../store/slices/useSubmittingFormStore'
import handleSubmitFormAdmin from '../../handleSubmitFormAdmin'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../../store/constants/routes'

const DeleteTournamentModal = ({ showDeleteTournamentModal, setShowDeleteTournamentModal, selectedTournament }) => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const navigate = useNavigate()

  const deleteTournament = async(tournamentId) => {
    const successResponse = 'Tournament has been deleted'
    const url = '/admin/tournament-details/delete'
    const httpMethod = 'post'
    const values = { tournamentId }

    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      setShowDeleteTournamentModal(false)
      navigate(ROUTES.ADMIN.MAIN)
    }
  }

  return (
    <Modal
      className="custom-modal"
      size="l"
      show={showDeleteTournamentModal}
      onHide={() => setShowDeleteTournamentModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          <h2>Delete Team</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <p>Are you sure that you want to delete this tournament?</p>
          <p>{selectedTournament?.name || null }</p>
          <div>
            <strong style={{ fontWeight: 'bold' }}>Attention Admin:</strong>
            <p>
              Please be cautious when deleting a tournament.
            </p>
            <p>
              <strong style={{ color: 'red', fontWeight: 'bold' }}>
              Deleting a tournament will permanently delete all related records
              </strong>
              , including players, related matches, and any other data linked to that tournament.
              This action cannot be undone, and all associated information will be lost.
            </p>
            <p>
              Before proceeding with the deletion, ensure that you no longer need the related
              records or that they are backed up if necessary. Deleting a stage may impact
              ongoing processes, historical data, and any references that other parts of the system rely on.
            </p>
          </div>
          <Button disabled={submittingForm} variant="outline-danger" onClick={() => deleteTournament(selectedTournament.tournamentId)}>Delete</Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setShowDeleteTournamentModal(false)} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteTournamentModal