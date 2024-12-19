const formatTime = (time) => {
  const noTime = 'no time found'
  if (!time) return noTime
  const [hours, minutes] = time.split(':').map(Number)
  return `${String(hours).padStart(2, '0')}:${minutes}${minutes}`
}

export default formatTime