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