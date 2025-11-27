const CountDownSection = () => {
  return (
    <div className="centered countdown-section">
      <div className="inner-container">
        <h4>Das Turnier beginnt in:</h4>
        <div style={{ margin: '0' }} id="date-countdown">
          <span className="countdown-block"><span className="label" id="countdown-weeks"></span> Wochen </span>
          <span className="countdown-block"><span className="label" id="countdown-days"></span> Tagen </span>
          <span className="countdown-block"><span className="label" id="countdown-hours"></span> Stunden </span>
          <span className="countdown-block"><span className="label" id="countdown-minutes"></span> Minuten </span>
          <span className="countdown-block"><span className="label" id="countdown-seconds"></span> Sekunden</span>
        </div>
        {/* <h5 id="date-countdown2"></h5> */}
      </div>
    </div>
  )
}

export default CountDownSection