import { Formik, Form } from 'formik'
import { TournamentDetailsFormMap } from './TournamentDetailsFormMap.jsx'
import { useMessageStore } from '../../../../store/slices/useMessageStore.js'
import { Button } from 'react-bootstrap'
import useLoginFormData from './TournamentDetailsFormData.js'
import handleSubmitFormAdmin from '../handleSubmitFormAdmin.js'
import { useSubmittingFormStore } from '../../../../store/slices/useSubmittingFormStore.js'
import { useEffect, useState } from 'react'
import handleGetData from '../handleGetData.js'
import formatDate from '../../../common/formatDate.js'

const TournamentDetailsForm = () => {
  const { addMessage } = useMessageStore()
  const { initialValues, registerSchema, formFields } = useLoginFormData()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const [tournamentDetails, setTournamentDetails] = useState(null)
  const [editTournamentDetails, setEditTournamentDetails] = useState(false)
  let httpMethod

  const handleSubmitFormCreate = async(values) => {
    console.log('submitting form create', submittingForm)
    const successResponse = 'Tournament details has been set'
    const url = '/admin/tournament-details/create'
    httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    console.log('response.data', response.data)
    if (response.success) {
      setTournamentDetails(response.data.tournamentDetails)
    }
  }

  const handleSubmitFormEdit = async(values) => {
    // todo: add endpoint to patch the data
    console.log('submitting form edit', submittingForm)
    const successResponse = 'Tournament details has been set'
    const url = '/admin/tournament-details/update'
    httpMethod = 'patch'
    console.log('ACA EN TOURNAMENT DETAILS: ', tournamentDetails.tournamentDetailsId)
    // todo: chequear este envio de datos, el id no esta llegando
    values = { ...values, tournamentDetailsId: tournamentDetails.tournamentDetailsId }
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    console.log('response.data', response.data)
    if (response.success) {
      setTournamentDetails(response.data.tournamentDetails)
      setEditTournamentDetails(false)
    }
  }

  const getTournamentDetails = async() => {
    const url = '/admin/tournament-details/get-details'
    const response = await handleGetData({ url, addMessage })
    console.log('response.data', response.data.tournamentDetails)
    if (response.success) { setTournamentDetails(response.data.tournamentDetails) }
  }

  useEffect(() => {
    getTournamentDetails()
  }, [])
  // tournamentDetails = null
  return (
    <div className="form-main">
      {tournamentDetails && !editTournamentDetails
        ? (
          <div className="tournament-details">
            <p>
              <span style={{ fontWeight: 'bold' }}>
                Date:
              </span>
              <span style={{ color: 'white' }}>
                {formatDate(tournamentDetails.date).slashDate}
              </span>
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>
                Name:
              </span>
              <span style={{ color: 'white' }}>
                {tournamentDetails.name ? tournamentDetails.name : 'No name seted'}
              </span>
            </p>
            <Button onClick={() => setEditTournamentDetails(true)} variant="secondary">
              Edit
            </Button>
          </div>
        )
        : (
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={!editTournamentDetails ? handleSubmitFormCreate : handleSubmitFormEdit}>
            {({ errors, touched, setFieldValue }) => (
              <Form className="form">
                <TournamentDetailsFormMap formFields={formFields} errors={errors} touched={touched} values={tournamentDetails} setFieldValue={setFieldValue}/>
                <div className="form-button">
                  {editTournamentDetails
                    ? (
                      <div>
                        <Button type="submit" variant="primary" disabled={submittingForm}>
                          Confirm
                        </Button>
                        <Button onClick={() => setEditTournamentDetails(false)} variant="secondary" disabled={submittingForm}>
                          Cancel
                        </Button>
                      </div>
                    )
                    : (
                      <div>
                        <Button type="submit" variant="primary" disabled={submittingForm}>
                          Confirm
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