import { useEffect, useState } from 'react'
import SelectAStage from './SelectAStage'
import TeamStatus from './TeamStatus'
import TeamsAreKnownForm from '../teams-are-known-form/TeamsAreKnownForm'
import ConfirmButton from './ConfirmButton'
import TeamsAreUnknownForm from '../teams-are-unknown-form/TeamsAreUnknownForm'
import useKnockoutMatchErrorManager from '../errors/useKnockoutMatchErrorManager'
import ChooseDateAndLocationForm from './ChooseDateAndLocationForm'
import CreateKnockoutMatchModal from '../../modals/CreateKnockoutMatchModal'

const AddKnockoutMatchesFormMain = ({
  rounds,
  dbKnockoutStages,
  dbTeams,
  getKnockoutStages,
  getMatches
}) => {
  const [customError, setCustomError] = useState(null)
  const [selectedStage, setSelectedStage] = useState(null)
  const TEAM_STATUS = { UNDEFINED: 'undefined', KNOWN: 'known', UNKNOWN: 'unknown' }
  const [teamStatus, setTeamStatus] = useState(TEAM_STATUS.UNDEFINED)
  const [localTeam, setLocalTeam] = useState(null)
  const [visitorTeam, setVisitorTeam] = useState(null)
  const [localTeamPlaceholder, setLocalTeamPlaceholder] = useState('')
  const [visitorTeamPlaceholder, setVisitorTeamPlaceholder] = useState('')
  const [locationAndDateformData, setLocationAndDateformData] = useState({ date: '', time: '', location: '' })
  const [showDeleteKnockoutMatchModal, setShowDeleteKnockoutMatchModal] = useState(false)
  const [showCreateKnockoutMatchModal, setShowCreateKnockoutMatchModal] = useState(false)

  const resetFormValues = () => {
    setLocalTeam(null)
    setVisitorTeam(null)
    setLocalTeamPlaceholder('')
    setVisitorTeamPlaceholder('')
    setLocationAndDateformData({ date: '', time: '', location: '' })
  }

  const handleStageChange = (stage) => {
    setSelectedStage(stage)
    resetFormValues()
    setTeamStatus(TEAM_STATUS.UNDEFINED)
  }

  const handleShowConfirmModal = () => {
    const checkErrors = useKnockoutMatchErrorManager({
      TEAM_STATUS,
      teamStatus,
      selectedStage,
      visitorTeam,
      localTeam,
      locationAndDateformData,
      rounds,
      setCustomError,
      localTeamPlaceholder,
      visitorTeamPlaceholder
    })
    if (checkErrors) return
    setShowCreateKnockoutMatchModal(true)
  }

  useEffect(() => {
    setCustomError(null)
  }, [visitorTeam, localTeam, locationAndDateformData, localTeamPlaceholder, visitorTeamPlaceholder])

  return (
    <div className="select-team-vs">
      {Object.entries(dbKnockoutStages).length === 0
        ? (
          <p>Please add knockout stages before adding a match</p>
        )
        : (
          <div>
            <SelectAStage handleStageChange={handleStageChange} dbKnockoutStages={dbKnockoutStages} />
            {selectedStage && (
              <div className="knockout-team-status">
                <TeamStatus setTeamStatus={setTeamStatus} TEAM_STATUS={TEAM_STATUS} />
                {teamStatus === TEAM_STATUS.KNOWN && (
                  <TeamsAreKnownForm
                    dbTeams={dbTeams}
                    setLocalTeam={setLocalTeam}
                    setVisitorTeam={setVisitorTeam}
                  />
                )}
                {teamStatus === TEAM_STATUS.UNKNOWN && (
                  <TeamsAreUnknownForm
                    localTeamPlaceholder={localTeamPlaceholder}
                    setLocalTeamPlaceholder={setLocalTeamPlaceholder}
                    visitorTeamPlaceholder={visitorTeamPlaceholder}
                    setVisitorTeamPlaceholder={setVisitorTeamPlaceholder}
                  />
                )}
                {teamStatus !== TEAM_STATUS.UNDEFINED && (
                  <div>
                    <ChooseDateAndLocationForm
                      setCustomError={setCustomError}
                      locationAndDateformData={locationAndDateformData}
                      setLocationAndDateformData={setLocationAndDateformData}
                    />
                    <ConfirmButton
                      handleShowConfirmModal={handleShowConfirmModal}
                      customError={customError}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      {showCreateKnockoutMatchModal && (
        <CreateKnockoutMatchModal
          getMatches={getMatches}
          selectedStage={selectedStage}
          getKnockoutStages={getKnockoutStages}
          localTeam={localTeam}
          visitorTeam={visitorTeam}
          showCreateKnockoutMatchModal={showCreateKnockoutMatchModal}
          setShowCreateKnockoutMatchModal={setShowCreateKnockoutMatchModal}
          customError={customError}
          setCustomError={setCustomError}
          locationAndDateformData={locationAndDateformData}
          localTeamPlaceholder={localTeamPlaceholder}
          visitorTeamPlaceholder={visitorTeamPlaceholder}
          teamStatus={teamStatus}
          TEAM_STATUS={TEAM_STATUS}
        />
      )}
    </div>
  )
}

export default AddKnockoutMatchesFormMain