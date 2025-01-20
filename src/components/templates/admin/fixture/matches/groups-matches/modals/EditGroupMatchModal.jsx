import { Modal, Button } from 'react-bootstrap'
import AddGroupMatchesForm from '../AddGroupMatchesForm'

const EditGroupMatchModal = ({
  showEditGroupMatchModal,
  setShowEditGroupMatchModal,
  selectedGroup,
  dbGroups,
  showGroupMatchesDetail,
  handleGroupChange,
  teamChange,
  locationAndDateformData,
  setLocationAndDateformData,
  setCustomError,
  customError,
  handleConfirmGroupMatch,
  formAction,
  localTeam,
  visitorTeam
}) => {
  return (
    <Modal
      className="custom-modal"
      size="l"
      show={showEditGroupMatchModal}
      onHide={() => setShowEditGroupMatchModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          <h2>Edit Match</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <AddGroupMatchesForm
            selectedGroup={selectedGroup}
            dbGroups={dbGroups}
            showGroupMatchesDetail={showGroupMatchesDetail}
            handleGroupChange={handleGroupChange}
            teamChange={teamChange}
            locationAndDateformData={locationAndDateformData}
            setLocationAndDateformData={setLocationAndDateformData}
            setCustomError={setCustomError}
            customError={customError}
            handleConfirmGroupMatch={handleConfirmGroupMatch}
            formAction={formAction}
            localTeam={localTeam}
            visitorTeam={visitorTeam}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setShowEditGroupMatchModal(false)} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditGroupMatchModal