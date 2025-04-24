import { useEffect, useState } from 'react'
import handleSubmitFormAdmin from '../../handleSubmitFormAdmin'
import { useSubmittingFormStore } from '../../../../../store/slices/useSubmittingFormStore'
import { useMessageStore } from '../../../../../store/slices/useMessageStore'
import UpdateGroupTeamModal from './modals/UpdateGroupTeamModal'
import SetGroupFormMain from './set-group-form-main/SetGroupFormMain'
import GroupsAndTeams from './groups-teams/GroupsAndTeams'
import { useTournamentsDetails } from '../../../../../store/slices/useTournamentsDetails'
import { useStagesStore } from '../../../../../store/slices/useStagesStore'
import handleGetData from '../../handleGetData'
import getTournaments from '../../../../common/getters/GetTournaments'
import { useDbGroupsStore } from '../../../../../store/slices/useDbGroupsStore'

const SetGroupsMain = () => {
  const [dbTeams, setDbTeams] = useState([])
  const { dbGroups, setDbGroups } = useDbGroupsStore()
  const { stages, setStages } = useStagesStore()
  const [groupStages, setGroupStages] = useState([])
  const [selectedStage, setSelectedStage] = useState(null)
  const { setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()
  const [showUpdateGroupTeamModal, setShowUpdateGroupTeamModal] = useState(false)
  const [availableTeams, setAvailableTeams] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const { currentTournament } = useTournamentsDetails()
  const { fetchTournamentDetails } = getTournaments()

  const checkAndSetAvailableTeams = (stageId) => {
    const allocatedTeamIds = dbGroups[stageId]?.groups
      ?.flatMap(group =>
        group.Teams.map(team => team.teamId)
      )

    const chequedAvailableTeams = dbTeams?.filter(team =>
      !allocatedTeamIds.includes(team.teamId)
    )

    setAvailableTeams(chequedAvailableTeams)
  }

  const getTeams = async() => {
    try {
      const url = '/admin/teams/get-by-tournament'
      const httpMethod = 'post'
      const values = { tournamentId: currentTournament.tournamentId }
      const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
      if (response?.success) {
        setDbTeams(response.data?.tournament?.Teams)
      }
    } catch (error) {}
  }

  const getGroups = async() => {
    try {
      const url = '/admin/fixture/groups/get-all-groups-by-tournament'
      const httpMethod = 'post'
      const values = { tournamentId: currentTournament.tournamentId }
      const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
      if (response?.success) {
        setDbGroups(response.data.dbGroups)
      }
    } catch (error) {}
  }

  const getStages = async() => {
    try {
      const paramValues = { tournamentId: currentTournament.tournamentId }
      const url = '/admin/fixture/stages/get-all-by-tournament'
      const response = await handleGetData({ paramValues, url, addMessage })
      if (response.success) {
        setStages(response.data.dbStages)
      }
    } catch (error) {}
  }

  const getData = async() => {
    if (!currentTournament?.tournamentId) {
      return
    }

    await getTeams()
    await getGroups()
    await getStages()
    await fetchTournamentDetails()
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setGroupStages(stages.filter(stage => stage.type === 'group'))
  }, [stages])

  const handleAddTeamToGroup = async(group) => {
    setSelectedGroup(group)
    checkAndSetAvailableTeams(group.stageId)
    setShowUpdateGroupTeamModal(true)
  }

  return (
    <div className="bg-dark setting-groups-main">
      <SetGroupFormMain selectedStage={selectedStage} groupStages={groupStages} setSelectedStage={setSelectedStage} getData={getData} />
      <GroupsAndTeams handleAddTeamToGroup={handleAddTeamToGroup} dbGroups={dbGroups} getData={getData} />
      {showUpdateGroupTeamModal && (
        <UpdateGroupTeamModal
          showUpdateGroupTeamModal={showUpdateGroupTeamModal}
          setShowUpdateGroupTeamModal={setShowUpdateGroupTeamModal}
          availableTeams={availableTeams}
          selectedGroup={selectedGroup}
          getData={getData}
        />
      )}
    </div>
  )
}

export default SetGroupsMain