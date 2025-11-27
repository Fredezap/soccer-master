const TeamsAreUnknownForm = ({
  localTeamPlaceholder,
  setLocalTeamPlaceholder,
  visitorTeamPlaceholder,
  setVisitorTeamPlaceholder
}) => {
  return (
    <div className="teams-are-unknown">
      <h5>Set placeholder names for this match</h5>
      <form className="knockout-matches-select">
        <input
          name="localTeam"
          type="text"
          placeholder="e.g. Winner match 1"
          value={localTeamPlaceholder}
          onChange={(e) => setLocalTeamPlaceholder(e.target.value)}
        />
        <p>VS</p>
        <input
          name="visitorTeam"
          type="text"
          placeholder="e.g. Winner match 2"
          value={visitorTeamPlaceholder}
          onChange={(e) => setVisitorTeamPlaceholder(e.target.value)}
        />
      </form>
    </div>
  )
}

export default TeamsAreUnknownForm