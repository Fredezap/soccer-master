import { ErrorMessage, Field } from 'formik'
import PropTypes from 'prop-types'
import Label from '../../../../../common/forms-parts/Label'

const AddStagesFormMap = ({ formFields, errors, touched }) => {
  return (
    <div className="form-columns-stages">
      {formFields?.map(field => (
        <div className="form-group" key={field.id}>
          {field.type === 'radio'
            ? (
              <div key={field.id}>
                <Label>{field.label}</Label>
                {field.options.map(option => (
                  <label className="radio-options" key={option.value}>
                    <Field
                      type="radio"
                      name={field.id}
                      value={option.value}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )
            : (
              <div key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                {field.id === 'order' && (
                  <p className="order-info">
                    Please enter the order of the stage based on its phase within the tournament.
                    For example, if you are entering the first phase of the tournament, set the order to 1.
                    If this is the second phase, set it to 2, and so on.
                    This order will help structure the tournament stages sequentially and
                    ensure they are displayed in the correct order. Thank you!
                  </p>
                )}
                <Field
                  className={`input ${field.id === 'order' && 'order-input'}`}
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              </div>
            )}
          {errors[field.id] && touched[field.id] && (
            <ErrorMessage className="form-message error-message" component="div" name={field.id} />
          )}
        </div>
      ))}
    </div>
  )
}

export default AddStagesFormMap

AddStagesFormMap.propTypes = {
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired
}