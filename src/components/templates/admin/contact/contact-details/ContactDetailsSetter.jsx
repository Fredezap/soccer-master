import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useSubmittingFormStore } from '../../../../../store/slices/useSubmittingFormStore'
import Label from '../../../../common/forms-parts/Label'
import useContactDetailsFormData from './useContactDetailsFormData'
import { Button } from 'react-bootstrap'
import { useTournamentsDetails } from '../../../../../store/slices/useTournamentsDetails'
import handleSubmitFormAdmin from '../../handleSubmitFormAdmin'
import { useMessageStore } from '../../../../../store/slices/useMessageStore'
import getTournaments from '../../../../common/getters/GetTournaments'

const ContactDetailsSetter = () => {
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const { initialValues, registerSchema, formFields } = useContactDetailsFormData()
  const { currentTournament } = useTournamentsDetails()
  const { addMessage } = useMessageStore()
  const { fetchTournamentDetails } = getTournaments()

  const setContactDetails = async(values) => {
    values = { values, tournamentId: currentTournament.tournamentId }
    const successResponse = 'Contact details has been updated'
    const url = '/admin/contact/set-contact-details'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      await fetchTournamentDetails()
    }
  }

  return (
    <div>
      <div className="site-section bg-light">
        <div className="container">
          <h1 className="text-2xl font-bold">Contact Deatils</h1>
          <h5 className="text-lg mt-2">
            Set the tournament contact details
          </h5>
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={setContactDetails}
          >
            {() => (
              <Form className="form-columns set-video">
                {formFields.map((data) => (
                  <div className="form-group" key={data.id}>
                    <Label>{data.label}</Label>
                    <Field
                      className="input"
                      id={data.id}
                      name={data.id}
                      placeholder={data.placeholder}
                      type={data.type}
                    />
                    <ErrorMessage className="form-message error-message" component="div" name={data.id} />
                  </div>
                ))}
                <div className="video-button">
                  <Button disabled={submittingForm} type="submit" variant="success">Set contact details</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ContactDetailsSetter

// Address
// Erlenmattstrasse 110 4058 Basel, Switzerland
// Email
// stephanie.capomolla@kigaprima.ch
// Phone
// +41 79 455 50 32