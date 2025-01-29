import { Button } from 'react-bootstrap'
import ChooseDateAndLocationForm from './ChooseDateAndLocationForm'
import SelectTeamsForm from './SelectTeamsForm'
import SetMatchResult from '../brackets-matches/add-matches/common-forms/SetMatchResult'

const AddGroupMatchesForm = ({
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
  visitorTeam,
  matchResult,
  setMatchResult
}) => {
  return (
    <div>
      <SelectTeamsForm
        selectedGroup={selectedGroup}
        dbGroups={dbGroups}
        showGroupMatchesDetail={showGroupMatchesDetail}
        handleGroupChange={handleGroupChange}
        teamChange={teamChange}
        localTeam={localTeam}
        visitorTeam={visitorTeam}
      />
      <ChooseDateAndLocationForm
        locationAndDateformData={locationAndDateformData}
        setLocationAndDateformData={setLocationAndDateformData}
        setCustomError={setCustomError}
      />
      {formAction === 'edit' && (
        <SetMatchResult
          matchResult={matchResult}
          setMatchResult={setMatchResult}
        />
      )}
      <div className="confirm-button">
        <Button
          disabled={customError}
          variant="outline-success"
          onClick={() => handleConfirmGroupMatch(formAction)}
        >
          {formAction}
        </Button>
        {customError && (
          <p className="form-message error-message">
            {customError}
          </p>
        )}
      </div>
    </div>
  )
}

export default AddGroupMatchesForm