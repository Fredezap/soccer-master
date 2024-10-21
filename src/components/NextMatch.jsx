import { useState } from 'react'

const NextMatch = () => {
  const [nextMatch, setNextMatch] = useState(null)
  // const getNextMatch = () => {
  //   const nextMatchFounded = axios.get("api/get-next-match")

  // check what data return and if not null set it
  //   if (nextMatchFounded) {
  //     setNextMatch(nextMatchFounded)
  //   }
  // }

  // useEffect(() => {
  //   getNextMatch()
  // }, [])

  // todo: ver si next match es un array y mostrarlos en pantalla
  return (
    nextMatch && (
      <div className="col-lg-6">
        <div className="widget-next-match">
          <div className="widget-title">
            <h3>Next Match</h3>
          </div>
          <div className="widget-body mb-3">
            <div className="widget-vs">
              <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                <div className="team-1 text-center">
                  <img src="images/logo_1.png" alt="Image"></img>
                  <h3>Football League</h3>
                </div>
                <div>
                  <span className="vs"><span>VS</span></span>
                </div>
                <div className="team-2 text-center">
                  <img src="images/logo_2.png" alt="Image"></img>
                  <h3>Soccer</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center widget-vs-contents mb-4">
            <h4>World Cup League</h4>
            <p className="mb-5">
              <span className="d-block">December 20th, 2020</span>
              <span className="d-block">9:30 AM GMT+0</span>
              <strong className="text-primary">New Euro Arena</strong>
            </p>

            <div id="date-countdown2" className="pb-1">
              <span className="countdown-block"><span className="label" id="countdown-weeks">0</span> weeks </span>
              <span className="countdown-block"><span className="label" id="countdown-days">0</span> days </span>
              <span className="countdown-block"><span className="label" id="countdown-hours">0</span> hr </span>
              <span className="countdown-block"><span className="label" id="countdown-minutes">0</span> min </span>
              <span className="countdown-block"><span className="label" id="countdown-seconds">0</span> sec</span>
            </div>

          </div>
        </div>
      </div>
    )
  )
}

export default NextMatch