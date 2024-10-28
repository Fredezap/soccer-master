import PropTypes from 'prop-types'

const Label = (props) => {
  return (
    <div className="label-box">
      <label className="label">{props.children}</label>
    </div>
  )
}

Label.propTypes = {
  children: PropTypes.node.isRequired
}

export default Label