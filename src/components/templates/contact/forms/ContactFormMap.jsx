import PropTypes from 'prop-types'
import { ErrorMessage, Field } from 'formik'

const ContactFormMap = ({ formFields, errors, touched, submitting }) => {
  return (
    <>
      {formFields.map((data, index) => (
        <div className="form-group custom-input" key={index}>
          {data.type === 'textarea'
            ? (
              <Field
                as="textarea"
                name={data.id}
                id={data.id}
                className="form-control"
                rows="10"
                placeholder={data.placeholder}
              />
            )
            : (
              <Field
                type={data.type}
                name={data.id}
                id={data.id}
                className="form-control"
                placeholder={data.placeholder}
              />
            )}
          {errors[data.id] && touched[data.id] && (
            <ErrorMessage
              className="form-message error-message"
              component="div"
              name={data.id}
            />
          )}
        </div>
      ))}

      <div className="form-group">
        {/* <button disabled={submitting} type="submit" className="btn btn-primary py-3 px-5">
          Send Message
        </button> */}
        <button disabled={submitting} type="submit" className="btn btn-primary custom-button">
          Nachricht senden
        </button>
      </div>
    </>
  )
}

ContactFormMap.propTypes = {
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string,
      placeholder: PropTypes.string.isRequired
    })
  ).isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired
}

export default ContactFormMap