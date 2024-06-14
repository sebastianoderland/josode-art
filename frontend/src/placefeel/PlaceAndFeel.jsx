import "../css/Draw.css"
import ImgOne from "../assets/drawN.jpg"
import ImgTwo from "../assets/drawNA.jpg"
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
            <h3>Random Place And Mood Generator</h3>{" "}
          </div>
          <div className="text">
            <p>
              Feeling stuck in a rut? Enter our random place and mood generator,
              your ultimate remedy for creative block! Our innovative tool
              crafts vivid settings and evocative atmospheres, transporting you
              to realms both fantastical and familiar. Whether you're shaping
              the backdrop for your next narrative masterpiece or seeking
              inspiration for your visual artistry, our generator provides the
              spark you crave. Prepare to immerse yourself in a tapestry of
              landscapes, from bustling cityscapes to serene natural wonders,
              each infused with a spectrum of emotions, from joy to melancholy.
              Embark on a journey of imagination with our random place and mood
              generator, and unlock a universe brimming with boundless
              possibilities!
            </p>
          </div>
          <div className="character-btn">
            <Link to="/PlaceAndFeelG" className="generate-btn">
              Generate Place & Mood
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
