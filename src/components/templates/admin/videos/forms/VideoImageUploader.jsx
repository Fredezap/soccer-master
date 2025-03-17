import { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'

const VideoImageUploader = ({ setPreview, preview, setFile, HandleImageError }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      /* global FileReader */
      const reader = new FileReader()
      reader.onloadend = () => {
        setFile({ reader: reader.result, file })
        HandleImageError()
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFile({ reader: reader.result, file })
        HandleImageError()
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDeleteImage = () => {
    setPreview(null)
    setFile(null)
  }

  return (
    <div>
      <div
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          position: 'relative'
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="file"
          name="file"
          onChange={handleImageChange}
        />
        <div className="video-image-loaded">
          <label htmlFor="file" className="img-uploader-box">
            {preview
              ? <img
                src={preview}
                alt="Preview"
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />

              : 'Upload video image here...'}

          </label>
          {preview &&
        (<div className="team-logo-form">
          <MdDeleteForever onClick={handleDeleteImage} className="delete-icon" />
        </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default VideoImageUploader