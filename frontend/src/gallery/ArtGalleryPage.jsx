import React, { useState, useRef } from "react"
import axios from "axios"
import defaultImage from "../assets/artGallery.jpg"
import "../css/artGallery.css"

const ArtGalleryPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [artGalleries, setArtGalleries] = useState([])
  const [loading, setLoading] = useState(false)
  const arrowRef = useRef(null)

  const handleSearch = async () => {
    setLoading(true)
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const response = await axios.get(
          `https://my-art-server.onrender.com/maps/art-galleries?query=art+galleries&types=art_gallery&radius=50000&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
        )

        const filteredResults = response.data.filter((gallery) => {
          const nameMatches = gallery.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
          const addressMatches = gallery.formatted_address
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
          return nameMatches || addressMatches
        })
        const limitedResults = filteredResults.slice(0, 5)
        setArtGalleries(limitedResults)
        if (arrowRef.current && limitedResults.length > 0) {
          arrowRef.current.style.display = "flex"
        }
        setLoading(false)
      })
    } catch (error) {
      console.error("Error searching for art galleries:", error)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleScroll = () => {
    window.scrollTo({
      top: 700,
      behavior: "smooth",
    })
  }

  return (
    <div className="top-container">
      <div className="main-content">
        <div className="title-art">
          <div className="under-title">
            <div className="title-info">
              <h3>Search for a location!</h3>{" "}
              <p>
                Discover the vibrant world of art around your location. Search
                for art galleries and exhibitions nearby to immerse yourself in
                creativity and culture. Find out how many art galleries are
                available in your area and plan your next artistic adventure!
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch()
          }}
          className="search-container"
        >
          <div className="search-bar">
            <input
              type="text"
              id="newMessageInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter location..."
              className="searchTerm"
            />
            <button
              type="submit"
              aria-label="search button art gallery"
              className="searchButton"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      {!searchQuery && (
        <footer className="app-footer">
          <div className="footer-content">
            <p>&copy; Uses Google Maps.</p>
          </div>
        </footer>
      )}
      {loading ? (
        <div className="loading-container">
          <h4 className="loading">Loading...</h4>
        </div>
      ) : (
        <div>
          {artGalleries.length > 0 && (
            <div className="arrow-more" onClick={handleScroll} ref={arrowRef}>
              <p>Places</p>
              <i
                className="fas fa-chevron-down"
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          )}
          <div className="gallery-container">
            {artGalleries.length > 0
              ? artGalleries.map((gallery, index) => (
                  <div key={index} className="gallery-item-container">
                    <div key={index} className="gallery-item">
                      <div className="gallery-info">
                        <h3>{gallery.name}</h3>
                        <div className="art-description">
                          <p>Location: {gallery.formatted_address}</p>
                          <p>
                            Opening Hours:{" "}
                            {gallery.opening_hours &&
                            gallery.opening_hours.open_now
                              ? "Open Now"
                              : "Closed"}
                          </p>
                        </div>
                      </div>
                      <div className="art-container">
                        {gallery.photos && gallery.photos.length > 0 ? (
                          <img
                            className="map-img"
                            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${gallery.photos[0].photo_reference}&key=AIzaSyC3bo_j2nNUnH_7w7cDaR2p1WnRvN8-1w4`}
                            alt="Art Gallery"
                          />
                        ) : (
                          <img src={defaultImage} alt="Default" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      )}

      {searchQuery !== "" && !loading && artGalleries.length === 0 && (
        <p>No art galleries found in this location.</p>
      )}
    </div>
  )
}

export default ArtGalleryPage
