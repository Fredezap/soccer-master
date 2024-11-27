import { Modal, Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../../../store/slices/useSubmittingFormStore'
import handleSubmitFormAdmin from '../../../../handleSubmitFormAdmin'

const CreateMatchModal = ({
  selectedGroup,
  getGroups,
  localTeam,
  visitorTeam,
  showCreateMatchModal,
  setShowCreateMatchModal,
  customError,
  setCustomError,
  locationAndDateformData,
  getStages
}) => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()

  const handleCreateMatch = async() => {
    const values = {
      groupId: selectedGroup?.groupId,
      localTeamId: localTeam?.teamId,
      visitorTeamId: visitorTeam?.teamId,
      date: locationAndDateformData?.date,
      time: locationAndDateformData.time,
      location: locationAndDateformData?.location,
      stageId: selectedGroup?.Stage?.stageId
    }

    const successResponse = 'Match has been created'
    const url = '/admin/fixture/matches/create'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    setShowCreateMatchModal(false)
    if (response?.success) {
      getGroups()
      getStages()
    }
    setCustomError(null)
  }

  const handleCloseModal = () => {
    setCustomError(null)
    setShowCreateMatchModal(false)
  }

  return (
    <Modal
      className="custom-modal"
      size="l"
      show={showCreateMatchModal}
      onHide={() => handleCloseModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Create match</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <h5 style={{ marginBottom: '-20px' }}>{selectedGroup?.name}</h5>
          <p>Are you sure you want to create this match?</p>
          <div className="team-vs-team">
            <p>{localTeam?.name}</p>
            <p style={{ fontWeight: 'bold' }}>VS</p>
            <p>{visitorTeam?.name}</p>
          </div>
          {customError && (
            <h5 className="form-message error-message same-team-match-error">{customError}</h5>
          )}
          <Button
            disabled={submittingForm}
            variant="outline-info"
            onClick={handleCreateMatch}
          >
            Create match
          </Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => handleCloseModal()} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateMatchModal