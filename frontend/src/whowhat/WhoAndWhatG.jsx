import React, { useState, useEffect } from "react"
import "../css/generate.css"
import { jsonApiRequest } from "../utils/api"

const WhoAndWhatG = () => {
  const [character, setCharacter] = useState("")
  const [activity, setActivity] = useState("")
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    jsonApiRequest("GET", "/api/characters")
      .then((response) => response.json())
      .then((data) => {
        const randomCharacter = data[Math.floor(Math.random() * data.length)]
        setCharacter(randomCharacter.name)
      })
      .catch((error) => console.error("Error fetching characters:", error))

    jsonApiRequest("GET", "/api/activities")
      .then((response) => response.json())
      .then((data) => {
        const randomActivity = data[Math.floor(Math.random() * data.length)]
        setActivity(randomActivity.name)
      })
      .catch((error) => console.error("Error fetching activities:", error))
  }, [])

  const generateRandom = () => {
    setShowContent(false)

    const characterPromise = jsonApiRequest("GET", "/api/characters")
      .then((response) => response.json())
      .then((data) => {
        const randomCharacter = data[Math.floor(Math.random() * data.length)]
        setCharacter(randomCharacter.name)
      })
      .catch((error) => {
        console.error("Error fetching characters:", error)
        setCharacter("")
      })

   
    const activityPromise = jsonApiRequest("GET", "/api/activities")
      .then((response) => response.json())
      .then((data) => {
        const randomActivity = data[Math.floor(Math.random() * data.length)]
        setActivity(randomActivity.name)
      })
      .catch((error) => {
        console.error("Error fetching activities:", error)
        setActivity("")
      })

    Promise.all([characterPromise, activityPromise]).then(() => {
      setShowContent(true)
    })
  }

  return (
    <div className="character-page">
      <div className="generate-container">
        <div className="Random">
          <div className="content-section">
            <h3>Random Character:</h3>
            {showContent && <p>{character}</p>}{" "}
          </div>
          <div className="content-section">
            <h3>Random Activity:</h3>
            {showContent && <p>{activity}</p>}{" "}
          </div>
          <div className="character-btn">
            <button className="generate-btn" onClick={generateRandom}>
              Generate Character And Action
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhoAndWhatG
