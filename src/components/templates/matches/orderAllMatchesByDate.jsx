import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import formatDate from '../../common/formatDate'
import formatTime from '../../common/formatTime'

const orderAllMatchesByDate = () => {
  const { currentTournament } = useTournamentsDetails()
  const orderMatchesByDate = () => {
    console.log('current t: ', currentTournament)
    if (!currentTournament || !currentTournament.Stages) return

    const now = new Date()

    const allMatches = currentTournament.Stages.flatMap(stage => stage.Matches || [])

    const upcomingMatches = allMatches
      .map(match => {
      // Extraer solo la parte de la fecha (YYYY-MM-DD) sin la hora ni la Z
        const datePart = match.date.split('T')[0]

        // Crear un string válido de fecha y hora en formato ISO
        const fullDateTimeString = `${datePart}T${match.time}Z`

        // Convertirlo a un objeto Date
        const fullDateTime = new Date(fullDateTimeString)

        return { ...match, date: formatDate(datePart).slashDate, time: formatTime(match.time), fullDateTime }
      })
      .filter(match => match.fullDateTime > now) // Filtrar los futuros
      .sort((a, b) => a.fullDateTime - b.fullDateTime) // Ordenar por fecha y hora
    console.log('MATCHES: ', upcomingMatches)
    return (upcomingMatches || null)
  }
  return { orderMatchesByDate }
}

export default orderAllMatchesByDate