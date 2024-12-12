const checkIfKnockoutMatchExist = (rounds, localTeam, visitorTeam) => {
  for (const round of rounds) {
    for (const seed of round.seeds) {
      const teams = seed.teams
      if (
        (teams[0].name === localTeam.name && teams[1].name === visitorTeam.name) ||
          (teams[0].name === visitorTeam.name && teams[1].name === localTeam.name)
      ) {
        return true
      }
    }
  }
}

export default checkIfKnockoutMatchExist