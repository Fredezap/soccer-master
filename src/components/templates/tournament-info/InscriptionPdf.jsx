import { FaFilePdf } from 'react-icons/fa'

const InscriptionPdf = () => {
  return (
    <div className="rules-main">
      {/* PDF embebido en iframe */}
      <iframe
        className="iframerules"
        src="/tournament-rules/FFH_Anmeldung_form_2025.pdf#toolbar=0&navpanes=0&scrollbar=0"
        width="80%" // ancho ajustable
        style={{ border: '1px solid #ccc', display: 'block', margin: '0 auto' }}
        title="Tournament Rules"
      />

      {/* Botón para descargar el PDF */}
      <a
        href="/tournament-rules/FFH_Anmeldung_2025.pdf"
        download
      >
        <FaFilePdf className="text-xl" />
          Formular herunterladen
      </a>
      <p style={{ color: 'rgb(212, 242, 60)' }}>
          Lade das Formular herunter, fülle es aus und sende es anschließend an
        <span style={{ color: 'rgb(250,104,121)' }}> fustal@gmail.com </span>
          , um die Registrierung deines Teams abzuschließen.
      </p>
    </div>
  )
}

export default InscriptionPdf