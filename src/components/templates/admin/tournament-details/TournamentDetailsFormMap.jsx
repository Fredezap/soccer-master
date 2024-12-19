import PropTypes from 'prop-types'
import Label from '../../../common/forms-parts/Label'
import { ErrorMessage, Field } from 'formik'

export const TournamentDetailsFormMap = ({ formFields, errors, touched, values, setFieldValue }) => {
  return (
    <div className="form-columns">
      {formFields.map((data, index) => (
        <div className="form-group" key={index}>
          <Label>{data.label}</Label>
          <div>
            <Field
              className="input"
              id={data.id}
              name={data.id}
              autoComplete={data.label}
              placeholder={data.placeholder}
              type={data.type}
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

TournamentDetailsFormMap.propTypes = {
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired
    })
  ).isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired
}