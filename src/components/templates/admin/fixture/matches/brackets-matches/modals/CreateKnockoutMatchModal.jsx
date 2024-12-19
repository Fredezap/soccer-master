import { Modal, Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../../../store/slices/useSubmittingFormStore'
import handleSubmitFormAdmin from '../../../../handleSubmitFormAdmin'

const CreateKnockoutMatchModal = ({
  TEAM_STATUS,
  teamStatus,
  getMatches,
  selectedStage,
  localTeam,
  visitorTeam,
  showCreateKnockoutMatchModal,
  setShowCreateKnockoutMatchModal,
  customError,
  setCustomError,
  locationAndDateformData,
  getKnockoutStages,
  localTeamPlaceholder,
  visitorTeamPlaceholder
}) => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()

  const handleCreateMatch = async() => {
    const values = {
      stageId: selectedStage?.stageId,
      localTeamId: localTeam?.teamId,
      visitorTeamId: visitorTeam?.teamId,
      localTeamPlaceholder,
      visitorTeamPlaceholder,
      date: locationAndDateformData?.date,
      time: locationAndDateformData.time,
      location: locationAndDateformData?.location
    }

    const successResponse = 'Match has been created'
    let url
    if (teamStatus === TEAM_STATUS.KNOWN) {
      url = '/admin/fixture/matches/create-knockout-match-known-teams'
    } else if (teamStatus === TEAM_STATUS.UNKNOWN) {
      url = '/admin/fixture/matches/create-knockout-match-unknown-teams'
    } else {
      return
    }
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })

    if (response?.success) {
      setShowCreateKnockoutMatchModal(false)
      getKnockoutStages()
      getMatches()
      setCustomError(null)
    }
  }

  const handleCloseModal = () => {
    setCustomError(null)
    setShowCreateKnockoutMatchModal(false)
  }

  return (
    <Modal
      className="custom-modal"
      size="l"
      show={showCreateKnockoutMatchModal}
      onHide={() => handleCloseModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Create match</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <h5 style={{ marginBottom: '-20px' }}>{selectedStage?.name}</h5>
          <p>Are you sure you want to create this match?</p>
          <div className="team-vs-team">
            <p>{localTeam?.name ? localTeam.name : localTeamPlaceholder || null}</p>
            <p style={{ fontWeight: 'bold' }}>VS</p>
            <p>{visitorTeam?.name ? visitorTeam.name : visitorTeamPlaceholder || null}</p>
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

export default CreateKnockoutMatchModal