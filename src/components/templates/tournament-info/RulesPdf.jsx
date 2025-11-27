import { FaFilePdf } from 'react-icons/fa'

const RulesPdf = () => {
  return (
    <div className="rules-main">
      {/* PDF embebido en iframe */}
      <div className="infos-img-container rules">
        <img
          src="/tournament-rules/Reglement_page-1.jpg"
          alt="Tournament Rules"
          className="info-img"
        />
        <img
          src="/tournament-rules/Reglement_page-2.jpg"
          alt="Tournament Rules"
          className="info-img"
        />
      </div>
      {/* Botón para descargar el PDF */}
      <a
        href="/tournament-rules/Reglement.pdf"
        download
      >
        <FaFilePdf className="text-xl" />
          Regeln herunterladen
      </a>
    </div>
  )
}

export default RulesPdf