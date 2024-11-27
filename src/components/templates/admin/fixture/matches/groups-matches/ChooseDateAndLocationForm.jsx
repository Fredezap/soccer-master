const ChooseDateAndLocationForm = ({ locationAndDateformData, setLocationAndDateformData, setCustomError }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLocationAndDateformData({
      ...locationAndDateformData,
      [name]: value
    })

    validateField(name, value)
  }

  const validateField = (name, value) => {
    let error = ''
    console.log(name, value)
    if (name === 'date') {
      const today = new Date()
      const inputDate = new Date(value)
      if (!value) {
        error = 'Date is required'
      } else if (isNaN(inputDate.getTime())) {
        error = 'Invalid date format'
      } else if (inputDate < today) {
        error = 'Date cannot be in the past'
      }
    } else if (name === 'time') {
      if (!value) {
        error = 'Time is required'
      } else {
        const [hours, minutes] = value.split(':').map(Number)
        if (
          isNaN(hours) ||
          isNaN(minutes) ||
          hours < 0 ||
          hours > 23 ||
          minutes < 0 ||
          minutes > 59
        ) {
          error = 'Invalid time format'
        }
      }
    } else if (name === 'location') {
      if (!value.trim()) {
        error = 'Location is required'
      } else if (value.length < 3) {
        error = 'Location must be at least 3 characters long'
      }
    }

    setCustomError(error)
  }

  return (
    <div className="match-date-and-location">
      <div>
        <label htmlFor="date">Choose a Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={locationAndDateformData?.date || ''}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="time">Choose a Time:</label>
        <input
          type="time"
          id="time"
          name="time"
          value={locationAndDateformData?.time || ''}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="location">Enter Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={locationAndDateformData?.location || ''}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

export default ChooseDateAndLocationForm