import { Formik, Form } from 'formik'
import { TournamentDetailsFormMap } from './TournamentDetailsFormMap.jsx'
import { useMessageStore } from '../../../../store/slices/useMessageStore.js'
import { Button } from 'react-bootstrap'
import useLoginFormData from './TournamentDetailsFormData.js'
import handleSubmitFormAdmin from '../handleSubmitFormAdmin.js'
import { useSubmittingFormStore } from '../../../../store/slices/useSubmittingFormStore.js'
import { useEffect, useState } from 'react'
import handleGetData from '../handleGetData.js'

const TournamentDetailsForm = () => {
  const { addMessage } = useMessageStore()
  const { initialValues, registerSchema, formFields } = useLoginFormData()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const [tournamentDetails, setTournamentDetails] = useState(null)

  const handleSubmitForm = async(values) => {
    console.log('submitting form', submittingForm)
    const successResponse = 'Tournament details has been setted'
    const url = '/admin/tournament-details/create'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm })
    console.log('response.data', response.data)
    if (response.success) { setTournamentDetails(response.data.tournamentDetails) }
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
  console.log('tournamentDatails', tournamentDetails)
  // console.log('tournamentDatails', tournamentDatails.date)
  // todo: si hay tournamentDetails Mostrar los datos, con un boton de editar.
  // todo: Al hacer click, traer el formulario, o hacer los campos modificables, inputs.
  // todo: Agregar el endopint para hacer el update y trabajarlo en el back
  return (
    <div className="form-main">
      {tournamentDetails && (<div>
        <p style={{ color: 'white' }}>{tournamentDetails.date}</p>
        <p>{tournamentDetails.name}</p>
      </div>)}
      <Formik initialValues = { initialValues } validationSchema = { registerSchema } onSubmit={handleSubmitForm}>
        {({ errors, touched }) => (
          <Form className="form">
            <TournamentDetailsFormMap formFields={formFields} errors={errors} touched={touched} />
            <div className="form-button">
              <Button type="submit" variant="primary" disabled={submittingForm}>
                  Confirm
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default TournamentDetailsForm