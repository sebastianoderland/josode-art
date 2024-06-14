import React, { useState } from "react"
import { apiRequest } from "../../utils/api"

const MyPageForm = ({ token }) => {
  const [text, setText] = useState("")
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No file chosen")
  const [isFileUploading, setIsFileUploading] = useState(false)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setFileName(file ? file.name : "No file chosen")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("text", text)
    formData.append("image", image)

    try {
      setIsFileUploading(true)
      await apiRequest(
        "POST",
        "my-page/posts",
        {
          Authorization: `Bearer ${token}`,
        },
        formData
      )
      setText("")
      setImage(null)
      setFileName("No file chosen")
      setIsFileUploading(false)
      window.location.reload()
    } catch (error) {
      console.error("Error creating post:", error)
      setIsFileUploading(false)
    }
  }

  return (
    <div className="my-form-container">
      <form className="my-form" onSubmit={handleSubmit}>
        <h3 className="text-label">Text:</h3>
        <input
          type="text"
          id="newMessageInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="..."
          className="input-field"
        />

        <div className="file-upload-container">
          <label htmlFor="fileUpload" className="file-upload-label">
            Choose a file: <span className="file-name">{fileName}</span>
          </label>
          <input
            type="file"
            id="fileUpload"
            accept="image/*"
            onChange={handleFileUpload}
            className="file-upload-input"
            hidden
          />
          {isFileUploading && (
            <p className="uploading-message">Uploading file...</p>
          )}
        </div>
        <button
          className="fill-button"
          type="submit"
          disabled={isFileUploading}
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default MyPageForm
