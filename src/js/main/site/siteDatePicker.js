import $ from 'jquery'

const siteDatePicker = function() {
  if ($('.datepicker').length > 0) {
    $('.datepicker').datepicker()
  }
}

export default siteDatePicker