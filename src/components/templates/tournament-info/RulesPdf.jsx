import { FaFilePdf } from 'react-icons/fa'

const RulesPdf = () => {
  return (
    <div className="rules-main">
      {/* PDF embebido en iframe */}
      <iframe
        className="iframerules"
        src="/tournament-rules/Weisungen_Junioren_Swiss_Futsal.pdf#toolbar=0&navpanes=0&scrollbar=0"
        width="80%" // ancho ajustable
        style={{ border: '1px solid #ccc', display: 'block', margin: '0 auto' }}
        title="Tournament Rules"
      />

      {/* Botón para descargar el PDF */}
      <a
        href="/tournament-rules/Weisungen_Junioren_Swiss_Futsal.pdf"
        download
      >
        <FaFilePdf className="text-xl" />
          Regeln herunterladen
      </a>
    </div>
  )
}

export default RulesPdf