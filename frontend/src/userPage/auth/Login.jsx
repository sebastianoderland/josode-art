import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getUserIdFromToken } from "./authUtils"
import "../../css/log-reg.css"
import fillImg from "../../assets/Namnlöst-8.png"
import { jsonApiRequest } from "../../utils/api"

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isFormComplete, setIsFormComplete] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const response = await jsonApiRequest("POST", "/auth/login", {
        username,
        password,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed.")
      }

      const data = await response.json()
      const token = data.token
      if (token) {
        localStorage.setItem("token", token)
        onLogin(token)
        setLoggedIn(true)
        const loggedInUserId = getUserIdFromToken(token)
        onLogin(loggedInUserId)
      }
    } catch (error) {
      setError(error.message || "Login failed.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (loggedIn) {
      const timeout = setTimeout(() => {
        navigate("/home")
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [loggedIn, navigate])

  useEffect(() => {
    setIsFormComplete(username !== "" && password !== "")
  }, [username, password])

  return (
    <div className="fill-container">
      <div className="fill-in">
        <div className="fill-title">
          <h3>Login</h3>
        </div>
        <div className="input-container">
          <i className="fas fa-user input-icon user-icon"></i>{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            disabled={isLoading || loggedIn}
          />
        </div>
        <div className="input-container">
          <i className="fas fa-lock input-icon password-icon"></i>{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={isLoading || loggedIn}
          />
        </div>
        <div className="fill-img">
          <img src={fillImg} alt="User Icon" className="input-img" />
        </div>

        <button
          className="fill-button"
          onClick={handleLogin}
          disabled={isLoading || loggedIn || !isFormComplete}
        >
          {isLoading
            ? "Loading ..."
            : loggedIn
            ? "You are now logged in!"
            : "Login"}
        </button>

        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default Login
