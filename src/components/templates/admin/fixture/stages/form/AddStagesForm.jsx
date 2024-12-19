import { Formik } from 'formik'
import AddStagesFormMap from './AddStagesFormMap'
import addStagesFormData from './addStagesFormData'
import { Button, Form } from 'react-bootstrap'
import { useSubmittingFormStore } from '../../../../../../store/slices/useSubmittingFormStore'
import { useMessageStore } from '../../../../../../store/slices/useMessageStore'
import handleSubmitFormAdmin from '../../../handleSubmitFormAdmin'
import { useTournamentsDetails } from '../../../../../../store/slices/useTournamentsDetails'

const AddStagesForm = ({ getStages }) => {
  const { initialValues, registerSchema, formFields } = addStagesFormData()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()
  const { currentTournament } = useTournamentsDetails()

  const handleSubmitFormCreate = async(formValues, { resetForm }) => {
    const successResponse = 'Stage has been created successfully'
    const url = '/admin/fixture/stages/create'
    const httpMethod = 'post'
    const values = { ...formValues, tournamentId: currentTournament?.tournamentId }
    const response = await handleSubmitFormAdmin({
      values,
      url,
      addMessage,
      successResponse,
      setSubmittingForm,
      httpMethod
    })
    if (response.success) {
      getStages()
      resetForm()
    }
  }

  return (
    <div>
      <h5>Add an stage</h5>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmitFormCreate}
      >
        {({ errors, touched, handleSubmit, resetForm }) => (
          <Form className="stages-form" onSubmit={handleSubmit}>
            <AddStagesFormMap errors={errors} touched={touched} formFields={formFields}/>
            <Button variant="light" disabled={submittingForm} type="submit">Add stage</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddStagesForm