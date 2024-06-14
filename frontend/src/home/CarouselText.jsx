import React from "react"
import { motion } from "framer-motion"

const CarouselText = ({ text, isActive }) => {
  const variants = {
    hidden: {
      x: "100%",
      opacity: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
    visible: {
      x: "0%",
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0, ease: "easeInOut" },
    },
  }

  const textKey = `carousel-text-${text}`

  return (
    <motion.h3
      key={textKey}
      className="carousel-text"
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      exit="exit"
      variants={variants}
      style={{ zIndex: 4, marginTop: "60px" }}
    >
      {text}
    </motion.h3>
  )
}

export default CarouselText
