import { useState } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useRegisterFormData } from './useRegisterFormData'
import { useRegisterYupValidations } from './useRegisterYupValidations'
import { RegisterMapFormData } from './RegisterMapFormData'
import ROUTES from '../../../../store/constants/routes.js'
import { useMessageStore } from '../../../../store/slices/useMessageStore.js'
import { useSubmittingFormStore } from '../../../../store/slices/useSubmittingFormStore.js'
import { Button } from 'react-bootstrap'
import handleSubmitFormAdmin from '../../admin/handleSubmitFormAdmin.js'
import Hero from '../../../common/hero/Hero.jsx'
import useHeroDetails from '../../../common/hero/useHeroDetails.js'
import { useUserStore } from '../../../../store/slices/useUserStore.js'

const RegisterForm = () => {
  const { data, initialValues, messages } = useRegisterFormData()
  const { registerSchema } = useRegisterYupValidations()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const { addMessage } = useMessageStore()
  const { user } = useUserStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()

  const handleFormSubmit = async(values) => {
    const httpMethod = 'post'
    const url = '/admin/users/register-admins'
    const successResponse = messages.success
    await handleSubmitFormAdmin({ url, values, addMessage, successResponse, httpMethod, setSubmittingForm, user })
  }

  const { adminRegister } = useHeroDetails()
  return (
    <div>
      <Hero title={adminRegister.title} />
      <div className="login-register">
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
                <div className="auth-btns-box centered-row">
                  <Button variant="light" onClick={() => navigate(ROUTES.ADMIN.USERS_MANAGMENT)}>
                    Go back
                  </Button>
                  <Button className="auth-btn" type="submit" disabled={submittingForm}>
                    Register
                  </Button>
                </div>
                {submittingForm && <p className="submitting-message">{messages.submitting}</p>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm