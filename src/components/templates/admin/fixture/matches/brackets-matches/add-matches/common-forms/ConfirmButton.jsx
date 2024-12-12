import { Button } from 'react-bootstrap'

const ConfirmButton = ({ handleShowConfirmModal, customError }) => {
  return (
    <div className="confirm-button">
      <Button onClick={handleShowConfirmModal} disabled={customError} variant="outline-success">
        Confirm
      </Button>
      {customError && (
        <p className="form-message error-message">{customError}</p>
      )}
    </div>
  )
}

export default ConfirmButton