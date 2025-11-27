import * as Yup from 'yup'
import { useRegisterFormData } from './useRegisterFormData.js'

export const useRegisterYupValidations = () => {
  const { errors } = useRegisterFormData()

  const registerSchema = Yup.object().shape(
    {
      email: Yup.string()
        .email(errors.email_invalid)
        .required(errors.email_required),
      password: Yup.string()
        .required(errors.password_required)
        .min(8, errors.password_min)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, errors.password_invalid),
      confirmationPassword: Yup.string()
        .required(errors.confirmation_password_required)
        .oneOf([Yup.ref('password'), null], errors.confirmation_password_match)
    }
  )

  return { registerSchema }
}