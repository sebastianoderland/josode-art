import React, { useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./home/Navbar"
import AppRoutes from "./AppRoutes"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (token) => {
    setIsLoggedIn(!!token)
  }

  const handleRegister = (token) => {
    setIsLoggedIn(!!token)
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} updateIsLoggedIn={setIsLoggedIn} />
      <AppRoutes onLogin={handleLogin} onRegister={handleRegister} />
    </Router>
  )
}

export default App