import { useState } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useLoginFormData } from './useLoginFormData.js'
import { useLoginYupValidations } from './useLoginYupValidations.js'
import { LoginMapFormData } from './LoginMapFormData.jsx'
import ROUTES from '../../../../store/constants/routes.js'
import { useSubmittingFormStore } from '../../../../store/slices/useSubmittingFormStore.js'
import { Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../store/slices/useMessageStore.js'
import postService from '../../../../services/postService.js'
import handleSubmitFormAdmin from '../../admin/handleSubmitFormAdmin.js'

const LoginForm = () => {
  const { data, initialValues, messages } = useLoginFormData()
  const { registerSchema } = useLoginYupValidations()
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleFormSubmit = async(values) => {
    const url = '/auth/login'
    const successResponse = messages.success
    const response = await postService({ url, values, addMessage, successResponse })

    if (response?.success) {
      const data = response.data
      if (data) {
        const user = JSON.stringify(data)
        globalThis.localStorage.setItem('user', user)
        navigate(ROUTES.ADMIN.MAIN)
      }
    }
  }

  return (
    <div className="admin-all-mains">
      <div className="form-main">
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className="auth-form">
              <LoginMapFormData
                data={data}
                errors={errors}
                touched={touched}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <Button type="submit" disabled={submittingForm}>
                Login
              </Button>
              <a href={ROUTES.REGISTER}>Register</a>
              {submittingForm && <p>{messages.submitting}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default LoginForm