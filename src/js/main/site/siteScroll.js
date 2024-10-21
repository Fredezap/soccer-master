import $ from 'jquery'

const siteScroll = function() {
  $(window).scroll(function() {
    const st = $(this).scrollTop()

    if (st > 100) {
      $('.js-sticky-header').addClass('shrink')
    } else {
      $('.js-sticky-header').removeClass('shrink')
    }
  })
}

export default siteScroll