import { useEffect, useState } from 'react'
import handleSubmitFormAdmin from '../../handleSubmitFormAdmin'
import { useSubmittingFormStore } from '../../../../../store/slices/useSubmittingFormStore'
import { useMessageStore } from '../../../../../store/slices/useMessageStore'
import CreateGroupForm from './forms/CreateGroupForm'
import { Button } from 'react-bootstrap'
import UpdateGroupTeamModal from './modals/UpdateGroupTeamModal'
import SetGroupFormMain from './set-group-form-main/SetGroupFormMain'
import GroupsAndTeams from './groups-teams/GroupsAndTeams'

const SetGroupsMain = () => {
  const [dbTeams, setDbTeams] = useState([])
  const [dbGroups, setDbGroups] = useState([])
  const [dbStages, setDbStages] = useState([])
  const [selectedStage, setSelectedStage] = useState(null)
  const { setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()
  const [showUpdateGroupTeamModal, setShowUpdateGroupTeamModal] = useState(false)
  const [availableTeams, setAvailableTeams] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)

  const checkAndSetAvailableTeams = (stageId) => {
    const allocatedTeamIds = dbGroups[stageId].groups
      .flatMap(group =>
        group.Teams.map(team => team.teamId)
      )

    const chequedAvailableTeams = dbTeams.filter(team =>
      !allocatedTeamIds.includes(team.teamId)
    )

    setAvailableTeams(chequedAvailableTeams)
  }

  const getTeams = async(values) => {
    const url = '/admin/teams/get-all'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
    if (response?.success) {
      setDbTeams(response.data.dbTeams)
    }
  }

  const getGroups = async(values) => {
    const url = '/admin/fixture/groups/get-all'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })

    if (response?.success) {
      setDbGroups(response.data.dbGroups)
    }
  }

  const getStages = async(values) => {
    const url = '/admin/fixture/stages/get-all'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
    if (response?.success) {
      setDbStages(response.data.dbStages.filter(stage => stage.type === 'group'))
    }
  }

  const getData = () => {
    getTeams()
    getGroups()
    getStages()
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (dbStages.length === 1) {
      const stage = dbStages[0]
      setSelectedStage({ stageId: stage.stageId, name: stage.name })
    }
  }, [dbStages])

  const handleAddTeamToGroup = async(group) => {
    setSelectedGroup(group)
    checkAndSetAvailableTeams(group.stageId)
    setShowUpdateGroupTeamModal(true)
  }

  return (
    <div className="setting-groups-main">
      <SetGroupFormMain selectedStage={selectedStage} dbStages={dbStages} setSelectedStage={setSelectedStage} getData={getData} />
      <GroupsAndTeams handleAddTeamToGroup={handleAddTeamToGroup} dbGroups={dbGroups} getData={getData} />
      <UpdateGroupTeamModal
        showUpdateGroupTeamModal={showUpdateGroupTeamModal}
        setShowUpdateGroupTeamModal={setShowUpdateGroupTeamModal}
        availableTeams={availableTeams}
        selectedGroup={selectedGroup}
        getData={getData}
      />
    </div>
  )
}

export default SetGroupsMain