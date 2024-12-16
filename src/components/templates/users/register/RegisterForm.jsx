import { useState } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useRegisterFormData } from './useRegisterFormData'
import { useRegisterYupValidations } from './useRegisterYupValidations'
import { RegisterMapFormData } from './RegisterMapFormData'
import ROUTES from '../../../../store/constants/routes.js'
import postService from '../../../../services/postService.js'
import { useMessageStore } from '../../../../store/slices/useMessageStore.js'
import { useSubmittingFormStore } from '../../../../store/slices/useSubmittingFormStore.js'
import { Button } from 'react-bootstrap'

const RegisterForm = () => {
  const { data, initialValues, messages } = useRegisterFormData()
  const { registerSchema } = useRegisterYupValidations()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const { addMessage } = useMessageStore()
  const { submittingForm } = useSubmittingFormStore()

  const handleFormSubmit = async(values) => {
    const url = '/auth/register'
    const successResponse = messages.success
    const response = await postService({ url, values, addMessage, successResponse })

    if (response?.success) {
      navigate(ROUTES.LOGIN)
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
              <RegisterMapFormData
                data={data}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                errors={errors}
                touched={touched}
              />
              <Button type="submit" disabled={submittingForm}>
              Register
              </Button>
              <a href={ROUTES.LOGIN}>Login</a>
              {submittingForm && <p>{messages.submitting}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RegisterForm