import { useState } from 'react'

const TableScores = () => {
  const [tableScores, setTableScores] = useState(null)
  // const getTableScores = () => {
  //   const tableScoresData = axios.get("api/get-table-scors")

  // check what data return and if not null set it
  //   if (tableScoresData) {
  //     setTableScores(tableScoresData)
  //   }
  // }

  // useEffect(() => {
  //   getTableScores()
  // }, [])

  // todo: ver si tables scores es un array y mostrarlos en pantalla
  return (
    tableScores && (
      <div className="col-lg-6">
        <div className="widget-next-match">
          <table className="table custom-table">
            <thead>
              <tr>
                <th>P</th>
                <th>Team</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>PTS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><strong className="text-white">Football League</strong></td>
                <td>22</td>
                <td>3</td>
                <td>2</td>
                <td>140</td>
              </tr>
              <tr>
                <td>2</td>
                <td><strong className="text-white">Soccer</strong></td>
                <td>22</td>
                <td>3</td>
                <td>2</td>
                <td>140</td>
              </tr>
              <tr>
                <td>3</td>
                <td><strong className="text-white">Juvendo</strong></td>
                <td>22</td>
                <td>3</td>
                <td>2</td>
                <td>140</td>
              </tr>
              <tr>
                <td>4</td>
                <td><strong className="text-white">French Football League</strong></td>
                <td>22</td>
                <td>3</td>
                <td>2</td>
                <td>140</td>
              </tr>
              <tr>
                <td>5</td>
                <td><strong className="text-white">Legia Abante</strong></td>
                <td>22</td>
                <td>3</td>
                <td>2</td>
                <td>140</td>
              </tr>
              <tr>
                <td>6</td>
                <td><strong className="text-white">Gliwice League</strong></td>
                <td>22</td>
                <td>3</td>
                <td>2</td>
                <td>140</td>
              </tr>
              <tr>
                <td>7</td>
                <td><strong className="text-white">Cornika</strong></td>
                <td>22</td>
                <td>3</td>
                <td>2</td>
                <td>140</td>
              </tr>
              <tr>
                <td>8</td>
                <td><strong className="text-white">Gravity Smash</strong></td>
                <td>22</td>
                <td>3</td>
                <td>2</td>
                <td>140</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  )
}

export default TableScores