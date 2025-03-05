import { Modal, Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../../store/slices/useSubmittingFormStore'
import { useState } from 'react'
import handleSubmitFormAdmin from '../../../handleSubmitFormAdmin'

const SetStagePointsModal = ({ showSetStagePointsModal, setShowSetStagePointsModal, stageId, getData }) => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const [pointsPerResult, setPointsPerResult] = useState({
    wonPoints: null,
    drawnPoints: null,
    lostPoints: null
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handleSetStagePoints = async(stageId) => {
    if (Object.values(pointsPerResult).some(points => points === null)) {
      setErrorMessage('All fields must have a value. Please fill in all points.')
      return
    } else {
      setErrorMessage('')
    }

    const values = { stageId, pointsPerResult }
    const successResponse = 'Stage has been edited'
    const url = '/admin/fixture/stages/edit'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      setShowSetStagePointsModal(false)
      getData()
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const parsedValue = parseInt(value)

    setPointsPerResult({
      ...pointsPerResult,
      [name]: isNaN(parsedValue) ? null : parsedValue
    })
  }

  return (
    <Modal
      className="custom-modal"
      size="xl"
      show={showSetStagePointsModal}
      onHide={() => setShowSetStagePointsModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          <h2>Set points per match for this group stage</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <p>
            Please set how many points every team will receive for each match depending on the result.
            For example:
          <br />
            - 3 points for a win,
          <br />
            - 1 point for a draw,
          <br />
            - 0 points for a loss.
        </p>
        <div className="form-input-box">
          <div className="grid-colums set-points">
            <label htmlFor="wonPoints">Won points:</label>
            <input
              type="number"
              id="wonPoints"
              name="wonPoints"
              value={pointsPerResult.wonPoints !== null ? pointsPerResult.wonPoints : ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid-colums set-points">
            <label htmlFor="drawnPoints">Drawn points:</label>
            <input
              type="number"
              id="drawnPoints"
              name="drawnPoints"
              value={pointsPerResult.drawnPoints !== null ? pointsPerResult.drawnPoints : ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid-colums set-points">
            <label htmlFor="lostPoints">Lost points:</label>
            <input
              type="number"
              id="lostPoints"
              name="lostPoints"
              value={pointsPerResult.lostPoints !== null ? pointsPerResult.lostPoints : ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}

        <div className="modal-box">
          <div className="buttons-box">
            <div style={{ marginTop: '30px' }} onClick={() => handleSetStagePoints(stageId)}>
              <Button disabled={submittingForm} variant="white">Set points</Button>
            </div>
          </div>
        </div>
        <p style={{ marginTop: '20px' }}>
          <strong style={{ fontWeight: 'bold' }} className="error-message">Attention: </strong>
        If you have already set the points per match, please note that if previous matches have been calculated, they will remain with the previously set values. The new points will only apply to matches played after the changes are made.
        Important: It is not recommended to modify these values a second time, as the tournament should adhere to the initial values without being altered throughout the process. Making repeated modifications can affect the integrity of previous results.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setShowSetStagePointsModal(false)} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SetStagePointsModal