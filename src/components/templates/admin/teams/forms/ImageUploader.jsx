import { useTeamStore } from '../../../../../store/slices/useTeamStore'

const ImageUploader = () => {
  const { setTeamLogo } = useTeamStore()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      /* global FileReader */
      const reader = new FileReader()
      reader.onloadend = () => {
        setTeamLogo({ reader: reader.result, file })
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
        setTeamLogo({ reader: reader.result, file })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
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
        <label htmlFor="file" className="img-uploader-box">
            Upload team logo here...
        </label>
      </div>
    </div>
  )
}

export default ImageUploader