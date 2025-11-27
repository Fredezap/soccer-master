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
              {(currentTournament?.Contact?.contactAddress ||
               currentTournament.Contact?.contactEmail ||
               currentTournament.Contact?.contactPhone) && (
                <div className="col-lg-12 ml-auto">
                  <ul className="list-unstyled contact-details">
                    {currentTournament.Contact?.contactAddress && (
                      <li className="mb-2">
                        <strong className="text-futsal-for-her d-block">Address</strong>
                        <a style={{ color: 'rgb(250,104,121)' }}>{currentTournament.Contact?.contactAddress}</a>
                      </li>
                    )}
                    {currentTournament.Contact?.contactEmail && (
                      <li className="mb-2">
                        <strong className="text-futsal-for-her d-block">Email</strong>
                        <a style={{ color: 'rgb(250,104,121)' }}>{currentTournament.Contact?.contactEmail}</a>
                      </li>
                    )}
                    {currentTournament.Contact?.contactPhone && (
                      <li className="mb-2">
                        <strong className="text-futsal-for-her d-block">Phone</strong>
                        <a style={{ color: 'rgb(250,104,121)' }}>{currentTournament.Contact?.contactPhone}</a>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default ContactForm