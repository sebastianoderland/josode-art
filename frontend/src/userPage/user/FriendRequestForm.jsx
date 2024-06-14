import React, { useState } from "react"
import { getUserIdFromToken, isLoggedIn } from "../auth/authUtils"
import { apiRequest } from "../../utils/api"

const FriendRequestForm = ({ userId, onRequestSent }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const sendFriendRequest = async () => {
    if (!isLoggedIn()) {
      setError("You must be logged in to send a friend request.")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const token = localStorage.getItem("token")
      const loggedInUserId = getUserIdFromToken(token)
      const apiResult = await apiRequest(
        "POST",
        `/friends/send/${userId}`,
        {
          Authorization: `Bearer ${token}`,
        },
        { senderId: loggedInUserId }
      )
      if (!apiResult.ok) {
        const errorMessage = await apiResult
          .json()
          .then((json) => {
            return json.message
          })
          .catch(() => {
            return "Error sending friend request"
          })
        throw new Error(errorMessage)
      }

      setSuccess("Friend request sent!")
      onRequestSent()
    } catch (error) {
      const errorMessage = error.message
      if (errorMessage === "You are already friends.") {
        setError("You are already friends.")
      } else {
        setError(errorMessage || "Error sending friend request.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="FriendRequestbutton">
      <button
        className="user-button"
        onClick={sendFriendRequest}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Friend Request"}
      </button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  )
}

export default FriendRequestForm
