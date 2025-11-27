import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const EyePassword = ({ id, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) => {
  return (
    <div>
      {id === 'password'
        ? showPassword
          ? (
            <FaRegEye className="show-password" onClick={() => setShowPassword(!showPassword)} />
          )
          : (
            <FaRegEyeSlash className="show-password" onClick={() => setShowPassword(!showPassword)} />
          )
        : null}
      {id === 'confirmationPassword'
        ? showConfirmPassword
          ? (
            <FaRegEye className="show-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
          )
          : (
            <FaRegEyeSlash className="show-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
          )
        : null}
    </div>
  )
}

export default EyePassword