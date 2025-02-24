/* eslint-disable multiline-ternary */
import { Bracket, Seed, SeedItem, SeedTeam } from 'react-brackets'

const BracketsForUsers = ({ rounds }) => {
  const CustomSeed = ({ seed, breakpoint, roundIndex }) => {
    const { matchNumber, date, teams, match } = seed.seed
    return (
      <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
        <SeedItem>
          <div>
            <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '0px', backgroundColor: 'gray' }}>
              Match {matchNumber}
            </div>
            <SeedTeam className="seed-team">
              <span>{teams[0]?.name || 'NO TEAM'}</span>
              <span>
                {match.localTeamScore ? match.localTeamScore : match.localTeamScore === 0 ? '0' : '(-)'}
                {' '}
                {match.localTeamPenaltyScore !== null && match.localTeamPenaltyScore !== undefined
                  ? `(${match.localTeamPenaltyScore})`
                  : match.localTeamPenaltyScore === 0
                    ? '(0)'
                    : null}
              </span>
            </SeedTeam>
            <SeedTeam className="seed-team">
              <span>{teams[1]?.name || 'NO TEAM'}</span>
              <span>
                {match.visitorTeamScore ? match.visitorTeamScore : match.visitorTeamScore === 0 ? '0' : '(-)'}
                {' '}
                {match.visitorTeamPenaltyScore !== null && match.visitorTeamPenaltyScore !== undefined
                  ? `(${match.visitorTeamPenaltyScore})`
                  : match.visitorTeamPenaltyScore === 0
                    ? '(0)'
                    : null}
              </span>
            </SeedTeam>
          </div>
        </SeedItem>
        <div style={{ marginTop: '5px', fontSize: '10px', textAlign: 'center' }}>
          {date}
        </div>
        {roundIndex !== 0 && <div></div>}
      </Seed>
    )
  }

  return (
    <div className="brackets-container">
      {Array.isArray(rounds) && rounds.length > 0
        ? (
          <div className="brackets-box">
            {rounds.every((round) => round.seeds.length === 0)
              ? (
                <p>No matches set for any knockout stage yet</p>
              )
              : (
                <div className="bracket">
                  <Bracket
                    rounds={rounds}
                    renderSeedComponent={(seed) => <CustomSeed seed={seed} />}
                  />
                </div>
              )}
          </div>
        ) : (
          <p>No bracket data available</p>
        )}
    </div>
  )
}

export default BracketsForUsers