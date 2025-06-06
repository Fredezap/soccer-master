import { Formik, Form } from 'formik'
import { TournamentDetailsFormMap } from './TournamentDetailsFormMap.jsx'
import { useMessageStore } from '../../../../store/slices/useMessageStore.js'
import { Button } from 'react-bootstrap'
import TournamentDetailsFormData from './TournamentDetailsFormData.js'
import handleSubmitFormAdmin from '../handleSubmitFormAdmin.js'
import { useSubmittingFormStore } from '../../../../store/slices/useSubmittingFormStore.js'
import { useState } from 'react'
import formatDate from '../../../common/formatDate.js'
import { useTournamentsDetails } from '../../../../store/slices/useTournamentsDetails.js'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../store/constants/routes.js'
import deafultTournamentLogo from '../../../../images/tournamentDefaultLogo_1.png'
import deafultTournamentImg from '../../../../images/bg_3.jpg'

const BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_IMG_DEV_BASE_URL
  : import.meta.env.VITE_IMG_PROD_BASE_URL

// TODO: generar el endpoint de create, hacer que ande.
// TODO: Ver si elimino imagen del back (la que no se este usando? ya tenia un metodo parecido, esto al final de todo lo que tengo en el cuaderno)

const TournamentDetailsForm = () => {
  const navigate = useNavigate()
  const { addMessage } = useMessageStore()
  const defaultInitialValues = TournamentDetailsFormData().initialValues
  const { registerSchema, formFields } = TournamentDetailsFormData()
  const [initialValues, setInitialValues] = useState(defaultInitialValues)
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const [editTournamentDetails, setEditTournamentDetails] = useState(false)
  const { currentTournament, updateTournaments, setIsCreating, updateCurrentTournament } = useTournamentsDetails()
  const [files, setFiles] = useState([])
  let httpMethod

  const handleShowEditForm = () => {
    if (Object.entries(currentTournament).length > 0) {
      setInitialValues({
        name: currentTournament.name || '',
        date: currentTournament.date ? formatDate(currentTournament.date).dashDate : ''
      })
      setFiles([])
      setEditTournamentDetails(true)
    }
  }

  // todo: falta hacer andar este endpoint
  const handleSubmitFormCreate = async(values) => {
    console.log('VALUES: ', values)
    values = {
      ...values,
      tournamentId: currentTournament.tournamentId,
      files
    }

    const successResponse = 'Tournament has been created'
    const url = '/admin/tournament-details/create'
    httpMethod = 'postForImg'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      setIsCreating(false)
      updateTournaments(response.data?.tournamentDetails)
      updateCurrentTournament(response.data?.tournamentDetails)
      navigate(ROUTES.ADMIN.MAIN)
    }
  }

  const handleSubmitFormEdit = async(values) => {
    const successResponse = 'Tournament details has been edited'
    const url = '/admin/tournament-details/update'
    httpMethod = 'postForImg'

    values = {
      ...values,
      tournamentId: currentTournament.tournamentId,
      files
    }

    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      updateCurrentTournament(response.data.tournamentDetails)
      updateTournaments(response.data?.tournamentDetails)
      setEditTournamentDetails(false)
    }
  }

  const getTournamentLogo = (tournament) => {
    const tournamentLogo = tournament?.tournamentLogo
      ? `${BASE_URL}${tournament.tournamentLogo}`
      : deafultTournamentLogo
    return tournamentLogo
  }

  const getTournamentMainBgImg = (tournament) => {
    const tournamentMainBgImg = tournament?.mainBgImg
      ? `${BASE_URL}${tournament.mainBgImg}`
      : deafultTournamentImg
    return tournamentMainBgImg
  }

  return (
    <div className="form-main">
      {Object.entries(currentTournament).length > 0 && !editTournamentDetails
        ? (
          <div className="tournament-details">
            <div>
              <p>
                <span style={{ fontWeight: 'bold' }}>
                Date:
                </span>
                <span style={{ color: 'white' }}>
                  {currentTournament.date ? formatDate(currentTournament.date).slashDate : 'No date found'}
                </span>
              </p>
            </div>
            <div>
              <p>
                <span style={{ fontWeight: 'bold' }}>
                Name:
                </span>
                <span style={{ color: 'white' }}>
                  {currentTournament.name ? currentTournament.name : 'No name found'}
                </span>
              </p>
            </div>
            <div className="img-section">
              <p>
                <span style={{ fontWeight: 'bold' }}>
                Logo:
                </span>
              </p>
              <img src={getTournamentLogo(currentTournament)}>
              </img>
            </div>
            <div className="img-section">
              <p>
                <span style={{ fontWeight: 'bold' }}>
                Main BG Image:
                </span>
              </p>
              <img className="main-bg-img" src={getTournamentMainBgImg(currentTournament)}>
              </img>
            </div>
            <Button onClick={() => handleShowEditForm()} variant="secondary">
              Edit
            </Button>
          </div>
        )
        : (
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={registerSchema}
            onSubmit={!editTournamentDetails ? handleSubmitFormCreate : handleSubmitFormEdit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="admin-form">
                <TournamentDetailsFormMap
                  formFields={formFields}
                  setFiles={setFiles}
                  errors={errors}
                  touched={touched}
                />
                <div className="form-button">
                  {editTournamentDetails
                    ? (
                      <div>
                        <Button type="submit" variant="primary" disabled={submittingForm}>
                          Edit tournament details
                        </Button>
                        <Button onClick={() => setEditTournamentDetails(false)} variant="secondary" disabled={submittingForm}>
                          Cancel
                        </Button>
                      </div>
                    )
                    : (
                      <div>
                        <Button type="submit" variant="primary" disabled={submittingForm}>
                          {Object.entries(currentTournament).length === 0 ? ('Create tournament') : ('Set tournament details')}
                        </Button>
                      </div>
                    )}
                </div>
              </Form>
            )}
          </Formik>
        )}
    </div>
  )
}

export default TournamentDetailsForm