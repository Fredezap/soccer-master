import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useSubmittingFormStore } from '../../../../../store/slices/useSubmittingFormStore'
import Label from '../../../../common/forms-parts/Label'
import { Button } from 'react-bootstrap'
import { useTournamentsDetails } from '../../../../../store/slices/useTournamentsDetails'
import handleSubmitFormAdmin from '../../handleSubmitFormAdmin'
import { useMessageStore } from '../../../../../store/slices/useMessageStore'
import getTournaments from '../../../../common/getters/GetTournaments'
import useFooterContactFormData from './useFooterContactFormData'

const FooterContactSetter = () => {
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const { initialValues, registerSchema, formFields } = useFooterContactFormData()
  const { currentTournament } = useTournamentsDetails()
  const { addMessage } = useMessageStore()
  const { fetchTournamentDetails } = getTournaments()

  const setContactDetails = async(values) => {
    values = { values, tournamentId: currentTournament.tournamentId }
    const successResponse = 'Footer contact details has been updated'
    const url = '/admin/contact/set-footer-contact-details'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      await fetchTournamentDetails()
    }
  }

  return (
    <div>
      <div className="site-section bg-dark">
        <div className="container">
          <h1 className="text-2xl font-bold">Footer contact deatils</h1>
          <h5 className="text-lg mt-2">
            Set the web page and social media of the tournament here
          </h5>
          <p style={{ color: 'orange' }}>
            Please ensure you enter URLs correctly to avoid errors. For example,
            typing "www.youtube.com" instead of "https://www.youtube.com/" may cause the link not to work.
          </p>
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
                  <Button disabled={submittingForm} type="submit" variant="success">Set footer contact details</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default FooterContactSetter

// "https://www.futsalolympiquebasel.ch/"
// "https://www.instagram.com/futsalolympiquebasel_offiziell/?hl=es-la"