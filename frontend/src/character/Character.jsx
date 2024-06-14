import React from "react"
import "../css/Draw.css"
import ImgOne from "../assets/pexels-craytive-1478477.jpg"
import ImgTwo from "../assets/CHAR.jpg"
import { Link } from "react-router-dom"

const Character = () => {
  const handleScroll = () => {
    const element = document.querySelector(".page-img")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="character-page">
      <div className="draw-info-container">
        <div className="draw-info-child">
          <div className="under-title">
            <h3>Random Character Generator</h3>{" "}
          </div>
          <div className="text">
            <p>
              Struggling with a creative dry spell? Introducing our random
              character generator, your go-to solution when inspiration runs
              dry! Our generator constructs unique characters with intricate
              details spanning from nose shape to hairstyle. Whether you're
              crafting a new protagonist for your story or simply seeking a muse
              for your artwork, our generator offers the creative spark you
              need. Prepare to be captivated by the diverse combinations of
              features, from facial expressions to clothing styles, that our
              algorithm can conjure. Jumpstart your creativity with our random
              character generator and explore a realm brimming with infinite
              possibilities!
            </p>
          </div>
          <div className="character-btn">
            <Link to="/CharacterGenerator" className="generate-btn">
              Generate Character
            </Link>
          </div>
        </div>
        <div className="arrow-more-draw">
          <div className="arrow-more">
            <p onClick={handleScroll}>More</p>
            <i
              className="fas fa-chevron-down"
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>

        <div className="desktop-container">
          <div className="container">
            <img src={ImgOne} alt="img one" className="one" />
            <h3>Bosse Ängman </h3>
            <p>Lorem ipsum lorem ipsum lorem ipsum</p>
          </div>
        </div>
      </div>

      <div className="page-img">
        <div className="mobtab-container">
          <div className="container">
            <img src={ImgOne} alt="img one" className="one" />
            <h3>Bosse Ängman </h3>
            <p>Lorem ipsum lorem ipsum lorem ipsum</p>
          </div>
        </div>
        <div className="container">
          <img src={ImgTwo} alt="img two" className="two" />
          <h3>Viktor Rüdén</h3>
          <p>Lorem ipsum lorem ipsum lorem ipsum</p>
        </div>
        <div className="container">
          <img src={ImgOne} alt="img three" className="three" />
          <h3>lisa larsson</h3>
          <p>Lorem ipsum lorem ipsum lorem ipsum</p>
        </div>
        <div className="container">
          <img src={ImgTwo} alt="img fore" className="fore" />
          <h3>Karin Holm</h3>
          <p>Lorem ipsum lorem ipsum lorem ipsum</p>
        </div>
      </div>
    </div>
  )
}

export default Character
