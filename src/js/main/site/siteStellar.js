import $ from 'jquery'
import 'stellar.js'

const siteStellar = function() {
  $(window).stellar({
    responsive: false,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  })
}

export default siteStellar