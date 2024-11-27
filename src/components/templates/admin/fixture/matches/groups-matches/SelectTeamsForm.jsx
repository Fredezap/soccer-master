const SelectTeamsForm = ({
  selectedGroup,
  dbGroups,
  showGroupMatchesDetail,
  handleGroupChange,
  teamChange
}) => {
  return (
    <div className="group-match">
      <select className="group-select" onChange={handleGroupChange}>
        <option value="">Select a group</option>
        {dbGroups[showGroupMatchesDetail]?.groups?.map(group => (
          <option key={group.groupId} value={group.groupId}>{group.name}</option>
        ))}
      </select>
      {selectedGroup && (
        <div className="select-team-vs">
          <select
            className="group-select"
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