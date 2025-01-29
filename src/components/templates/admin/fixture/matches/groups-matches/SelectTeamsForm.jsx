import { useEffect, useState } from 'react'

const SelectTeamsForm = ({
  selectedGroup,
  dbGroups,
  showGroupMatchesDetail,
  handleGroupChange,
  teamChange,
  localTeam,
  visitorTeam
}) => {
  // todo: eliminar el boton admin para el resto de usuarios y ver header
  // todo: Pasar a seccion home, la parte de next match. Como lo voy a manejar a eso? Si no hay partidos u horarios?
  // todo: El contador no anda. Mostrar datos del partido si los hubiera
  // todo: Luego mostar tabla, quiza grupos en vez de una sola tabla.
  // todo: Luego ver de mostrar las brackets en caso de que hayan datos.
  // todo: A todo esto, deberia hacer un fetch de los datos de db cada unos 15 min? aprox?
  // todo: Luego creo que pasar a matches y players seria la posta
  // todo: seguir con contacto? creo que deiv queria dejar algo de eso. Inclusive si quieren agregar videos deberia mandarlos ahi.
  // todo: Por ultimo las news, los videos, el blog y footer, ver que se hace con eso

  const [localTeamValue, setLocalTeamValue] = useState('')
  const [visitorTeamValue, setVisitorTeamValue] = useState('')
  const [selectedGroupValue, setSelectedGroupValue] = useState('')

  useEffect(() => {
    if (localTeam) {
      setLocalTeamValue(localTeam.teamId.toString())
    } else {
      setLocalTeamValue('')
    }

    if (visitorTeam) {
      setVisitorTeamValue(visitorTeam.teamId.toString())
    } else {
      setVisitorTeamValue('')
    }
    if (selectedGroup) {
      setSelectedGroupValue(selectedGroup.groupId.toString())
    } else {
      setSelectedGroupValue('')
    }
  }, [localTeam, visitorTeam, selectedGroup])

  return (
    <div className="group-match">
      <select
        className="group-select"
        value={selectedGroupValue}
        onChange={handleGroupChange}
      >
        <option value="" disabled>Select a group</option>
        {dbGroups[showGroupMatchesDetail]?.groups?.map(group => (
          <option key={group.groupId} value={group.groupId}>
            {group.name}
          </option>
        ))}
      </select>

      {selectedGroup && (
        <div className="select-team-vs">
          <select
            className="group-select"
            value={localTeamValue}
            onChange={(event) => teamChange({ teamType: 'local', event })}
          >
            <option value="">Select a team</option>
            {selectedGroup.Teams?.map(team => (
              <option key={team.teamId} value={team.teamId}>{team.name}</option>
            ))}
          </select>

          <p>VS</p>

          <select
            className="group-select"
            value={visitorTeamValue}
            onChange={(event) => teamChange({ teamType: 'visitor', event })}
          >
            <option value="">Select a team</option>
            {selectedGroup.Teams?.map(team => (
              <option key={team.teamId} value={team.teamId}>{team.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

export default SelectTeamsForm