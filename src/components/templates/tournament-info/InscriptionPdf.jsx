import { FaFilePdf } from 'react-icons/fa'

const InscriptionPdf = () => {
  return (
    <div className="rules-main">
      {/* PDF embebido en iframe */}
      <div className="infos-img-container form">
        <img
          src="/tournament-rules/FFH_Anmeldung_form_2025.jpg"
          alt="Tournament Rules"
          className="info-img"
        />
      </div>

      {/* Botón para descargar el PDF */}
      <a
        href="/tournament-rules/FFH_Anmeldung_2025.pdf"
        download
      >
        <FaFilePdf className="text-xl" />
          Formular herunterladen
      </a>

      <p style={{ color: 'rgb(212, 242, 60)' }}>
        Lade das Formular herunter, fülle es aus. Die E-Mail-Adresse für den Versand wird in Kürze bekanntgegeben.
      </p>
      {/* <p style={{ color: 'rgb(212, 242, 60)' }}>
          Lade das Formular herunter, fülle es aus und sende es anschließend an
        <span style={{ color: 'rgb(250,104,121)' }}> fustal@gmail.com </span>
          , um die Registrierung deines Teams abzuschließen.
      </p> */}
    </div>
  )
}

export default InscriptionPdf