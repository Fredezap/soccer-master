import { Modal, Button } from 'react-bootstrap'
import { useSubmittingFormStore } from '../../../../../../../store/slices/useSubmittingFormStore'
import { useEffect, useState } from 'react'
import SetMatchResult from '../add-matches/common-forms/SetKnockoutMatchResult'

const SetKnockoutMatchResultModal = ({
  match,
  showSetKnockoutMatchResultModal,
  setShowSetKnockoutMatchResultModal,
  setMatchResult,
  matchResult,
  handleSetKnockoutMatchResult,
  customError
}) => {
  const { submittingForm } = useSubmittingFormStore()
  const [localTeam, setLocalTeam] = useState(null)
  const [visitorTeam, setVisitorTeam] = useState(null)
  const TEAM_STATUS = { KNOWN: 'known', UNKNOWN: 'unknown' }
  const [teamStatus, setTeamStatus] = useState(TEAM_STATUS.UNKNOWN)

  useEffect(() => {
    if (!match) return
    setTeamStatus(!match?.localTeam || !match.visitorTeam ? TEAM_STATUS.UNKNOWN : TEAM_STATUS.KNOWN)
    setLocalTeam(match?.localTeam || null)
    setVisitorTeam(match?.visitorTeam || null)
  }, [match])

  return (
    <Modal
      className="custom-modal"
      size="xl"
      show={showSetKnockoutMatchResultModal}
      onHide={() => setShowSetKnockoutMatchResultModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Edit match</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          {teamStatus === TEAM_STATUS.UNKNOWN
            ? (
              <div>
                <p>Please go to fixture section to set the teams that will play this match to be able to set the result</p>
              </div>
            )
            : (
              <>
                <h5>Set match result here</h5>

                {(localTeam !== null || visitorTeam !== null) && (
                  <div className="team-vs-team">
                    <p>{localTeam?.name ? localTeam.name : null}</p>
                    <p style={{ fontWeight: 'bold' }}>VS</p>
                    <p>{visitorTeam?.name ? visitorTeam.name : null}</p>
                  </div>
                )}

                {localTeam !== null && visitorTeam !== null && (
                  <SetMatchResult
                    localTeam={localTeam}
                    visitorTeam={visitorTeam}
                    matchResult={matchResult}
                    setMatchResult={setMatchResult}
                  />
                )}

                {customError && (
                  <p
                    style={{ margin: '0', marginBottom: '-20px' }}
                    className="form-message error-message same-team-match-error"
                  >
                    {customError}
                  </p>
                )}

                <Button
                  disabled={submittingForm || customError}
                  variant="outline-info"
                  onClick={handleSetKnockoutMatchResult}
                >
                  Set result
                </Button>
              </>
            )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setShowSetKnockoutMatchResultModal(false)} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SetKnockoutMatchResultModal