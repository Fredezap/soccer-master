import $ from 'jquery'
import '../../js-refactorized/jquery.countdown.min'

const siteCountDownForTournament = function(time) {
  // TODO: check time format received.
  // TODO: then change endDate for time

  window.jQuery(function() {
    const endDate = new Date('2024-10-19T00:00:00')

    setInterval(function() {
      const now = new Date()
      const remaining = endDate - now

      if (remaining <= 0) {
        $('#date-countdown').html('')
        clearInterval(this)
        return
      }

      const seconds = Math.floor((remaining / 1000) % 60)
      const minutes = Math.floor((remaining / (1000 * 60)) % 60)
      const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24)
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24))

      // Update the inner values of each element
      $('#countdown-weeks').text(Math.floor(days / 7))
      $('#countdown-days').text(days % 7)
      $('#countdown-hours').text(hours)
      $('#countdown-minutes').text(minutes)
      $('#countdown-seconds').text(seconds)
    }, 1000)
  })
}

export default siteCountDownForTournament