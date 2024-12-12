import Label from '../../../common/forms-parts/Label'
import { ErrorMessage, Field } from 'formik'
import EyePassword from '../../../common/forms-parts/EyePassword'

export const RegisterMapFormData = ({
  data,
  errors,
  touched,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword
}) => {
  const getInputType = (id, type) => {
    if (id === 'password') {
      return showPassword ? 'text' : type
    } else if (id === 'confirmationPassword') {
      return showConfirmPassword ? 'text' : type
    }
    return type
  }

  return (
    <div className="form-data">
      {data.map((data, index) => (
        <div key={index}>
          <Label>{data.label}</Label>
          <div className={data.id === 'password' || data.id === 'confirmationPassword' ? 'show-password-box' : ''}>
            <Field
              className="input"
              id={data.id}
              name={data.id}
              autoComplete={data.label}
              placeholder={data.placeholder}
              type={getInputType(data.id, data.type)}
            />
            <EyePassword
              id={data.id}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
            />
          </div>
          {errors[data.id] && touched[data.id] && (
            <ErrorMessage className="form-message error-message" component="div" name={data.id} />
          )}
        </div>
      ))}
    </div>
  )
}