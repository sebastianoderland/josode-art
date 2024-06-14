import React, { useState, useEffect } from "react"
import { getUserIdFromToken } from "../auth/authUtils"
import { useNavigate } from "react-router-dom"
import { apiRequest } from "../../utils/api"
import "../../css/friends.css"

const Friends = () => {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.error("No token available")
          return
        }

        const loggedInUserId = getUserIdFromToken(token)

        const response = await apiRequest(
          "GET",
          `/friends/friends/${loggedInUserId}`,
          {
            Authorization: `Bearer ${token}`,
          }
        )

        const friendsData = await response.json()
        setFriends(friendsData)
        setLoading(false)
      } catch (error) {
        setError("Failed to load friends.")
        setLoading(false)
      }
    }

    fetchFriends()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <>
      <div className="title-container">
        <h2>Friends</h2>
      </div>
      <div className="container-page">
        {friends.length === 0 ? (
          <p>You have not added any friends yet.</p>
        ) : (
          <div className="friends-container">
            <ul className="friends-list">
              {friends.map((friend, index) => (
                <li key={index} className="friend-item">
                  {friend.profileImageUrl && (
                    <img
                      src={`${process.env.REACT_APP_API_HOST}${friend.profileImageUrl}`}
                      alt={`${friend.username}'s profile`}
                      className="friend-profile-image"
                    />
                  )}
                  <p className="friend-name">{friend.username}</p>
                  <button
                    className="user-button"
                    onClick={() => navigate(`/userPage/${friend._id}`)}
                  >
                    Friend's Page
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Friends
