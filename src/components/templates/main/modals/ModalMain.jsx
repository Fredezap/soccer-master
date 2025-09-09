import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import ROUTES from '../../../../store/constants/routes'
import { useNavigate } from 'react-router-dom'
import mainImg from '../../../../images/FFH_Anmeldung_2025.jpg'

const ModalMain = () => {
  const [showModalMain, setShowModalMain] = useState(true)
  const navigate = useNavigate()

  return (
    <Modal
      size="lg" // mejor "lg" que "l"
      show={showModalMain}
      onHide={() => setShowModalMain(false)}
      centered
    >
      <div className="position-relative">
        <img
          src={mainImg}
          alt="mainImg"
          className="img-fluid w-100"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <Modal.Footer style={{ background: '#3a3737ff' }}>

        <Button className="button-modal-main" onClick={() => navigate(ROUTES.INFO)}>
            Hier anmelden
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalMain