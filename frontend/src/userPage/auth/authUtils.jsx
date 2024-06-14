import { jwtDecode } from "jwt-decode"

export const getUserIdFromToken = (token) => {
  if (!token) return null

  try {
    const decodedToken = jwtDecode(token)
    return decodedToken.id
  } catch (error) {
    return null
  }
}

export const isLoggedIn = () => {
  const token = localStorage.getItem("token")
  if (!token) return false

  try {
    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
  } catch (error) {
    return false
  }
}
