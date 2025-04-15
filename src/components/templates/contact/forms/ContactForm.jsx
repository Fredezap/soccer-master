import { Formik, Form } from 'formik'
import CreateTeamFormMap from './ContactFormMap.jsx'
import contactFormData from './contactFormData.js'
import postServiceForUser from '../../../../services/postServiceForUser.js'
import { useTournamentsDetails } from '../../../../store/slices/useTournamentsDetails.js'
import { useMessageStore } from '../../../../store/slices/useMessageStore.js'
import { useState } from 'react'

const ContactForm = () => {
  const { formFields, registerSchema, initialValues } = contactFormData()
  const { currentTournament } = useTournamentsDetails()
  const { addMessage } = useMessageStore()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async(formVvalues, { resetForm }) => {
    setSubmitting(true)
    const values = { ...formVvalues, tournamentId: currentTournament.tournamentId }
    const successResponse = 'Email has been sent'
    const url = '/email-sender/send-email'
    const httpMethod = 'post'
    const response = await postServiceForUser({ url, values, addMessage, successResponse })
    setSubmitting(false)
    if (response.success) resetForm()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, values, setErrors }) => (
        <div className="bg-dark site-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <Form>
                  <CreateTeamFormMap
                    formFields={formFields}
                    errors={errors}
                    touched={touched}
                    submitting={submitting}
                  />
                </Form>
              </div>
              <div className="col-lg-12 ml-auto">
                <ul className="list-unstyled contact-details">
                  <li className="mb-2">
                    <strong className="text-white d-block">Address</strong>
                  Erlenmattstrasse 110 4058 Basel, Switzerland
                  </li>
                  <li className="mb-2">
                    <strong className="text-white d-block">Email</strong>
                    <a href="#">stephanie.capomolla@kigaprima.ch</a>
                  </li>
                  <li className="mb-2">
                    <strong className="text-white d-block">Phone</strong>
                    <a href="#">+41 79 455 50 32</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default ContactForm