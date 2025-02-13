import { Button } from 'react-bootstrap'
import ChooseDateAndLocationForm from '../../../../../templates/admin/fixture/matches/brackets-matches/add-matches/common-forms/ChooseDateAndLocationForm'
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
  match
}) => {
  return (
    <div>
      {!match?.localTeamScore && !match?.visitorTeamScore && (
        <SelectTeamsForm
          selectedGroup={selectedGroup}
          dbGroups={dbGroups}
          showGroupMatchesDetail={showGroupMatchesDetail}
          handleGroupChange={handleGroupChange}
          teamChange={teamChange}
          localTeam={localTeam}
          visitorTeam={visitorTeam}
        />
      )}
      <ChooseDateAndLocationForm
        formAction={formAction}
        setCustomError={setCustomError}
        locationAndDateformData={locationAndDateformData}
        setLocationAndDateformData={setLocationAndDateformData}
      />
      <div className="confirm-button">
        <Button
          disabled={customError}
          variant="outline-success"
          onClick={() => handleConfirmGroupMatch()}
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