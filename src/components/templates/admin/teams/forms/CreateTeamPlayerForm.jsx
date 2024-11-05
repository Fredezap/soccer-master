import { Formik, Form } from 'formik'
import CreateTeamFormMap from './CreateTeamFormMap.jsx'
import createTeamPlayerFormData from './createTeamPlayerFormData.js'

const CreateTeamPlayerForm = () => {
  const { formFields, registerSchema, initialValues } = createTeamPlayerFormData()
  return (

    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
    >
      {({ errors, touched, setFieldValue, values, setErrors }) => (
        <Form className="admin-form">
          <CreateTeamFormMap
            formFields={formFields}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
            values={values}
            setErrors={setErrors}
          />
        </Form>
      )}
    </Formik>
  )
}

export default CreateTeamPlayerForm