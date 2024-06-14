import React, { useState } from "react"
import { apiRequest } from "../../utils/api"
import { Link } from "react-router-dom"
import "../../css/searchComponent.css"

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [showResults, setShowResults] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSearch = async () => {
    try {
      const response = await apiRequest(
        "GET",
        `/search?searchTerm=${encodeURIComponent(searchTerm)}`,
        {
          "Content-Type": "application/json",
        }
      )
      const data = await response.json()
      if (data.length > 0) {
        setSearchResult(data)
        setShowResults(true)
        setErrorMessage("")
      } else {
        setSearchResult([])
        setShowResults(false)
        setErrorMessage("User not found")
      }
    } catch (error) {
      console.error("Error searching users:", error)
      setErrorMessage("An error occurred while searching users")
    }
  }

  const toggleResults = () => {
    setShowResults(!showResults)
  }

  return (
    <>
      <div className="title-container">
        <h2>Search:</h2>
      </div>
      <div className="container-page">
        <div className="search-bar my">
          <input
            type="text"
            id="newMessageInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="..."
            className="searchTerm"
          />
          <button className="searchButton" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
        {searchResult.length > 0 && (
          <div className="results-container">
            <button className="user-button" onClick={toggleResults}>
              {showResults ? "Hide Results" : "Show Results"}
            </button>
            {showResults && (
              <div>
                <h2>Results:</h2>
                <ul className="results-list">
                  {searchResult.map((user) => (
                    <li key={user._id} className="result-item">
                      <Link to={`/UserPage/${user._id}`}>{user.username}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default SearchComponent
