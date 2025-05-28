import { Modal, Button } from 'react-bootstrap'
import SetGroupMatchResult from '../../brackets-matches/add-matches/common-forms/SetGroupMatchResult'

const SetGroupMatchScoreModal = ({
  showSetScoreGroupMatchModal,
  setShowSetScoreGroupMatchModal,
  matchResult,
  setMatchResult,
  customError,
  handleConfirmScore,
  localTeam,
  visitorTeam
}) => {
  return (
    <Modal
      className="custom-modal"
      size="l"
      show={showSetScoreGroupMatchModal}
      onHide={() => setShowSetScoreGroupMatchModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          <h2>Set Match Results</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <SetGroupMatchResult
            localTeam={localTeam}
            visitorTeam={visitorTeam}
            matchResult={matchResult}
            setMatchResult={setMatchResult}
          />
        </div>
      </Modal.Body>
      <div className="confirm-button">
        <Button
          disabled={customError}
          variant="outline-success"
          onClick={() => handleConfirmScore()}
        >
        Set result
        </Button>
        {customError && (
          <p className="form-message error-message">{customError}</p>
        )}
      </div>
      <Modal.Footer style={{ marginTop: '30px' }}>
        <Button onClick={() => setShowSetScoreGroupMatchModal(false)} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SetGroupMatchScoreModal