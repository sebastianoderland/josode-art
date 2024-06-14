import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import "../css/Navbar.css"

const Navbar = ({ isLoggedIn, updateIsLoggedIn }) => {
  const [isToggled, setToggle] = useState(false)
  const [isUserMenuOpen, setUserMenuOpen] = useState(false)
  const [subItemsVisible, setSubItemsVisible] = useState(false)

  const navigate = useNavigate()

  const toggleMenu = () => {
    setToggle(!isToggled)
    setUserMenuOpen(false)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen)
    setToggle(false)
  }

  const toggleSubItems = () => {
    setSubItemsVisible(!subItemsVisible)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    updateIsLoggedIn(false)
    navigate("/home")
  }

  const items = ["Home", "Chat", "Art-gallery", "Draw"]

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-header">
          <div className="navbar-title">
            <h1>
              ArtCanva
              <span
                style={{ padding: "5px", letterSpacing: "0" }}
                className="brand-mark"
              >
                S
              </span>
            </h1>
          </div>
          <div className="navbar-button">
            <button
              className="btn"
              onClick={toggleMenu}
              aria-label="Öppna menyn"
            >
              <i className="fas fa-bars"></i>
            </button>
            <button
              className="user-icon-btn"
              onClick={toggleUserMenu}
              aria-label="Visa användarmeny"
            >
              <i className="far fa-user"></i>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              className="user-menu"
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {isLoggedIn ? (
                <>
                  <h4>
                    <Link to="/" className="link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </h4>
                  <h4>
                    <Link to="/my-page" className="link">
                      My Page
                    </Link>
                  </h4>
                </>
              ) : (
                <>
                  <h4>
                    <Link to="/login" className="link">
                      Login
                    </Link>
                  </h4>
                  <h4>
                    <Link to="/register" className="link">
                      Sign Up
                    </Link>
                  </h4>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isToggled && (
            <motion.div
              className="navbar"
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.ul
                className="navList"
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {items.map((item) => (
                  <motion.li className="nav-item" key={item}>
                    {item === "Draw" ? (
                      <div>
                        <h4 onClick={toggleSubItems}>{item}</h4>
                      </div>
                    ) : (
                      <Link
                        to={
                          item === "Art-gallery"
                            ? `/${item.toLowerCase().replace(" ", "-")}`
                            : `/${item.toLowerCase()}`
                        }
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          display: "block",
                        }}
                      >
                        <h4>{item}</h4>
                      </Link>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
              {subItemsVisible && (
                <motion.div
                  className="sub-menu-row"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <motion.ul>
                    <motion.li>
                      <h5>
                        <Link
                          to="/character"
                          style={{ textDecoration: "none", color: "#fff" }}
                        >
                          Characters
                        </Link>
                      </h5>
                    </motion.li>
                    <motion.li>
                      <h5>
                        <Link
                          to="/place"
                          style={{ textDecoration: "none", color: "#fff" }}
                        >
                          Place and feel
                        </Link>
                      </h5>
                    </motion.li>
                    <motion.li>
                      <h5>
                        <Link
                          to="/who-and-what"
                          style={{ textDecoration: "none", color: "#fff" }}
                        >
                          Who and What?
                        </Link>
                      </h5>
                    </motion.li>
                  </motion.ul>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Navbar
