const GroupsComponent = ({ groups }) => {
//   console.log('GRUPOS: ', groups)
  return (
    <div className="group-component">
      <h2>Tournament Groups</h2>
      {Array.isArray(groups) && groups.length > 0
        ? (
          <div>
            {groups.map(group => (
              <div key={group.teamGroupId}>
                <p>{group.name}</p>
                <div>
                  {group.teams.map(team => (
                    <p>{team.name}</p>
                  ))}
                </div>
              </div>
            )
            )}
          </div>
        )
        : (
          <p>No groups has been set yet</p>
        )}
    </div>
  )
}

export default GroupsComponent