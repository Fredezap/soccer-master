import { useEffect, useState } from 'react'
import BracketKnokoutMatches from '../brackets-matches/main/BracketKnokoutMatches'
import GroupsMatches from '../groups-matches/GroupsMatches'
import handleGetData from '../../../handleGetData'
import { useMessageStore } from '../../../../../../store/slices/useMessageStore'
import handleSubmitFormAdmin from '../../../handleSubmitFormAdmin'
import { useSubmittingFormStore } from '../../../../../../store/slices/useSubmittingFormStore'

const MatchesMain = ({ getStages }) => {
  const { addMessage } = useMessageStore()
  const [dbGroups, setDbGroups] = useState([])
  const [dbKnockoutStages, setDbKnockoutStages] = useState([])
  const { setSubmittingForm } = useSubmittingFormStore()
  const [dbMatches, setDbMatches] = useState([])
  const [dbTeams, setDbTeams] = useState([])

  const getGroups = async(values) => {
    const url = '/admin/fixture/groups/get-all-groups'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
    if (response?.success) {
      setDbGroups(response.data.dbGroups)
    }
  }

  const getKnockoutStages = async(values) => {
    const url = '/admin/fixture/stages/get-all-knockout-stages'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
    if (response?.success) {
      setDbKnockoutStages(response.data.dbKnockoutStages)
    }
  }

  const getMatches = async(values) => {
    const url = '/admin/fixture/matches/get-all'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
    if (response?.success) {
      setDbMatches(response.data.dbMatches)
    }
  }

  const getTeams = async(values) => {
    const url = '/admin/teams/get-all'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
    if (response?.success) {
      setDbTeams(response.data.dbTeams)
    }
  }

  useEffect(() => {
    getGroups()
    getKnockoutStages()
    getMatches()
    getTeams()
  }, [])

  return (
    <div className="matches-main">

      {!dbTeams || dbTeams.length === 0
        ? (
          <div className="no-teams-found">
            <p>No teams found</p>
            <p>Please add teams before adding a match</p>
          </div>
        )
        : (
          <div>
            <BracketKnokoutMatches
              getTeams={getTeams}
              dbTeams={dbTeams}
              dbMatches={dbMatches}
              getMatches={getMatches}
              getKnockoutStages={getKnockoutStages}
              dbKnockoutStages={dbKnockoutStages}
            />
            <GroupsMatches
              getStages={getStages}
              dbGroups={dbGroups}
              getGroups={getGroups}
            />
          </div>
        )

      }
    </div>
  )
}

export default MatchesMain