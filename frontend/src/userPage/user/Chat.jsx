import React, { useState, useEffect } from "react"
import { getUserIdFromToken } from "../auth/authUtils"
import { useNavigate } from "react-router-dom"
import { apiRequest } from "../../utils/api"
import "../../css/chat.css"

const PrivChat = () => {
  const [friends, setFriends] = useState([])
  const [unreadMessages, setUnreadMessages] = useState({})
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
      } catch (error) {
        console.error("Failed to load friends:", error)
      }
    }

    const fetchUnreadMessages = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.error("No token available")
          return
        }

        const response = await apiRequest(
          "GET",
          `/private-chat/unread-counts`,
          {
            Authorization: `Bearer ${token}`,
          }
        )

        const data = await response.json()
        console.log("Unread messages data:", data)
        if (data.unreadCounts) {
          setUnreadMessages(data.unreadCounts)
        } else {
          setUnreadMessages({})
        }
      } catch (error) {
        console.error("Failed to load unread messages counts:", error)
      }
    }

    fetchFriends()
    fetchUnreadMessages()
  }, [])

  useEffect(() => {
    console.log("Friends:", friends)
    console.log("Unread messages state:", unreadMessages)
  }, [friends, unreadMessages])

  const handleChatClick = async (friendId) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No token available")
        return
      }

      await apiRequest("POST", `/private-chat/markAsRead/${friendId}`, {
        Authorization: `Bearer ${token}`,
      })

      setUnreadMessages((prevUnreadMessages) => ({
        ...prevUnreadMessages,
        [friendId]: 0,
      }))
      navigate(`/my-page/private-chat/${friendId}`)
    } catch (error) {
      console.error("Failed to mark messages as read:", error)
    }
  }

  if (friends.length === 0) {
    return <div className="no-friends">You have not added any friends yet.</div>
  }

  return (
    <>
      <div className="title-container">
        <h2>Chat</h2>
      </div>
      <div className="container-page">
        <ul className="friends-list">
          {friends.map((friend, index) => (
            <li key={index} className="friend-item">
              <p className="friend-name">
                {friend.username}
                {unreadMessages[friend._id] > 0 && (
                  <span className="unread-message-text">Unread messages</span>
                )}
              </p>
              <button
                className="user-button"
                onClick={() => handleChatClick(friend._id)}
              >
                Start Chat
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default PrivChat
