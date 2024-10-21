import $ from 'jquery'

const siteCarousel = function() {
  if ($('.nonloop-block-13').length > 0) {
    $('.nonloop-block-13').owlCarousel({
      center: false,
      items: 1,
      loop: true,
      stagePadding: 0,
      margin: 0,
      autoplay: true,
      nav: true,
      navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
      responsive: {
        600: {
          margin: 0,
          nav: true,
          items: 2
        },
        1000: {
          margin: 0,
          stagePadding: 0,
          nav: true,
          items: 3
        },
        1200: {
          margin: 0,
          stagePadding: 0,
          nav: true,
          items: 4
        }
      }
    })
  }

  if ($('.nonloop-block-14').length > 0) {
    $('.nonloop-block-14').owlCarousel({
      center: false,
      items: 1,
      loop: true,
      stagePadding: 0,
      margin: 0,
      autoplay: true,
      nav: true,
      navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
      responsive: {
        600: {
          margin: 20,
          nav: true,
          items: 2
        },
        1000: {
          margin: 30,
          stagePadding: 0,
          nav: true,
          items: 2
        },
        1200: {
          margin: 30,
          stagePadding: 0,
          nav: true,
          items: 3
        }
      }
    })
  }

  $('.slide-one-item').owlCarousel({
    center: false,
    items: 1,
    loop: true,
    stagePadding: 0,
    margin: 0,
    autoplay: true,
    pauseOnHover: false,
    nav: true,
    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
  })

  if ($('.owl-4-slider').length > 0) {
    const owl4 = $('.owl-4-slider').owlCarousel({
      loop: true,
      autoHeight: true,
      margin: 0,
      autoplay: true,
      smartSpeed: 1000,
      items: 4,
      nav: false,
      navText: ['<span class="icon-keyboard_backspace"></span>', '<span class="icon-keyboard_backspace"></span>'],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
    })

    $('.js-custom-next-v2').click(function(e) {
      e.preventDefault()
      owl4.trigger('next.owl.carousel')
    })
    $('.js-custom-prev-v2').click(function(e) {
      e.preventDefault()
      owl4.trigger('prev.owl.carousel')
    })
  }
}

export default siteCarousel