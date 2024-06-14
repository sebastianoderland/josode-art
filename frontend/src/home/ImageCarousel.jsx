import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Img1 from "../assets/Img1.png"
import Img2 from "../assets/Img2.png"
import Img3 from "../assets/Img3.png"
import "../css/imageCarousel.css"
import CarouselText from "./CarouselText"

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentText, setCurrentText] = useState("Draw a random character.")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % 3)
    }, 6000)

    return () => clearInterval(timer)
  }, [currentIndex])

  useEffect(() => {
    const texts = [
      "Draw a random character.",
      "Place and feeling.",
      "How and what?",
    ]
    setCurrentText(texts[currentIndex])
  }, [currentIndex])

  const images = [Img1, Img2, Img3]

  const getVariant = (index) => {
    const positionIndex = (currentIndex + index) % 3
    switch (positionIndex) {
      case 0:
        return { x: "0%", scale: 1, zIndex: 3 }
      case 1:
        return { x: "-50%", scale: 0.7, zIndex: 2 }
      case 2:
        return { x: "50%", scale: 0.7, zIndex: 1 }
      default:
        return { x: "0%", scale: 1, zIndex: 3 }
    }
  }

  return (
    <div className="img-container">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt={image}
          className="img"
          initial="center"
          animate={getVariant(index)}
          transition={{ duration: 3, ease: "easeInOut" }}
          style={{ width: "50%" }}
        />
      ))}
      <AnimatePresence>
        <CarouselText key={currentText} text={currentText} isActive={true} />
      </AnimatePresence>
    </div>
  )
}

export default ImageCarousel
