import { Button } from 'react-bootstrap'
import ChooseDateAndLocationForm from './ChooseDateAndLocationForm'
import SelectTeamsForm from './SelectTeamsForm'

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
  visitorTeam
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
        locationAndDateformData={
          locationAndDateformData
        }
        setLocationAndDateformData={
          setLocationAndDateformData
        }
        setCustomError={setCustomError}
      />
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