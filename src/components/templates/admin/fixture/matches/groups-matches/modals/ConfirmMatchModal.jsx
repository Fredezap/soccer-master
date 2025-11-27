import { Modal, Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../../../store/slices/useSubmittingFormStore'
import handleSubmitFormAdmin from '../../../../handleSubmitFormAdmin'
import { useUserStore } from '../../../../../../../store/slices/useUserStore'

const ConfirmMatchModal = ({
  selectedGroup,
  getGroups,
  localTeam,
  visitorTeam,
  showConfirmMatchModal,
  setShowConfirmMatchModal,
  setShowEditGroupMatchModal,
  customError,
  setCustomError,
  locationAndDateformData,
  getStages,
  formAction,
  match,
  matchResult
}) => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const { user } = useUserStore()

  const handleConfirmMatch = async() => {
    const values = {
      groupId: selectedGroup?.groupId,
      localTeamId: localTeam?.teamId,
      visitorTeamId: visitorTeam?.teamId,
      date: locationAndDateformData?.date,
      time: locationAndDateformData.time,
      location: locationAndDateformData?.location,
      stageId: selectedGroup?.Stage?.stageId,
      localTeamScore: matchResult.localTeamScore,
      visitorTeamScore: matchResult.visitorTeamScore,
      localTeamPenaltyScore: matchResult.localTeamPenaltyScore,
      visitorTeamPenaltyScore: matchResult.visitorTeamPenaltyScore,
      matchId: match?.matchId || null
    }

    if (formAction === 'create') {
      const successResponse = 'Match has been created'
      const url = '/admin/fixture/matches/create-group-match'
      const httpMethod = 'post'
      const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod, user })
      setShowConfirmMatchModal(false)
      if (response?.success) {
        getGroups()
        getStages()
      }
      setCustomError(null)
    }

    if (formAction === 'edit') {
      const successResponse = 'Match has been edited'
      const url = '/admin/fixture/matches/edit-group-match'
      const httpMethod = 'post'
      const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod, user })
      setShowConfirmMatchModal(false)
      setShowEditGroupMatchModal(false)
      if (response?.success) {
        getGroups()
        getStages()
      }
      setCustomError(null)
    }
  }

  const handleCloseModal = () => {
    setCustomError(null)
    setShowConfirmMatchModal(false)
  }

  return (
    <Modal
      className="custom-modal"
      size="l"
      show={showConfirmMatchModal}
      onHide={() => handleCloseModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Confirm match</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <h5 style={{ marginBottom: '-20px' }}>{selectedGroup?.name}</h5>
          <p>Are you sure you want to {formAction} this match?</p>
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
            onClick={handleConfirmMatch}
          >
            {formAction} match
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

export default ConfirmMatchModal