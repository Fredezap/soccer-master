const SetMatchResult = ({ matchResult, setMatchResult }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setMatchResult({
      ...matchResult,
      [name]: value
    })
  }

  return (
    <div className="form-input-box">
      <div className="grid-colums">
        <label htmlFor="localTeamScore">Local team score:</label>
        <input
          type="number"
          id="localTeamScore"
          name="localTeamScore"
          value={matchResult.localTeamScore}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid-colums">
        <label htmlFor="visitorTeamScore">Visitor team score:</label>
        <input
          type="number"
          id="visitorTeamScore"
          name="visitorTeamScore"
          value={matchResult.visitorTeamScore}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

export default SetMatchResult