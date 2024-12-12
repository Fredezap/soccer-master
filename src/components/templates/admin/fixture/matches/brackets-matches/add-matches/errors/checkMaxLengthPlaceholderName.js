const checkMaxLengthPlaceholderName = (localTeamPlaceholder, visitorTeamPlaceholder) => {
  if (localTeamPlaceholder.length > 50 || visitorTeamPlaceholder.length > 50) return true
}

export default checkMaxLengthPlaceholderName