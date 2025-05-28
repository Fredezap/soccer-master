import { useField, useFormikContext } from 'formik'
import { useState } from 'react'

const TournamentImageUploader = ({ name, label, setFiles }) => {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(name)
  const [preview, setPreview] = useState(null)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const maxSize = 5 * 1024 * 1024 // 5 MB

    if (file.size > maxSize) {
      setMessage('La imagen no puede superar los 5 MB.')
      document.getElementById(name).value = null
      return
    }

    /* global FileReader */
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)

      /* global Image */
      const img = new Image()
      img.src = reader.result
      img.onload = () => {
        if ((img.width < 1920 || img.height < 1080) && name === 'mainBgImg') {
          setMessage(`Image loaded correctly. It is recomended a resolution of at
             least 1920x1080 (full hd) to have a good background image quality.
             Current resolution: ${img.width} x ${img.height}`)
        }
      }

      setFiles(prev => {
        const filtered = prev.filter(item => item.id !== name)
        return [...filtered, { file, id: name }]
      })
      setFieldValue(name, file.name)
    }

    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setPreview(null)
    setFiles(prev => prev.filter(item => item.id !== name))
    setFieldValue(name, '')
    setMessage('')
    document.getElementById(name).value = null
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>{label}</label>
      <div
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          position: 'relative'
        }}
        onClick={() => document.getElementById(name).click()}
      >
        {preview
          ? (
            <img
              src={preview}
              alt="preview"
              style={{
                maxWidth: '100%',
                height: '150px',
                objectFit: 'cover'
              }}
            />
          )
          : (
            <span>Click o soltá la imagen aquí...</span>
          )}
      </div>

      {preview && (
        <button
          type="button"
          onClick={handleRemove}
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            background: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Eliminar imagen
        </button>
      )}

      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />

      {message && (
        <div style={{ color: 'yellow', marginTop: '8px', fontSize: '0.9rem' }}>
          {message}
        </div>
      )}

      {meta.touched && meta.error && (
        <div style={{ color: 'red', marginTop: '5px' }}>{meta.error}</div>
      )}
    </div>
  )
}

export default TournamentImageUploader