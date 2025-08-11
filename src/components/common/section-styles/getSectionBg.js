const getSectionBg = (currentTournament, dbKnockoutStages) => {
  let numberOfExistingSections = 1 // Section matches will always exist
  let bracketsSectionsExist = false

  const videosSectionExist = currentTournament?.Videos > 0
  if (dbKnockoutStages) bracketsSectionsExist = Object.entries(dbKnockoutStages).length > 0

  if (videosSectionExist || bracketsSectionsExist) numberOfExistingSections = 2
  if (videosSectionExist && bracketsSectionsExist) numberOfExistingSections = 3

  const lightBg = 'bg-light'
  const darkBg = 'bg-dark'

  const sectionsBg = {
    matchesBg: darkBg,
    videosBg: lightBg,
    bracketsBg: darkBg
  }

  if (numberOfExistingSections === 2) {
    sectionsBg.matchesBg = lightBg
    sectionsBg.videosBg = darkBg
    sectionsBg.bracketsBg = darkBg
  }

  return sectionsBg
}

export default getSectionBg