const SetMatchResult = ({ matchResult, setMatchResult }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    const parsedValue = value === '' ? null : parseInt(value, 10)
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

      {(matchResult?.localTeamScore != null && matchResult?.visitorTeamScore != null) &&
(matchResult?.localTeamScore === matchResult?.visitorTeamScore) &&
        (
          <div>
            <div className="grid-colums-lg">
              <label htmlFor="localTeamPenaltyScore">Local team penalty score:</label>
              <input
                type="number"
                id="localTeamPenaltyScore"
                name="localTeamPenaltyScore"
                value={matchResult?.localTeamPenaltyScore === 0
                  ? 0
                  : matchResult?.localTeamPenaltyScore
                    ? matchResult?.localTeamPenaltyScore
                    : ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid-colums-lg">
              <label htmlFor="visitorTeamPenaltyScore">Visitor team penalty score:</label>
              <input
                type="number"
                id="visitorTeamPenaltyScore"
                name="visitorTeamPenaltyScore"
                value={matchResult?.visitorTeamPenaltyScore === 0
                  ? 0
                  : matchResult?.visitorTeamPenaltyScore
                    ? matchResult?.visitorTeamPenaltyScore
                    : ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}
    </div>
  )
}

export default SetMatchResult