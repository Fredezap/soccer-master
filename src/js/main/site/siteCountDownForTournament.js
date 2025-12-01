import $ from 'jquery'
import '../../js-refactorized/jquery.countdown.min'

let countdownInterval = null

const siteCountDownForTournament = function(currentTournament) {
  if (countdownInterval) {
    clearInterval(countdownInterval)
    countdownInterval = null
  }

  $('#date-countdown').show().find('.label').text('--')
  $('#date-countdown2').hide().html('')

  if (!currentTournament?.date) {
    $('#date-countdown').hide()
    $('#date-countdown2').show().html('No upcoming tournament!')
    return
  }

  const endDate = new Date(currentTournament.date)

  countdownInterval = setInterval(function() {
    const now = new Date()
    const remaining = endDate - now

    if (remaining <= 0) {
      $('#date-countdown').hide()
      $('#date-countdown2').show().html('COUNTDOWN BEENDET!')
      clearInterval(countdownInterval)
      countdownInterval = null
      return
    }

    const seconds = Math.floor((remaining / 1000) % 60)
    const minutes = Math.floor((remaining / (1000 * 60)) % 60)
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24)
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24))

    $('#countdown-weeks').text(Math.floor(days / 7))
    $('#countdown-days').text(days % 7)
    $('#countdown-hours').text(hours)
    $('#countdown-minutes').text(minutes)
    $('#countdown-seconds').text(seconds)
  }, 1000)
}

export default siteCountDownForTournament