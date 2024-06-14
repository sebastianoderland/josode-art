import React, { useState, useEffect } from "react"
import "../css/generate.css"
import { jsonApiRequest } from "../utils/api"

const PlaceAndFeelG = () => {
  const [feeling, setFeeling] = useState("")
  const [place, setPlace] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    jsonApiRequest("GET", "/api/placeFeel/feelings")
      .then((response) => response.json())
      .then((data) => {
        const randomFeeling = data[Math.floor(Math.random() * data.length)]
        setFeeling(randomFeeling)
      })
      .catch((error) => console.error("Error fetching feelings:", error))

    jsonApiRequest("GET", "/api/placeFeel/places")
      .then((response) => response.json())
      .then((data) => {
        const randomPlace = data[Math.floor(Math.random() * data.length)]
        setPlace(randomPlace)
      })
      .catch((error) => console.error("Error fetching places:", error))
  }

  const generateRandom = () => {
    fetchData()
    setShowContent(true)
  }

  return (
    <div className="character-page">
      <div className="generate-container">
        <div className="Random">
          <div className="content-section">
            <h3>Random Feeling:</h3>
            {showContent && <p>{feeling}</p>}
          </div>
          <div className="content-section">
            <h3>Random Place:</h3>
            {showContent && <p>{place}</p>}
          </div>
          <div className="character-btn">
            <button className="generate-btn" onClick={generateRandom}>
              Generate Place And Feeling
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceAndFeelG
