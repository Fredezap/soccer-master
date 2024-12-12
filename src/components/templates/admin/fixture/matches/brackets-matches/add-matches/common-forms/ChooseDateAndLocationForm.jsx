const ChooseDateAndLocationForm = ({
  locationAndDateformData,
  setLocationAndDateformData
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLocationAndDateformData({
      ...locationAndDateformData,
      [name]: value
    })
  }

  return (
    <div className="form-input-box">
      <div className="grid-colums">
        <label htmlFor="date">Choose a Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={locationAndDateformData?.date || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid-colums">
        <label htmlFor="time">Choose a Time:</label>
        <input
          type="time"
          id="time"
          name="time"
          value={locationAndDateformData?.time || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid-colums">
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