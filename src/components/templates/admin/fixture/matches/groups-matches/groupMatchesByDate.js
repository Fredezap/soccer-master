const groupMatchesByDate = (matches) => {
  return matches.reduce((groups, match) => {
    const date = match.date.split('T')[0]

    if (!groups[date]) {
      groups[date] = []
    }

    groups[date].push(match)

    groups[date].sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.time}`)
      const timeB = new Date(`1970-01-01T${b.time}`)
      return timeA - timeB
    })

    return groups
  }, {})
}

export default groupMatchesByDate