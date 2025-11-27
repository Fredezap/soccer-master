const formatDate = (fechaISO) => {
  const noDate = 'no date found'
  if (!fechaISO) return noDate

  // Detect if date format is DD/MM/YYYY
  const fechaParts = fechaISO.split('/')
  if (fechaParts.length === 3) {
    const [day, month, year] = fechaParts
    fechaISO = `${year}-${month}-${day}`
  }

  const date = new Date(fechaISO)
  if (isNaN(date.getTime())) return noDate

  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()

  return {
    slashDate: `${day}/${month}/${year}`,
    dashDate: `${year}-${month}-${day}`,
    dotDate: `${year}.${month}.${day}`
  }
}

export default formatDate