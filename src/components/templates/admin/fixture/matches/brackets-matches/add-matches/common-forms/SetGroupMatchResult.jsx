const SetGroupMatchResult = ({ matchResult, setMatchResult }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    const parsedValue = value === '' ? null : parseInt(value, 10) // Permite vacío como null

    setMatchResult({
      ...matchResult,
      [name]: parsedValue
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
          value={matchResult?.localTeamScore === 0 ? 0 : matchResult?.localTeamScore ? matchResult?.localTeamScore : ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid-colums">
        <label htmlFor="visitorTeamScore">Visitor team score:</label>
        <input
          type="number"
          id="visitorTeamScore"
          name="visitorTeamScore"
          value={matchResult?.visitorTeamScore === 0 ? 0 : matchResult?.visitorTeamScore ? matchResult?.visitorTeamScore : ''}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

export default SetGroupMatchResult