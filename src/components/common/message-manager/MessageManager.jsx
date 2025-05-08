import { IoMdCloseCircle } from 'react-icons/io'
import { useMessageStore } from '../../../store/slices/useMessageStore'
import { FaCheckCircle } from 'react-icons/fa'

// ATTENTION: If the messages are rendering twice in development, it is
//            because of <React.StrictMode> which is used to prevent
//            and identify errors and unwanted side effects.
//            In production and with the build running, this does not happen.

/**
 * MessageManager Component
 *
 * The model for a message is:
 * @typedef {Object} Message
 * @property {'success' | 'error' | 'submitting' } type - The type of the message.
 * @property {any} content - The content of the message.
 *
 * @returns {JSX.Element} The rendered component.
 */

const MessageManager = () => {
  const { messages } = useMessageStore()

  return (
    messages.length > 0
      ? messages.map((message, index) => (
        <div key={index} className="message-manager-box">
          {message.type === 'error'
            ? (<IoMdCloseCircle className="error-icon" />)
            : message.type === 'success'
              ? (<FaCheckCircle className="success-icon" />)
              : null
          }
          <p className={`manager-message ${message.type}`}>{message.content}</p>
        </div>
      ))
      : null
  )
}

export default MessageManager