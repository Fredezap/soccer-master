const checkTimeIsNotValid = (time) => {
  const [hours, minutes] = time.split(':').map(Number)
  if (
    isNaN(hours) ||
        isNaN(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
  ) return true
}

export default checkTimeIsNotValid