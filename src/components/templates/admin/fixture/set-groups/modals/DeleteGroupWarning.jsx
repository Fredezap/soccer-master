import { Button } from 'react-bootstrap'

const DeleteGroupWarning = ({ submittingForm, handleDeleteGroup, groupId }) => {
  return (
    <div className="modal-box">
      <p>Are you sure that you want to delete this group?</p>
      <div>
        <strong style={{ fontWeight: 'bold' }}>Attention Admin:</strong>
        <p>
          Please be cautious when deleting a group.
        </p>
        <p>
          <strong style={{ color: 'red', fontWeight: 'bold' }}>
            Deleting a group will permanently delete all related records
          </strong>
        </p>
        <p>
            Before proceeding with the deletion, ensure that you no longer need the related
            records or that they are backed up if necessary. Deleting a group may impact
            ongoing processes, historical data, and any references that other parts of the system rely on.
        </p>
      </div>
      <Button disabled={submittingForm} variant="outline-danger" onClick={() => handleDeleteGroup({ groupId })}>
        Delete
      </Button>
    </div>
  )
}

export default DeleteGroupWarning