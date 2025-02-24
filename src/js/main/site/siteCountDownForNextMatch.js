import $ from 'jquery'
import '../../js-refactorized/jquery.countdown.min'
import { useNextMatchRemainingTime } from '../../../store/slices/useNextMatchRemainingTime'

let countdownInterval = null
const siteCountDownForNextMatch = (onCountdownFinish) => { // Pasamos un callback
  const { remaining, setRemainingTime } = useNextMatchRemainingTime()
  const countdown = (nextMatch) => {
    if (countdownInterval) {
      clearInterval(countdownInterval)
      countdownInterval = null
    }

    $('#match-countdown').show().find('.label').text('--')
    $('#match-countdown2').hide().html('')

    if (!nextMatch?.date) {
      $('#match-countdown').hide()
      $('#match-countdown2').show().html('')
      return
    }

    const datePart = nextMatch.date.split('T')[0]
    const [day, month, year] = datePart.split('/').map(Number)
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

    const fullDateTimeString = `${formattedDate}T${nextMatch.time}`
    const fullDateTime = new Date(fullDateTimeString)
    const matchTime = fullDateTime.getTime()

    if (matchTime) {
      const now = new Date()
      const remaining = matchTime - now
      if (remaining >= 0) setRemainingTime(true)

      countdownInterval = setInterval(function() {
        const now = new Date()
        const remaining = matchTime - now

        if (remaining <= 0) {
          $('#match-countdown').hide()
          $('#match-countdown2').show().html('Countdown finished!')
          clearInterval(countdownInterval)
          countdownInterval = null
          // Ejecutamos el callback cuando el contador termine
          if (onCountdownFinish) {
            onCountdownFinish(false) // Pasamos el false al callback
          }
          return
        }

        const seconds = Math.floor((remaining / 1000) % 60)
        const minutes = Math.floor((remaining / (1000 * 60)) % 60)
        const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24)
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24))

        $('#match-countdown-weeks').text(Math.floor(days / 7))
        $('#match-countdown-days').text(days % 7)
        $('#match-countdown-hours').text(hours)
        $('#match-countdown-minutes').text(minutes)
        $('#match-countdown-seconds').text(seconds)
      }, 1000)
    }
  }

  return { countdown }
}

export default siteCountDownForNextMatch