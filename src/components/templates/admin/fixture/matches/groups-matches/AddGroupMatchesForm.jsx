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
  matchResult,
  setMatchResult
}) => {
  // todo: PASO 1
  // todo: agregar boton con pelota, para edicion resultado.
  // todo: el mismo enviara local y visitor team score al back, SACAR PENALES

  // todo: PASO 2
  // todo: en el boton de edicion de fecha, hora, lugar, grupo y equipos chequear lo siguiente:
  // todo: si el restultado ya esta definido, no renderizar la edicion de grupos y equipos.
  // todo: quiza mostrar un cartel diciendo que no se puede editar eso, porque el resultado ya esta definido, o no reenderizar nada
  // todo: en el back traer match by id y chequear nuevanebte que el partido no tenga resultado
  // todo: si tiene, enviar error y no modificar nada
  // todo: si no tiene, proceder a editar.

  // todo: PASO 3
  // todo: chequear los valores de score para cuando se edita el knockout match. Ver bien ese endpoint
  // todo: si no hay local team score y visitor, no pueden haber penales, y si solo 1 de ellos esta definido, tampoco

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