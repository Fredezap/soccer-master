import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

const EditGroupName = ({ submittingForm, handleEditGroupName, groupId }) => {
  const [name, setGroupName] = useState('')
  const [customErrorEditName, setCustomErrorEditName] = useState(null)
  const error = 'Group name too short'

  const handleInputChange = (event) => {
    setGroupName(event.target.value)
  }

  const checkValueBeforeEditingGroupName = ({ groupId, name }) => {
    if (!customErrorEditName && name.length >= 2) handleEditGroupName({ groupId, name })
    else setCustomErrorEditName(error)
  }

  useEffect(() => {
    if (name.length < 2 && name.length > 0) setCustomErrorEditName(error)
    if (error && name.length >= 2) setCustomErrorEditName(null)
  }, [name])

  return (
    <div className="modal-box">
      <div className="edit-group-name">
        <p>Edit group name</p>
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter new group name"
        />
        {customErrorEditName && (
          <p className="form-message error-message">{customErrorEditName}</p>
        )}
      </div>

      <Button
        disabled={submittingForm}
        variant="outline-success"
        onClick={() => checkValueBeforeEditingGroupName({ groupId, name })}
      >
        Edit
      </Button>
    </div>
  )
}

export default EditGroupName