import React, { useState, useEffect } from "react"
import { getUserIdFromToken } from "../auth/authUtils"
import { useNavigate } from "react-router-dom"
import { apiRequest } from "../../utils/api"
import "../../css/friendRequests.css"

const FriendRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState([])
  const [sentRequests, setSentRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          navigate("/")
          return
        }

        const loggedInUserId = getUserIdFromToken(token)

        const receivedResponse = await apiRequest(
          "GET",
          `/friends/received/${loggedInUserId}`,
          {
            Authorization: `Bearer ${token}`,
          }
        )
        setReceivedRequests(await receivedResponse.json())

        const sentResponse = await apiRequest(
          "GET",
          `/friends/sent/${loggedInUserId}`,
          {
            Authorization: `Bearer ${token}`,
          }
        )
        setSentRequests(await sentResponse.json())

        setLoading(false)
      } catch (error) {
        setError("Error fetching friend requests.")
        setLoading(false)
      }
    }

    fetchFriendRequests()
  }, [navigate])

  const acceptFriendRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("token")
      await apiRequest(
        "POST",
        `/friends/respond`,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        JSON.stringify({ requestId, status: "accepted" })
      )
      setReceivedRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      )
    } catch (error) {
      setError("Error accepting friend request.")
    }
  }

  const rejectFriendRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("token")
      await apiRequest(
        "POST",
        `/friends/respond`,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        JSON.stringify({ requestId, status: "rejected" })
      )
      setReceivedRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      )
    } catch (error) {
      setError("Error rejecting friend request.")
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <div className="title-container">
        <h2>Requests</h2>
      </div>
      <div className="friend-re">
        <div className="container-page">
          <h3>Received Friend Requests</h3>{" "}
          {receivedRequests.length === 0 ? (
            <p>No received friend requests</p>
          ) : (
            <ul className="friend-requests-list">
              {receivedRequests.map((request) => (
                <li key={request._id} className="friend-request-item">
                  {request.senderId && (
                    <>
                      <p className="friend-name">{request.senderId.username}</p>{" "}
                      <p className="request-text">sent you a friend request</p>
                      <div className="button-container">
                        <button
                          className="accept-button"
                          onClick={() => acceptFriendRequest(request._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => rejectFriendRequest(request._id)}
                        >
                          Reject
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
          <h3>Sent Friend Requests</h3>
          {sentRequests.length === 0 ? (
            <p>No sent friend requests</p>
          ) : (
            <ul className="friend-requests-list">
              {sentRequests.map((request) => (
                <li key={request._id} className="friend-request-item">
                  {request.receiverId && (
                    <>
                      <p className="friend-name">
                        You sent a friend request to{" "}
                        {request.receiverId.username}
                      </p>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default FriendRequests
