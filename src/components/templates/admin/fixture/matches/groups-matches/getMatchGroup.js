const getMatchGroup = (match) => {
  if (!match || !match.LocalTeam || !match.VisitorTeam) return null

  const localGroups = match.LocalTeam.Groups || []
  const visitorGroups = match.VisitorTeam.Groups || []

  // Filtrar grupos que coincidan con el stageId del partido
  const stageId = match.stageId

  const localStageGroups = localGroups.filter(group => group.stageId === stageId)
  const visitorStageGroups = visitorGroups.filter(group => group.stageId === stageId)

  // Encontrar un grupo común entre LocalTeam y VisitorTeam
  const commonGroup = localStageGroups.find(localGroup =>
    visitorStageGroups.some(visitorGroup => visitorGroup.groupId === localGroup.groupId)
  )

  return commonGroup || null // Devuelve el grupo común o null si no existe
}

export default getMatchGroup