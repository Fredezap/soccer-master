import { FaFilePdf } from 'react-icons/fa'
import Rules from './Rules'

const RulesMainComponent = () => {
  return (
    <div className="rules-main">
      {/* PDF embebido en iframe */}
      <div>
        <Rules />
      </div>
      {/* Botón para descargar el PDF */}
      <a
        href="/tournament-rules/FFH_Turnierreglement.pdf"
        download
        className="text-xl"
      >
        <FaFilePdf />
          Download Turnierreglement
      </a>
    </div>
  )
}

export default RulesMainComponent