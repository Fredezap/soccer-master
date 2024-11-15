import { Modal, Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../../store/slices/useSubmittingFormStore'
import handleSubmitFormAdmin from '../../../handleSubmitFormAdmin'
import { MdDeleteForever } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'
import { useState } from 'react'
import DeleteGroupWarning from './DeleteGroupWarning'
import EditGroupName from './EditGroupName'

const DeleteOrEditGroupModal = ({ showDeleteGroupModal, setShowDeleteGroupModal, groupId, getData }) => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const [showDeleteGroupWarning, setShowDeleteGroupWarning] = useState(false)
  const [showEditGroupName, setShowEditGroupName] = useState(false)

  const handleEditGroupName = async({ groupId, name }) => {
    const values = { groupId, name }
    const successResponse = 'Group name has been updated'
    const url = '/admin/fixture/groups/update-group-name'
    const httpMethod = 'patch'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      setShowDeleteGroupModal(false)
      getData()
    }
  }

  const handleDeleteGroup = async({ groupId }) => {
    const values = { groupId }
    const successResponse = 'Group has been deleted'
    const url = '/admin/fixture/groups/delete'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      setShowDeleteGroupModal(false)
      getData()
    }
  }

  const handleShowDeleteWarning = () => {
    setShowEditGroupName(false)
    setShowDeleteGroupWarning(!showDeleteGroupWarning)
  }

  const handleShowEditGroupName = () => {
    setShowDeleteGroupWarning(false)
    setShowEditGroupName(!showEditGroupName)
  }

  return (
    <Modal
      className="custom-modal"
      size="xl"
      show={showDeleteGroupModal}
      onHide={() => setShowDeleteGroupModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          <h2>Delete or edit group</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <p>Please select the action you want to do</p>
          <div className="buttons-box">
            <div className="delete-icon-team" onClick={() => handleShowDeleteWarning()}>
              <MdDeleteForever />
              <p>Delete</p>
            </div>
            <div className="edit-icon-team" onClick={() => handleShowEditGroupName()}>
              <CiEdit />
              <p>Edit</p>
            </div>
          </div>
          {showDeleteGroupWarning && (
            <DeleteGroupWarning
              submittingForm={submittingForm}
              handleDeleteGroup={handleDeleteGroup}
              groupId={groupId}
            />
          )}
          {showEditGroupName && (
            <EditGroupName
              submittingForm={submittingForm}
              handleEditGroupName={handleEditGroupName}
              groupId={groupId}
            />
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setShowDeleteGroupModal(false)} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteOrEditGroupModal