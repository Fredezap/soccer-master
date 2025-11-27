import { Modal, Button, Form } from 'react-bootstrap'
import { useMessageStore } from '../../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../../store/slices/useSubmittingFormStore'
import { useTeamStore } from '../../../../../../store/slices/useTeamStore'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import handleSubmitFormAdmin from '../../../handleSubmitFormAdmin'
import ROUTES from '../../../../../../store/constants/routes'
import { useUserStore } from '../../../../../../store/slices/useUserStore'

const UpdateGroupTeamModal = ({
  showUpdateGroupTeamModal,
  setShowUpdateGroupTeamModal,
  availableTeams,
  getData,
  selectedGroup
}) => {
  const navigate = useNavigate()
  const [selectedTeamIds, setSelectedTeamIds] = useState([])
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const [noneTeamSelectedError, setNoneTeamSelectedError] = useState(false)
  const { user } = useUserStore()

  const handleCheckboxChange = (teamId) => {
    setSelectedTeamIds(prevSelected =>
      prevSelected.includes(teamId)
        ? prevSelected.filter(id => id !== teamId)
        : [...prevSelected, teamId]
    )
  }

  useEffect(() => {
    if (selectedTeamIds.length > 0) setNoneTeamSelectedError(false)
  }, [selectedTeamIds])

  const updateTeamGroups = async() => {
    const values = { groupId: selectedGroup.groupId, stageId: selectedGroup.stageId, selectedTeamIds }
    const selectedTeamsError = 'You must select at least one team'

    if (values.selectedTeamIds.length === 0) return setNoneTeamSelectedError(selectedTeamsError)
    const successResponse = 'Group has been updated'
    const url = '/admin/fixture/groups/update'
    const httpMethod = 'patch'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod, user })
    setShowUpdateGroupTeamModal(false)

    if (response?.success) {
      getData()
      setSelectedTeamIds([])
    }
  }

  return (
    <Modal
      className="custom-modal"
      size="l"
      show={showUpdateGroupTeamModal}
      onHide={() => setShowUpdateGroupTeamModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Update Team</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <h5 style={{ marginBottom: '-20px' }}>{selectedGroup?.name}</h5>
          <Form className="team-groups-form">
            {availableTeams?.length === 0
              ? (
                <div className="no-teams-to-show">
                  <p>No teams availabe at the moment</p>
                  <p>Add one to associete it to a group</p>
                  <Button variant="outline-warning" onClick={() => navigate(ROUTES.ADMIN.TEAMS.MAIN)}>Add teams</Button>
                </div>
              )
              : availableTeams === undefined
                ? (
                  <div>
                    <p style={{ color: 'red' }}>An error ocurred getting the teams</p>
                  </div>
                )
                : (
                  <div className="checkbox-update-teams">
                    <p>Choose the teams you want to add to this group</p>
                    <p>Please note that the teams already assigned to other groups or to the current
                    group in the same stage will not appear in the list below.</p>
                    {availableTeams?.map(team => (
                      <Form.Check
                        className="form-check"
                        type="checkbox"
                        key={team.teamId}
                        label={team.name}
                        checked={selectedTeamIds.includes(team?.teamId)}
                        onChange={() => handleCheckboxChange(team?.teamId)}
                      />
                    ))}
                    <div className="button-update">
                      <Button
                        disabled={submittingForm}
                        variant="outline-info"
                        onClick={updateTeamGroups}
                      >
                      Update
                      </Button>
                      {noneTeamSelectedError && (<p className="form-message error-message">{noneTeamSelectedError}</p>)}
                    </div>
                  </div>
                )
            }
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setShowUpdateGroupTeamModal(false)} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateGroupTeamModal