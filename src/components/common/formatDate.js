const formatDate = (fechaISO) => {
  const noDate = 'no date found'
  if (!fechaISO) return noDate

  const date = new Date(fechaISO)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()

  return {
    slashDate: `${day}/${month}/${year}`,
    dashDate: `${year}-${month}-${day}`
  }
}

export default formatDate