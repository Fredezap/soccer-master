import { Formik, Form } from 'formik'
import { CreateGroupFormMap } from './CreateGroupFormMap.jsx'
import createGroupFormData from './createGroupFormData.js'
import handleSubmitFormAdmin from '../../../handleSubmitFormAdmin.js'
import { useMessageStore } from '../../../../../../store/slices/useMessageStore.js'
import { useSubmittingFormStore } from '../../../../../../store/slices/useSubmittingFormStore.js'
import { Button } from 'react-bootstrap'

const CreateGroupForm = ({ getData, stageId }) => {
  const { formFields, registerSchema, initialValues } = createGroupFormData()
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()

  const createGroup = async(values, { resetForm }) => {
    values = { ...values, stageId }
    const successResponse = 'Team has been created'
    const url = '/admin/fixture/groups/create'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      getData()
      resetForm()
    }
  }

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={createGroup}
    >
      {({ errors, touched }) => (
        <Form>
          <CreateGroupFormMap
            formFields={formFields}
            errors={errors}
            touched={touched}
          />
          <div>
            <Button type="submit" variant="light" disabled={submittingForm}>
              Add new group
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CreateGroupForm