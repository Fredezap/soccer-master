import { Formik, Form } from 'formik'
import CreateTeamFormMap from './CreateTeamFormMap.jsx'
import createTeamNameFormData from './createTeamNameFormData.js'

const CreateTeamNameForm = () => {
  const { formFields, registerSchema, initialValues } = createTeamNameFormData()
  return (

    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={() => { console.log('ACA ERROR') }}
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

export default CreateTeamNameForm