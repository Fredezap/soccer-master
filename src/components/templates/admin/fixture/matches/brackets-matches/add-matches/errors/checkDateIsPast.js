const normalizeDate = (d) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate())

const checkDateIsPast = (date, today) => {
  const d1 = normalizeDate(date)
  const d2 = normalizeDate(today)

  return d1 < d2
}

export default checkDateIsPast