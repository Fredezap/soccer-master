import * as Yup from 'yup'
import { useLoginFormData } from './useLoginFormData.js'

export const useLoginYupValidations = () => {
  const { errors } = useLoginFormData()

  const registerSchema = Yup.object().shape(
    {
      email: Yup.string()
        .email(errors.email_invalid)
        .required(errors.email_required),
      password: Yup.string()
        .required(errors.password_required)
    }
  )

  return { registerSchema }
}