import React from 'react'
import Label from '../../../common/forms-parts/Label'
import { ErrorMessage, Field } from 'formik'
import EyePassword from '../../../common/forms-parts/EyePassword'

export const LoginMapFormData = ({ data, errors, touched, showPassword, setShowPassword }) => {
  return (
    <div className="login-form-data">
      {data.map((data, index) => (
        <div key={index}>
          <Label>{data.label}</Label>
          <div className={data.id === 'password' ? 'show-password-box' : ''}>
            <Field
              className="input"
              id={data.id}
              name={data.id}
              autoComplete={data.label}
              placeholder={data.placeholder}
              type={data.id === 'password' && showPassword ? 'text' : data.type}
            />
            <EyePassword
              id={data.id}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
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