import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import ImageCarousel from "./ImageCarousel"
import RecentMessages from "./RecentMessages"
import "../css/Home.css"
import artGalleryImage from "../assets/pexels-tima-miroshnichenko-5725589.jpg"

const Home = () => {
  useEffect(() => {
    document.body.classList.add("home")
    return () => {
      document.body.classList.remove("home")
    }
  }, [])

  return (
    <div className="home-page">
      <div className="home-desktop">
        <div className="page">
          <ImageCarousel />
        </div>
        <div className="scrolling-text-container">
          <h2 className="scrolling-text"> Out of ideas? We can help! </h2>
        </div>
      </div>
      <div className="tablet-container">
        <div className="art-map-container">
          <div className="art-map">
            <Link to="/art-gallery">
              <img
                className="homemap-img"
                src={artGalleryImage}
                alt="Explore Art Galleries"
              />
              <h3 className="overlay-text">Find an Art Gallery Near You</h3>
            </Link>
          </div>
        </div>
        <div className="under-scroll">
          <div className="scrolling-text-container">
            <h2 className="scrolling-text"> Recent Messages! </h2>
          </div>
        </div>
        <RecentMessages />
      </div>
    </div>
  )
}

export default Home
