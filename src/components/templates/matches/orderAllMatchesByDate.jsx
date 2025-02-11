import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import { useOrderedMatches } from '../../../store/slices/useOrderedMatches'
import formatDate from '../../common/formatDate'
import formatTime from '../../common/formatTime'

const orderAllMatchesByDate = () => {
  const { currentTournament } = useTournamentsDetails()
  const { setAllMatchesByDate, setNextMatch, setUpcomingMatches, setFinishedMatches } = useOrderedMatches()

  const setAndOrderMatchesByDate = () => {
    if (!currentTournament || !currentTournament.Stages) return

    // Obtener la fecha y hora local del sistema
    const nowLocal = new Date()
    const nowTime = nowLocal.getTime() // Timestamp en milisegundos para comparación

    const allMatches = currentTournament.Stages.flatMap(stage => stage.Matches || [])
      .map(match => {
        const datePart = match.date.split('T')[0] // Obtener solo la fecha sin la hora
        const fullDateTimeString = `${datePart}T${match.time}` // Mantener el formato recibido
        const fullDateTime = new Date(fullDateTimeString) // Crear objeto Date
        const matchTime = fullDateTime.getTime() // Timestamp en milisegundos

        return {
          ...match,
          date: formatDate(datePart).slashDate,
          time: formatTime(match.time),
          fullDateTime,
          matchTime
        }
      })
      .sort((a, b) => a.matchTime - b.matchTime)

    const finishedMatches = allMatches.filter(match => match.matchTime < nowTime)
    const allUpcomingMatches = allMatches.filter(match => match.matchTime >= nowTime)
    const upcomingMatches = allUpcomingMatches.splice(1)
    const nextMatch = allUpcomingMatches.length > 0 ? allUpcomingMatches[0] : null

    // Actualizar el estado global
    setAllMatchesByDate(allMatches)
    setFinishedMatches(finishedMatches)
    setUpcomingMatches(upcomingMatches)
    setNextMatch(nextMatch)
  }

  return { setAndOrderMatchesByDate }
}

export default orderAllMatchesByDate