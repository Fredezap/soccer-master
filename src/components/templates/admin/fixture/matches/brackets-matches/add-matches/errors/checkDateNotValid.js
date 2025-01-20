const checkDateNotValid = (date) => {
  console.log(date)
  if (isNaN(date.getTime())) return true
}

export default checkDateNotValid